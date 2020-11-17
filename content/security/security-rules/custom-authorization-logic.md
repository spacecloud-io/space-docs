---
title: "Custom Authorization Logic"
description: "Custom Authorization Logic"
date: 2020-10-31T12:55:29+05:30
draft: false
weight: 6
---

The `match` and `query` rules combined with `and/or` are flexible enough to enforce almost any validations or access control logic. However there might be edge cases wherein you would want to write some code for performing custom validations. Space Cloud allows you to do that in an easy manner.

## How does it works

- You write a service for performing custom validations.
- Use the [webhook] rule to secure the access of the desired resource. 
- Space Cloud makes an HTTP post request to the `url` specified in the webhook rule. This POST request encapsulates the request context nicely by including all the request variables. Checkout the list of [available variables](/security/security-rules/available-variables) to learn which request variables are available while securing different resources.
- Your service uses the request context provided in the request body to peform custom validations and respond with either a `2xx` status code or non `2xx` status code. The webhook rule is resolved only if your service responds with a `2xx` status code.

Checkout the [webhook security rule](/security/security-rules/conditional-access/triggering-webhooks) in more details to find out all the possibilities with it.

## Example

Let's say we want to allow access to a `orders` table only when the user's role is `admin`. Now this can easily be enforced by just using the `match` rule in Space Cloud. However, we will use the `webhook` here to illustrate how it works.

First, we will have to write a service that contains our custom validation logic (in this case just checking the role of the user).

We will be using NodeJS and Express in this example. However, you can write your custom access control logic in any language and framework. Here's the sample code for what we want to achieve:

{{< highlight javascript >}}
var express = require("express");
var app = express();

app.use(express.json());

app.post("/my-custom-logic", (req, res) => {
  const role = req.body.args.auth.role
  if (role === "admin") {
    res.status(200).send(JSON.stringify({}));
  } else {
    res.status(500).send(JSON.stringify({}));
  }
});

var server = app.listen(8080, () => {
  console.log("app running on port:", server.address().port);
});
{{< /highlight >}}

As you can see, we have just created an endpoint that executes our custom logic. 

All the variables available in security rules of space cloud are available in the request body. Thus, `req.body` in the above example contains `args.auth`, which is a variable containing the JWT claims of the request (made for the `orders` table in our case). 

We are assuming in this example, that the JWT claims contains a field called `role` indicating the role of the user. We are comparing the value of this role with `admin` and responding either with a `200` or `500` status code.


Now we write the following security rule for the read operation of the `orders` table:
{{< highlight javascript >}}
{
  "rule": "webhook",
  "url": "<service-origin>/my-custom-logic"
}
{{< /highlight >}}

Now, whenever someone tries to read from the `orders` table, Space Cloud will make an HTTP POST request to our endpoint with the claims and other request variables. 

If our endpoint responds with a 200, Space Cloud will consider the request to be authorized and allow the user to perform the desired operation (reading `orders` table in this case). Otherwise, Space Cloud will consider the request to be unauthorized and return an error to the user. 

Checkout the list of [available variables](/security/security-rules/available-variables) to learn which variables you will receive in the request body. 