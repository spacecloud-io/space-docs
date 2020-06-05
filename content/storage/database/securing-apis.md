---
title: "Securing your Database"
title: "Securing your Database APIs"
date: 2019-09-23T10:07:49+05:30
draft: false
weight: 7
---

The security rules for database access works to authorize client request for database operations. Authorization works on the operation level (create, read, update, delete) for each table/collection in the database. This means that you can have different rules for different operations. 

> **Note:** You can configure the security rules for your database via the `Rules` tab in the `Database` section of Mission Control.

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

With security rules for the database you can:

- Allow/deny access to a collection.
- Allow a particular operation on a collection only if the user is authenticated.
- Allow a particular operation on a collection only if certain conditions are met (via JSON rules or custom logic).

## Popular use cases

- Role based authentication (For example only allow admin to delete a project)
- Allow a user to be able to query only his / her data.
- Allow users to read posts without sign in but allow only signed-in users to create a post.
- Protect certain private fields based on roles.
- Check if the request contains a certain field.
- Encrypting, decrypting, hashing values of certain fields.
- The Instagram problem - Allow a user to view a profile only if it is public or if he is following them.
- Custom validation.

The authorization module of Space Cloud can solve all these problems.

## Available variables
All CRUD requests contain following request variables which are available to you for matching any conditions:

- **auth:** The claims present in the JWT token. If you are using the in-built user management service of Space Cloud, then the `auth` has `id`, `name` and `role` of the user. While making a custom service, you are free to choose the claims which go inside the JWT token and thus available in the `auth` variable.

- **find:** Present when a where clause is supplied by the `where` method/argument (Follows the MongoDB query syntax).
- **update:** Present for update operations. It contains all the update operations like `set`, `push`, etc. (Follows MongoDB DSL). 
- **doc:** Present for insert operation. (The document(s) to be inserted)
- **op:** "one | all" Present for all operations. `one` for `insertOne`, `findOne`, `updateOne` and `deleteOne` operations  

> **Note:** These variables are accessible in the security rules under the `args` key. 

## Allow anonymous access
 
You can disable authentication and authorization for a particular operation on a table completely by using `allow`. The request is allowed to be made even if the JWT token is absent in the request. You might want to use this when you want your users to perform a certain operation without sign in (For example, read products table of an e-commerce app). Here's how to give access to a particular operation using `allow`:

{{< highlight json >}}
{
  "read": {
    "rule": "allow"
  }
}
{{< /highlight >}}

## Deny access

This rule is to deny all incoming requests irrespective of anything. It is especially useful to deny certain dangerous operations like `delete` while selectively allowing the other ones. (For example, deny access to delete products table). Here's how to deny access to a particular operation using `deny`:

{{< highlight json >}}
{
  "delete": {
    "rule": "deny"
  }
}
{{< /highlight >}}

## Allow only authenticated users

You can allow a certain operation on a table only if the user is authenticated. (For example, allow only logged in users to bookmark a product). This rule is used to allow the request only if a valid JWT token is found in the request. No checks are imposed beyond that. Basically, it authorizes every request which has passed the authentication stage. Here's how to allow operation for authenticated users:

{{< highlight json >}}
{
  "create": {
    "rule": "authenticated"
  }
}
{{< /highlight >}}

## Allow operation on certain conditions

Many times you might want a user to perform a particular operation only when certain conditions are met. For example, a user can edit a post only his posts. Another use case might be allowing a user to read a profile only if it is public or the user is following him (Instagram problem). Such conditions might require you to check the value of certain fields from the incoming request or the database. Or it can be a custom validation altogether. The security rules in Space Cloud are made, keeping this flexibility in mind.

### Match incoming requests
This rule is used to allow a certain request only when a certain condition has been met, and all the variables required for matching are present in the request itself. Each CRUD request contains a certain variable (`auth`, `find`, `update`, `doc`, `op`) present in the `args` object. Generally, this rule is used to match the input parameters (like the where clause or certain fields in the document to be inserted) with the auth object. It can also be used for role-based authentication.

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

Example (Role-based authentication - allow only admin to delete a project):

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

This rule is used to remove certain fields from request or response.  This is especially helpful if you want to [protect certain fields from some operation](https://github.com/spaceuptech/space-cloud/issues/552).

**Example:** Protect the `password` field from being queried by removing it from the response if the query is not being made by an admin:

{{< highlight json >}}
{
  "rule": "remove",
  "fields": ["res.password"],
  "clause": {
    "rule": "match",
    "eval": "!=",
    "type": "bool",
    "f1": "args.auth.role",
    "f2": "admin"
  }
}
{{< /highlight >}}

As you can see, the above rule instructs the Space Cloud to remove the `password` field from the `res` (response) object if the role is not equalled to admin. Even if the response is an array of objects, the above rule will still work and will remove the `password` field from each object in the response array.

The above rule uses the `match` clause. However, you can even use `and`|`or` clause also. The provided `fields` would only be removed if the `clause` evaluates to true. If you want to remove the fields without any condition, then omit the `clause` field.

> **Note:** Irrespective of whether you use `clause` field or not, the `remove` rule always evaluates to true in an `and`|`or` clause.

To remove fields from the request, you have the `args` object. 

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

**Example:** Make sure user can query only public `profiles`:

{{< highlight json >}}
{
  "read": {
    "rule": "query",
    "db": "mongo",
    "col": "profiles",
    "find": {
      "userId": "args.find.userId",
      "isPublic": true
    },
    "clause": {
      "rule": "match",
      "type": "number",
      "eval": "==",
      "f1": "utils.length(args.result)",
      "f2": 1
    }
  }
}
{{< /highlight >}}

> **Note:** You can also perform a particular action if the database query returned no rows by comparing the length of `args.result` to zero. 

### Encrypt/decrypt fields

You can conditionally encrypt and decrypt fields using the `encrypt` and `decrypt` rules respectively. `encrypt` rule is to encrypt certain fields in request/response. `decrypt` rule is used on the other hand to decrypt the encrypted fields in the request/response. Typical use-cases include using the `encrypt` rule to encrypt the confidential data of a user like email, name, etc before inserting it into a database and using the `decrypt` rule to decrypt it while reading from the database. However, you can use the `clause` field to perform encryption and decryption conditionally.

**Example:** Encrypt name and email fields of a user while inserting a user:

{{< highlight json >}}
{
  "create": {
    "rule": "encrypt",
    "fields": ["args.doc.email", "args.doc.name"]
  }
}
{{< /highlight >}}

> **Note:** `args.doc` is the document to be inserted.

**Example:** Make sure that a user can query only his decrypted name and email:

{{< highlight json >}}
{
  "read": {
    "rule": "decrypt",
    "fields": ["res.email", "res.name"],
    "clause": {
      "rule": "match",
      "type": "string",
      "eval": "==",
      "f1": "args.auth.id",
      "f2": "args.auth.userId"
    }
  }
}
{{< /highlight >}}

### Hash fields

The `hash` rule is to create a SHA256 hash of the specified fields in the request/response. Real-life use-cases include hashing passwords before storing it in the database.

**Example:** Hash `password` field of the row being inserted into the `user` table:

{{< highlight json >}}
{
  "create": {
    "rule": "hash",
    "fields": ["args.doc.password"]
  }
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

## Next steps

Great! With this, you have completed the database module. You can now check out the [file storage module](/storage/filestore).