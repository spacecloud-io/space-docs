---
title: "Access Control Basics"
description: "Access Control Basics"
date: 2020-06-17T10:23:19+05:30
draft: false
skipsubheader: true
weight: 1
---

Space Cloud provides robust access control mechanisms for securing your data.

## How it works

Space Cloud provides auto generated APIs for various resources like databases, file storage, remote services, etc.

As a developer, you need to write security rules for each of the resources exposed by Space Cloud. These security rules are simple JSON objects that you can configure at a very granular level for each resource. For instance, the security rules for database module can be configured at the operation level (`create`, `read`, `update` and `delete`) for each table in your database. Checkout [configuring the security rules] to learn how security rules are configured for each module.

All incoming requests to the Space Cloud are first validated by the API controller using the security rules defined by you. 

Security rules help check whether the request is authenticated and authorized. It can even modify the request/response (for data masking) before passing it on to the next stage. A request is allowed to be made only if the security rules for that resource are resolved. 

Security rules help you enforce various access control mechanisms on a resource:

- [Token based authentication]()
- [Authorization]() (based on the token claims, request and data in database)
- [Data masking]() (Encrypting, decrypting, etc)

A simple example for granting `admin` users access to a resource looks like this:

{{< highlight javascript >}}
{
  "rule": "match",
  "type": "string",
  "eval": "==",
  "f1": "args.auth.role", // assuming token consist of a claim named role
  "f2": "admin" 
}
{{< /highlight >}}

Security rules in Space Cloud are flexible enough to enforce any access control logic. This includes querying a database or triggering a webhook for edge cases. 

Check out the detailed documentation for [security rules]() or explore some popular [examples of security rules]()

## Token based authentication

> Token based authentication is enforced for all rule types beyond `allow`.

Space Cloud expects a JWT token in every incoming request. For HTTP requests, the token should be present inside `Authorization` header as `Bearer <token>`, whereas for websocket requests, the token should be present in the `data.token` key of the message body.

The security module in Space Cloud checks whether a token is valid or not based on the following criteria:

- The token should get verified by any one of the `secrets` provided to Space Cloud.
- If the token contains an expiry (seconds since epoch in the `exp` claim), then its value should be in the future.

Space Cloud considers a request to be authenticated only if it contains a valid token. Once a token is considered valid, its claims are parsed and made available in the `args.auth` variable to be used by security rules.

If a user tries to change any of the token claims or tries to create his/her own false token, it would fail at the verification stage because of the nature of JWTs. You can check out the [official website](https://jwt.io) of the JWT project to learn more about it.

If you simply want to enforce token based authentication on a resource and nothing else, you need to use the `authenticated` rule. 

### Where to get tokens from?

Usually a token is generated and provided by an authentication service on a successful signin/signup request by an user. These tokens are signed with a `secret` by the authentication service. This `secret` needs to be provided to Space Cloud in order for token based authentication to work. 

You can either use the [in-built user management module]() of Space Cloud as an authentication service or use a custom / third-party service.

## Authorizaton

This mechanism decides whether an authenticated user is authorized or not to make a request. The access to request is granted only if the security rule is resolved based on it's type. Various ways to grant access are:

- Matching criterias based on the fields in the incoming request and token claims. (`match` rule)
- Making a database query to make use of additional data while granting the access.
- Triggering a webhook to invoke custom logic to grant access.

You can easily [mix match different security rules together]() in Space Cloud to solve complex access control problems.

## Data masking

Data masking is the process of replacing/hiding parts of your data from the user or the system. 

For instance, many compliances require you to encrypt all the private details of an user like `email` or `name` to be encrypted. In some use cases you might want certain sensitive parts of your data to be viewed only by an user authorized to view that. 

**Example:** Remove the `address` and `email` fields from the response of reading `profiles` table if the profile is not his own:

{{< highlight javascript >}}
{
  "rule": "remove",
  "fields": ["address", "email"],
  "clause": {
    "rule": "match",
    "type": "string",
    "eval": "==",
    "f1": "args.auth.id", // assuming token consist of a claim named id that contains the user id
    "f2": "args.find.id" // assuming profiles table consist of id field indicating the user of the profile 
  }
}
{{< /highlight >}}

## Next steps

- Read more about various security rules in details.
- Real world examples of security examples.
- Configuring the security rules.