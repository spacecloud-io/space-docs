---
title: "Securing your APIs"
description: "Securing your GraphQL APIs"
date: 2020-02-12T08:04:06+05:30
draft: false
weight: 4
---

The security rules for remote services works to authorize client request for remote services. Authorization works on the endpoint level of each service. This means that you can have different rules for each endpoint in a service. 

![Add endpoint screen](/images/screenshots/edit-endpoint.png)

See the `Rule` section in the above image? That's where the rule goes.

Here's a sample snippet which shows the security rules to access the endpoint `endpoint1` of service `service1`.

{{< highlight json >}}
{
  "rule": "allow"
}
{{< /highlight >}}


You can add rules for each endpoint under each service. A request to an endpoint is denied if there is no corresponding rule for it. This ensures that all calls to remote services are secure by default.

## Features
Using the security rules, you can:

- Allow / deny access to a remote endpoint.
- Allow access to a remote endpoint only if the user is authenticated.
- Allow access to a remote endpoint only if certain conditions are met (via JSON rules or custom logic).
- Encrypting, decrypting, hashing values of certain fields in request or response.

## Popular use cases

- Allow only signed-in users to call a function (For example only allow signed in users to make a payment).
- Role-based authentication (For example only allow admin to access a particular function)
- Check if the params sent by the user contains a certain field.
- Call another function to authorize the function call (For example you might have an authorization service which validates all types of request).

The security module of Space Cloud can solve all these problems.

## Available variables
All requests for function calls contains 2 variables which are available to you for matching conditions:

- **auth:** The claims present in the JWT token. If you are using the in-built user management service of Space Cloud, then the `auth` has `id`, `name` and `role` of the user. While making a custom service, you are free to choose the claims which go inside the JWT token and thus available in the `auth` variable.
- **params:** The params object sent by the user to call the function.

## Allow anonymous access
 
You can disable authentication and authorization for a particular function of a service completely by using `allow`. The request is allowed to be made even if the JWT token is absent in the request. You might want to use this when you want your users to perform certain operation without sign-in. Here's how to give access to a particular operation using `allow`:

{{< highlight json >}}
{
  "rule": "allow"
}
{{< /highlight >}}

## Deny access

This rule is to deny all calls to a particular function irrespective of anything. It might be useful to deny access to a function temporarily. Here's how to deny access to a particular function using `deny`:

{{< highlight json >}}
{
  "rule": "deny"
}
{{< /highlight >}}


## Allow only authenticated users

You can allow a certain function to be called only if the caller is authenticated. (For example, allow only logged in users to make a payment). This rule is used to allow the request only if a valid JWT token is found in the request. No checks are imposed beyond that. Basically, it authorizes every request which has passed the authentication stage. Here's how to allow a function call for authenticated users:

{{< highlight json >}}
{
  "rule": "authenticated"
}
{{< /highlight >}}

## Allow function call on certain conditions

Many times you might want a user to call a particular function only when certain conditions are met. Such conditions might require you to check the value of certain fields from the incoming request or from the database. Or it can be a custom validation altogether. The security rules in Space Cloud are made, keeping this flexibility in mind.

### Match incoming requests
This rule is used to allow a certain request only when a certain condition has been met, and all the variables required for matching are present in the request itself. Every request for a function call contains 2 variables - `auth` and `params` present in the `args` object. Generally, this rule is used to match the parameters sent by the user with the auth object. It can also be used for role-based authentication.

The basic syntax looks like this:

{{< highlight json >}}
{
  "rule": "match",
  "eval": "== | != | > | >= | < | <= | in | notIn",
  "type": "string | number | bool",
  "f1": "< field1 >",
  "f2": "< field2 >"
}
{{< /highlight >}}

Example (Match the value of a field in `params` sent by the user):

{{< highlight json >}}
{
  "rule": "match",
  "eval": "==",
  "type": "string",
  "f1": "args.auth.id",
  "f2": "args.params.userId"
}
{{< /highlight >}}

Example (Role-based authentication - allow only admin to call a certain function):

{{< highlight json >}}
{
  "rule": "match",
  "eval": "==",
  "type": "string",
  "f1": "args.auth.role",
  "f2": "admin"
}
{{< /highlight >}}

Example (Check if a field is present in the `params`):

{{< highlight json >}}
{
  "rule": "match",
  "eval": "==",
  "type": "bool",
  "f1": "utils.exists(args.params.postId)",
  "f2": true
}
{{< /highlight >}}

`utils.exists` is a utility function by the security rules which checks if a given field exists or not and returns true or false.

### Remove fields from the request

This rule is used to remove certain fields from the request.  This is especially helpful if you want to [protect certain fields from some operation](https://github.com/spaceuptech/space-cloud/issues/552).

**Example:** Protect the `amount` field by removing it from the request if the remote endpoint is not called by an admin:

{{< highlight json >}}
{
  "rule": "remove",
  "fields": ["args.params.amount"],
  "clause": {
    "rule": "match",
    "eval": "!=",
    "type": "bool",
    "f1": "args.auth.role",
    "f2": "admin"
  }
}
{{< /highlight >}}

As you can see, the above rule instructs the Space Cloud to remove the `amount` field from the request (`args.params`  object) if the role is not equalled to admin. 

The above rule uses the `match` clause. However, you can even use `and`|`or` clause also. The provided `fields` would only be removed if the `clause` evaluates to true. If you want to remove the fields without any condition, then omit the `clause` field.

> **Note:** Irrespective of whether you use `clause` field or not, the `remove` rule always evaluates to true in an `and`|`or` clause.

### Force certain fields

This rule is used to override request by forcing the value of certain fields in the request.

**Example:** Ensure that a user can query only his profile by forcing the `userId` field in the request with the value of the `id` in the JWT token claims of the request:

{{< highlight json >}}
{
  "rule": "force",
  "field": "args.params.userId",
  "value": "args.auth.id"
}
{{< /highlight >}}

The above rule sets the value of `args.params.userId` (`args.params` contains the parameters sent by the user while calling the remote service from the frontend) before the request is sent to the remote service.

> **Note:** You can also specify the condition on which to force certain fields with the help of the `clause` field. 

### Database Query
This rule is used to allow a certain request based on the results of a query on the database. The query's find clause is generated dynamically using this rule. This rule is evaluated to true based on whether the `clause` field of the query rule evaluates to true or not.

The basic syntax looks like this:

{{< highlight json >}}
{
  "rule": "query",
  "db": "< db-alias-name >",
  "col": "< collection-name >",
  "find": "< mongo-find-query >",
  "clause": "<clause>"
}
{{< /highlight >}}

The `query` rule executes a database query with the user-defined find object with operation type set to `one`. It is useful for policies which depend on the values stored in the database.

**Example:** Make sure a user can call a function only if he is author of some book:

{{< highlight json >}}
{
  "rule": "query",
  "db": "mongo",
  "col": "books",
  "find": {
    "authorId": "args.params.bookId"
  },
  "clause": {
    "rule": "match",
    "type": "number",
    "eval": ">",
    "f1": "utils.length(args.result)",
    "f2": 0
  }
}
{{< /highlight >}}

### Encrypt/decrypt fields

You can conditionally encrypt and decrypt fields in the request using the `encrypt` and `decrypt` rules respectively. Typical use-cases include using the `encrypt` rule to encrypt the confidential data of a user like email, name, etc before passing it to a remote service. You can also perform this encryption/decryption conditionally by using the `clause` field.

**Example:** Encrypt confidential fields like name and email before passing it to a remote service:

{{< highlight json >}}
{
  "rule": "encrypt",
  "fields": ["args.params.email", "args.params.name"]
}
{{< /highlight >}}

### Hash fields

The `hash` rule is to create a SHA256 hash of the specified fields in the request/response. Real-life use-cases include hashing passwords before storing it in the database.

**Example:** Hash `password` field been sent to the remote service:

{{< highlight json >}}
{
  "rule": "hash",
  "fields": ["args.params.password"]
}
{{< /highlight >}}

> **Note:** You can even use the `clause` field to hash fields conditionally.

### Combine multiple conditions

You can mix and match several `match` and `query` rules together to tackle complex authorization tasks (like the Instagram problem) using the `and` and `or` rule.

The basic syntax looks like this:

{{< highlight json >}}
{
  "rule": "and | or",
  "clauses": "< array-of-rules >"
}
{{< /highlight >}}

Example (Make sure a user can call a function only if he has the role `admin` or `super-user`)

{{< highlight json >}}
{
  "rule": "or",
  "clauses": [
    {
      "rule": "match",
      "eval": "==",
      "type": "string",
      "f1": "args.auth.role",
      "f2": "admin"
    },
    {
      "rule": "match",
      "eval": "==",
      "type": "string",
      "f1": "args.auth.role",
      "f2": "super-user"
    }
  ]
}
{{< /highlight >}}

### Custom validations

In the case where the matching and db query for validating conditions are not enough, Space Cloud can use your custom authorization logic by triggering a webhook on your servers. Here's an example showing how to do this by rule `webhook`:

{{< highlight json >}}
{
  "rule": "webhook",
  "url": "http://localhost:8080/my-custom-logic"
}
{{< /highlight >}}

In the above case, Space Cloud will make a POST request to your remote server on the above `url`. If the remote server returns a status of `2XX`, the request will be considered authenticated. Otherwise, Space Cloud will consider the request as unauthorized. The webhook body will consist of the same variables that were available under the `args` key in security rules.


<b>End to end user authentication</b>

As the name suggests, we authenticate the end user in this form of authentication. This is essential if you need to verify or restrict requests from authorized users only. 

Space Cloud transparently forwards the token provided by the user in the `Authorization` header. This token is signed with the `secret` key provided in the project's configuration.

<b>Service to service authentication</b>

In some cases, you would want to verify the sender of the request received by your service. This is required when your service is running in an open or untrusted network.

Space cloud adds an `X-SC-Token` header which contains a token containing the identity of the caller space cloud instance. This token can be used to check if the incoming request is coming from an authentic source. This token is signed with the `secret` key provided in the project's configuration.