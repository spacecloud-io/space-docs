---
title: "Authentication"
description: "Authentication"
date: 2020-06-18T12:06:33+05:30
draft: false
weight: 2
skipsubheader: true
---

Space Cloud uses JWT based authentication. 

## How does authentication work?

Space Cloud expects a JWT token in every incoming request. For HTTP requests, the token should be present inside `Authorization` header as `Bearer <token>`, whereas for websocket requests, the token should be present in the `data.token` key of the message body.

The security module in Space Cloud checks whether a token is valid or not based on the following criteria:

- The token should get verified by any one of the `secrets` provided to Space Cloud.
- If the token contains an expiry (seconds since epoch in the `exp` claim), then its value should be in the future.

Space Cloud considers a request to be authenticated only if it contains a valid token. Once a token is considered valid, its claims are parsed and made available in the `args.auth` variable to be used by security rules.

If a user tries to change any of the token claims or tries to create his/her own false token, it would fail at the verification stage because of the nature of JWTs. You can check out the [official website](https://jwt.io) of the JWT project to learn more about it.

### Where to get tokens from?

Usually a token is generated and provided by an authentication service on a successful signin/signup request by an user. These tokens are signed with a `secret` by the authentication service. This `secret` needs to be provided to Space Cloud in order for token based authentication to work. 

You can either use the [in-built user management module]() of Space Cloud as an authentication service or use a custom / third-party service.

## Enforcing authentication

Authentication is enforced by all security rules except `allow`. However, if you just want to enforce authentication for a particular resource and no authorization logic, you need to use the `authenticated` rule like this:

{{< highlight javascript >}}
{
  "rule": "authenticated"
}
{{< /highlight >}}