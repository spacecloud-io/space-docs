---
title: "Authorization"
description: "Authorization"
date: 2020-06-18T12:06:46+05:30
draft: false
weight: 3
---

Authorization involves deciding whether an authenticated user is allowed or not to make a request. 

Let's take an example of a simple blogging application. All authenticated users are allowed to create an article. However, an user can edit an article only if that article is written by him. This is an authorization problem.

There are three primary security rules in Space Cloud for enforcing authorization:

- **match:** This rule is used to allow a particular request only when a certain condition has been met. Generally it is used to match the request parameters (like the where clause or certain fields in the document to be inserted) with the auth object (token claims).
- **query:** Performs a database query to make use of additional data for matching conditions. 
- **webhook:** Triggers a webhook to invoke custom logic for edge cases that can't be covered by `match` and `query`. The rule is resolved if the webhook returns a response with status code `2xx`.

> **You can easily model complex authorization tasks in Space Cloud by [combining multiple security rules together]() using `and`/`or` rules.**

For example, an user with role `author` should be allowed to delete an article only if he is the author of that article. (i.e. the article's `author_id` field is equal to the id claim of the user) However, an admin should be able to delete any article. This can be modelled as - an article should be allowed to delete only if the user has role `admin`, or if the user has role `user` and the article id is equal to user id. 

Here's a security rule expressing the authorization logic for the above example:

{{< highlight javascript >}}
{
  "rule": "or",
  "clauses": [
    {
      "rule": "match",
      "type": "string",
      "eval": "==",
      "f1": "args.auth.role", // assuming token contains a claim named role
      "f2": "admin" 
    },
    {
      "rule": "or",
      "clauses": [
        {
          "rule": "match",
          "type": "string",
          "eval": "==",
          "f1": "args.auth.role",
          "f2": "user" 
        },
       {
          "rule": "match",
          "type": "string",
          "eval": "==",
          "f1": "args.find.author_id", // args.find is the variable containing the where clause
          "f2": "args.auth.id" // assuming token contains a claim names id equal to id of the user
        }
      ]   
    }
  ]
}
{{< /highlight >}}

## Next steps

Check out the in depth documentation for the `match`, `query` and `webhook` rules to learn all the possibilities in authorization.