---
title: "Securing your APIs"
date: 2019-09-23T10:07:49+05:30
draft: false
weight: 5
---

The security rules for database access works to authorize client request for database operations. Authorization works on the operation level (create, read, update, delete) for each table / collection in the database. This means that you can have different rules for different operations. 

> **Note:** All security rules for database have to be configured via Mission Control only. (`Rules` tab in `Database` section)

Here's a sample snippet which shows the rules on the `users` collection in MongoDB. Operations `create`  and `read` are allowed while `update` and `delete` are blocked:

{{< highlight json >}}
{
  "create": {
    "rule": "allow"
  },
  "read": {
    "rule": "allow"
  },
  "update": {
    "rule": "deny"
  },
  "delete": {
    "rule": "deny"
  }
}
{{< /highlight >}}

An operation is denied if there no corresponding rule for it is configured via the Mission Control. This ensures that all the operations are secure by default. 

## Features

With security rules for database you can:

- Allow / deny access to a collection.
- Allow a particular operation on a collection only if the user is authenticated.
- Allow a particular operation on a collection only if certain conditions are met (via JSON rules or custom logic).

## Popular use cases

- Role based authentication (For example only allow admin to delete a project)
- Allow a user to be able to query only his / her own data.
- Allow users to read posts without signin but allow only signed in users to create a post.
- Protect certain private fields based on roles.
- Check if the request contains a certain field.
- The Instagram problem - Allow a user to view a profile only if it is public or if he is following them.
- Custom validation.

All these problems can be solved by the authorization module of Space Cloud.

## Available variables
All CRUD requests contains following request variables which are availabe to you for matching any conditions:

- **auth:** The claims present in the JWT token. If you are using in-built user management service of Space Cloud, then the `auth` has `id`, `name` and `role` of the user. While making a custom service, you are free to choose the claims which go inside the JWT token and thus available in the `auth` variable.

- **find:** Present when a where clause is supplied by the `where` method/argument (Follows the MongoDB query syntax).
- **update:** Present for update operations. It contains all the update operations like `set`, `push`, etc. (Follows MongoDB DSL). 
- **doc:** Present for insert operation. (The document(s) to be inserted)
- **op:** "one | all" Present for all operations. `one` for `insertOne`, `findOne`, `updateOne` and `deleteOne` operations  

> **Note:** These variables are accessible in the security rules under the `args` key. 

## Allow anonymous access
 
You can disable authentication and authorization for a particular operation on a table completely by using `allow`. The request is allowed to be made even if the JWT token is absent in the request. You might want to use this when you want your users to perform certain operation without signin (For example, read products table of an e-commerce app). Here's how to give access to a particular operation using `allow`:

{{< highlight json >}}
{
  "read": {
    "rule": "allow"
  }
}
{{< /highlight >}}

## Deny access

This rule is to deny all incoming requests irrespective of any thing. It is especially useful to deny certain dangerous operations like `delete` while selectively allowing the other ones. (For example, deny access to delete products table). Here's how to deny access to a particular operation using `deny`:

{{< highlight json >}}
{
  "delete": {
    "rule": "deny"
  }
}
{{< /highlight >}}

## Allow only authenticated users

You can allow a certain operation on a table only if the user is authenticated. (For example, allow only logged in users to bookmark a product). This rule is used to allow the request only if a valid JWT token is found in the request. No checks are imposed beyond that. Basically it authorizes every request which has passed the authentication stage. Here's how to allow a operation for authenticated users:

{{< highlight json >}}
{
  "create": {
    "rule": "authenticated"
  }
}
{{< /highlight >}}

## Allow operation on certain conditions

Many a times you might want a user to perform a particular operation only when certain conditions are met. For example, a user can edit a post only if it is uploaded by him. Another use case might be allowing a user to read a profile only if it is public or the user is following him (Instagram problem). Such conditions might require you to check the value of certain fields from the incoming request or from the database. Or it can be a custom validation altogether. The security rules in Space Cloud are made keeping this flexibility in mind.

### Match incoming requests
This rule is used to allow a certain request only when a certain condition has been met and all the variables required for matching are present in the request itself. Each CRUD request contains certain variable (`auth`, `find`, `update`, `doc`, `op`) present in the `args` object. Generally this rule is used to match the input parameters (like the where clause or certain fields in the document to be inserted) with the auth object. It can also be used for role based authentication.

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

Example (make sure user can query only his `todos`):

{{< highlight json >}}
{
  "read": {
    "rule": "match",
    "eval": "==",
    "type": "string",
    "f1": "args.auth.id",
    "f2": "args.find.userId"
  }
}
{{< /highlight >}}

Example (Role based authentication - allow only admin to delete a project):

{{< highlight json >}}
{
  "delete": {
    "rule": "match",
    "eval": "==",
    "type": "string",
    "f1": "args.auth.role",
    "f2": "admin"
  }
}
{{< /highlight >}}

Example (Role based authentication - allow admin/moderator to delete a project):

{{< highlight json >}}
{
  "delete": {
    "rule": "match",
    "eval": "in",
    "type": "string",
    "f1": "args.auth.role",
    "f2": ["admin", "moderator"]
  }
}
{{< /highlight >}}

Example (Check if a field is present in the request):

{{< highlight json >}}
{
  "read": {
    "rule": "match",
    "eval": "==",
    "type": "bool",
    "f1": "utils.exists(args.find.postId)",
    "f2": true
  }
}
{{< /highlight >}}

`utils.exists` is a utility function by the security rules which checks if a given field exists or not and returns true or false.

### Remove fields from request/response

This rule is used to remove certain fields from request or response.  This is specially helpful if you want to [protect certain fields from some operation](https://github.com/spaceuptech/space-cloud/issues/552).

**Example:** Protect the `password` field from being queried by removing it from the response:

{{< highlight json >}}
{
  "rule": "remove",
  "fields": ["res.password"]
}
{{< /highlight >}}

As yo can see the above rule instructs the Space Cloud to remove `password` field from the `res` (response) object. 

> **Note:** Even if the response is an array of objects, the above rule will still work and will remove the `password` field fom each object in the response array.

In order to remove fields from the request, you have the `args` object. 

**Example:** Prevent the `role` from being updated in a mutation by removing the `role` field from the mutation request:

{{< highlight json >}}
{
  "rule": "remove",
  "fields": ["args.update.$set.role"]
}
{{< /highlight >}}

### Force certain fields

This rule is used to [override request/response] by forcing the value of certain fields in the request or response.

**Example:** Allow the user to query only his todos by enforcing the `id` from the `JWT token` as the `userId` in the where clause:

{{< highlight json >}}
{
  "rule": "force",
  "field": "args.find.userId",
  "value": "args.auth.id"
}
{{< /highlight >}}

The above rule sets the value of `args.find.userId` (`args.find` is the `where` clause sent to the database) with the value of `args.auth.id` (auth object contains the token claims) before the request is sent to the database.

### Database Query
This rule is used to allow a certain request only if a database request returns successfully. The query's find clause is generated dynamically using this rule. The query is considered to be successful if even a single row is successfully returned.

The basic syntax looks like this:

{{< highlight json >}}
{
  "rule": "query",
  "db": "mongo | sql-mysql | sql-postgres",
  "col": "< collection-name >",
  "find": "< mongo-find-query >"
}
{{< /highlight >}}

The `query` rule executes a database query with the user defined find object with operation type set to `one`. It is useful for policies which depend on the values stored in the database.

Example (make sure user can query only public `profiles`):

{{< highlight json >}}
{
  "read": {
    "rule": "query",
    "db": "mongo",
    "col": "profiles",
    "find": {
      "userId": "args.find.userId",
      "isPublic": true
    }
  }
}
{{< /highlight >}}


### Combine multiple conditions

You can mix and match several `match` and `query` rules together to tackle complex authorization tasks (like the Instagram problem) using the `and` and `or` rule.

The basic syntax looks like this:

{{< highlight json >}}
{
  "rule": "and | or",
  "clauses": "< array-of-rules >"
}
{{< /highlight >}}


Example (The Instagram problem - Make sure the user can query a profile only if it's public or he is a follower)

{{< highlight json >}}
{
  "rule": "or",
  "clauses": [
    {
      "rule": "query",
      "db": "mongo",
      "col": "profiles",
      "find": {
        "userId": "args.find.userId",
        "isPublic": true
      }
    },
    {
      "rule": "query",
      "db": "mongo",
      "col": "profiles",
      "find": {
        "followers": {
          "$in": "args.auth.userId"
        }
      }
    }
  ]
}
{{< /highlight >}}


### Custom validations

In case where the matching and db query for validating conditions are not enough, Space Cloud can use your custom authorization logic by triggering a webhook on your servers. Here's an example showing how to do this by rule `webhook`:

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

Space cloud adds a `X-SC-Token` header which contains a token containing the identity of the caller space cloud instance. This token can be used to check if the incoming request is coming from an authentic source. This token is signed with the `secret` key provided in the project's configuration.

## Next steps

Great! You have learned how to secure database access. You may now checkout the [security rules for file storage module](/auth/authorization/file-storage).

