---
title: "JWT based authentication"
description: "JWT based authentication"
date: 2020-10-22T13:20:46+05:30
draft: false
weight: 2
---

Space Cloud supports JWT based authentication. 

## How does authentication work?

As you can see, authentication is handled outside of Space Cloud. 

However, Space Cloud is responsible for validating whether a user is authenticated or not. It also helps you enforce your access control logic along with any data masking steps if needed. Checkout the [security rules](/security/security-rules) to learn more about the possibilities of access control.

Space Cloud considers a request to be authenticated only if it contains a valid JWT token. Checkout the [jwt.io](https://jwt.io) project if you are new to JWTs.

Space Cloud will consider a token to be valid based on the following criteria:

- The token should get verified by any one of the `secrets` provided to Space Cloud. Checking out the docs for [adding-jwt-secrets](/security/jwt-based-authentication/configuring-jwt-secrets) to learn more about providing secrets to Space Cloud.
- If the token contains an expiry (seconds since epoch in the `exp` claim), then its value should be greater than the current time (in seconds since epoch).

Once a token is considered valid, its claims are parsed and made available in the `args.auth` variable to be used by security rules.

If a user tries to change any of the token claims or tries to create his/her own false token, it would fail at the verification stage because of the nature of JWTs. You can check out the [official website](https://jwt.io) of the JWT project to learn more about it.

## Providing JWT tokens in a request

For HTTP requests, the token should be present inside `Authorization` header as `Bearer <token>`, whereas for websocket requests, the token should be present in the `data.token` key of the message body.

Here's how a sample token looks like:

{{< highlight bash >}}
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.drt_po6bHhDOF_FJEHTrK-KD8OGjseJZpHwHIgsnoTM
{{< /highlight >}}


Usually these tokens should be provided by your authentication service on a successful signin/signup. Space Cloud can verify these tokens as long as it is configured with the secret used by your authentication service for signing these tokens.

Checkout the docs for [configuring JWT secrets](/security/jwt-based-authentication/configuring-jwt-secrets) to learn more about the different types of secrets supported and the additional security checks.

Space Cloud integrates out of the box with most popular third party auth services like Firebase Auth, Auth0, etc. Check out the docs for [integrating third party auth services](/security/jwt-based-authentication/third-party-auth) to learn more about it.

## Enforcing authentication

Authentication is enforced by all security rules except `allow` rule. However, if you just want to enforce authentication for a particular resource and no authorization logic, you should use the `authenticated` rule like this:

{{< highlight javascript >}}
{
  "rule": "authenticated"
}
{{< /highlight >}}

Check out the docs for [security rules](/security/security-rules) to learn more about the different types of security rules that you can use to enforce your access control logic.