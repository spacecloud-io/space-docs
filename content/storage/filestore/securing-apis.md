---
title: "Securing your APIs"
description: "Securing your APIs"
date: 2019-09-23T10:07:57+05:30
draft: false
weight: 6
---

The security rules for file storage access works to authorize client request. Authorization works on the operation level (read, create and delete) for each path prefix. This means that you can have different rules for different path prefixes. Here's a sample snippet which shows the rules on the `/images/:userId` prefix. Operations `create`  and `read` are allowed while `delete` is blocked.

{{< highlight json >}}
{
  "prefix": "/images/:userId",
  "rule": {
    "create": {
      "rule": "allow"
    },
    "read": {
      "rule": "allow"
    },
   "delete": {
      "rule": "deny"
    }
  }
}
{{< /highlight >}}

## Points to note

The following needs to be kept in mind for the security rules in the file storage module.
- The `rules` is a map of rules. The key (`imageRule` in this case) is just a unique key to indentify each rule.
- Using the `allow` rule will instruct Space Cloud to disable JWT token parsing for that function. This means the `auth` parameter in the function will always be a `null` value when the rule is set to allow.
- All rules are applied on a `prefix`. A `prefix` is nothing but the path prefix where the file / folder is present or is to be created 
- The prefix may contain path parameters (`/:userId` in this case). The value of the path parameter is available in the `args.params` object. The key would be `userId` and the value would be the actual value in the path provided.

## Features
With security rules for file storage you can:

- Allow / deny access to a file/folder.
- Allow access to a particular file/folder only if the user is authenticated.
- Allow access to a particular file/folder only if certain conditions are met (via JSON rules or custom logic).

## Popular use cases

- Allow only signed in users to upload a file.
- Role based authentication (For example only allow admin to delete a particular folder)
- Allow user to upload a file at his path only.
- The Instagram problem - Allow user to view a profile pic only if the profile is public or they are following them 
- Call another function to authorize the file/folder access

All these problems can be solved by the security module of Space Cloud.

## Available variables
All requests for file/folder access contains 2 variables which are availabe to you for matching conditions:

- **auth:** The claims present in the JWT token. If you are using in-built user management service of Space Cloud, then the `auth` has `id`, `name` and `role` of the user. While making a custom service, you are free to choose the claims which go inside the JWT token and thus available in the `auth` variable.
- **params:** The variables in the path prefix.


## Allow anonymous access
 
You can disable authentication and authorization for a particular file/folder completely by using `allow`. The request is allowed to be made even if the JWT token is absent in the request. You might want to use this when you want some files to be publicly available to all users even without signin (For example, access images of products in an e-commerce app). Here's how to give access to a particular path using `allow`:

{{< highlight json >}}
{
  "read": {
    "rule": "alow"
  }
}
{{< /highlight >}}


## Deny access

This rule is to deny all incoming requests irrespective of any thing. It is especially useful to deny certain dangerous operations like `delete` while selectively allowing the other ones. (For example, deny access to delete product's image). Here's how to deny access to a particular operation using `deny`:

{{< highlight json >}}
{
  "delete": {
    "rule": "deny"
  }
}
{{< /highlight >}}

## Allow only authenticated users

You can allow access to a certain path only if the user is authenticated. This rule is used to allow the request only if a valid JWT token is found in the request. No checks are imposed beyond that. Basically it authorizes every request which has passed the authentication stage. Here's how to allow a operation for authenticated users:

{{< highlight json >}}
{
  "create": {
    "rule": "authenticated"
  }
}
{{< /highlight >}}

## Allow operation on certain conditions

Many a times you might want a user to access a file path only when certain conditions are met. For example, a user can delete a picture only if it is uploaded by him. Another use case might be allowing a user to read a profile's image only if that profile is public or the user is following him (Instagram problem). Such conditions might require you to check the value of certain fields from the incoming request or from the database. Or it can be a custom validation altogether. The security rules in Space Cloud are made keeping this flexibility in mind.

### Match incoming requests
This rule is used to allow a certain request only when a certain condition has been met and all the variables required for matching is present in the request itself. Each file access request contains 2 variables (`auth` and `params`) present in the `args` object. Generally this rule is used to match the path parameters with the auth object. It can also be used for role based authentication.

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

Example (Make sure user can upload a file at his path only):

{{< highlight json >}}
{
  "prefix": "/users/:userId",
  "rule": {
    "create": {
      "rule": "match",
      "eval": "==",
      "type": "string",
      "f1": "args.params.userId",
      "f2": "args.auth.id"
    }
  }
}
{{< /highlight >}}


Example (Role based authentication - allow only admin to delete a folder):

{{< highlight json >}}
{
  "prefix": "/projects/:projectId",
  "rule": {
    "delete": {
      "rule": "match",
      "eval": "==",
      "type": "string",
      "f1": "args.auth.role",
      "f2": "admin"
    }
  }
}
{{< /highlight >}}

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

Example (make sure user can query images of only public `profiles`):

{{< highlight json >}}
{
  "prefix": "/profiles/:profileId",
  "rule": {
    "read": {
      "rule": "query",
      "db": "mongo",
      "col": "profiles",
      "find": {
        "userId": "args.params.profileId",
        "isPublic": true
      }
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

Example (The Instagram problem - Make sure the user can view a profile picture if the profile is public or he is a follower)

{{< highlight json >}}
{
  "prefix": "/profiles/:profileId",
  "rule": {
    "read": {
      "rule": "or",
      "clauses": [
        {
          "rule": "query",
          "db": "mongo",
          "col": "profiles",
          "find": {
            "userId": "args.params.profileId",
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
  }
}
{{< /highlight >}}

### Custom validations

In case where the matching and db query for validating conditions are not enough, Space Cloud can use your custom authorization logic by triggering a webhook on your servers. Here's an example showing how to do this by rule `webhook`:

{{< highlight json >}}
{
  "prefix": "/profiles/:profileId",
  "read": {
    "rule": "webhook",
    "url": "http://localhost:8080/my-custom-logic"
  }
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
Great! You have learned how to secure file access. You can now checkout the [microservices](/microservices) section.