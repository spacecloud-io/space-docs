---
title: "Custom Auth Service"
description: "Custom Auth Service"
date: 2020-10-22T13:22:55+05:30
draft: false
weight: 3
---

Space Cloud supports JWT based suthentication. Hence, integrating your custom auth services with Space Cloud is a straight forward task. Check out [how JWT based authentication works]() in Space Cloud to learn more about it.

## How it works

Whenever users make a signup/signin request, your auth service signs a token and provide it to your users.

The supported signing algorithms as of now are `HS256` and `RS256`. This [answer](https://stackoverflow.com/questions/39239051/rs256-vs-hs256-whats-the-difference) on stackoverflow is a good resource to decide whether you should use HSA or RSA based algorithm for signing tokens.

Thereafter, the user should provide the token in each request to Space Cloud. For HTTP requests, the token should be present inside `Authorization` header as `Bearer <token>`, whereas for websocket requests, the token should be present in the `data.token` key of the message body.

You need to ensure that Space Cloud is configured with the same secret that is used by your auth service for signing tokens. Checkout the section for [configuring JWT secrets]() in Space Cloud.

Based on the resource that the user is trying to access and the security rules you have configured for that resource, Space Cloud will validate the token and enforce your access control logic. Checkout the [security rules]() to learn more about the possibilities of access control in Space Cloud.

## Security checks

### Adding expiry to tokens

To add expiry to your tokens, you should set the `exp` field of the JWT claims in your auth service. The value of the `exp` field should be time since epoch in seconds. 

**Example:**

{{< highlight javascript >}}
{
  "role": "user",
  "id": "1",
  "exp": 1516239022
}
{{< /highlight >}}

Space Cloud will consider a token to be valid based on the following criteria:

- The token should get verified by any one of the secrets provided to Space Cloud.
- If the token contains `exp` claim, then its value should be greater than the current time (in seconds since epoch).

### Rotating secrets

Rotating secrets with Space Cloud is pretty easy as Space Cloud supports multiple secrets. 

Steps to rotate secrets:

- Add your new secret to Space Cloud while keeping the old secret as well. Space Cloud would be able to verify JWTs signed with your old secret as well as the JWTs signed with the new secret.
- After a certain time, when you are confident that all the old tokens would have been expired, you can safely remove the old token from the Space Cloud's secrets configurations.   

### Audience check

If your auth service is providing JWTs to multiple apps, its essential to verify the audience of the JWT. Failing to do so is a major security vulnerability. 

You should set the `aud` claim of the JWTs in your auth service to specify the intended audience of the JWT. 

Then you should set the audience field in the secrets configuration of Space Cloud. 

To set the audience field, check the `Check audience` option in the `Advanced` section while adding a JWT secret. and specify the intended audience value there: 

Space Cloud supports specifying multiple audiences for a secret. 

The audience check will pass if the value in the `aud` field of JWT matches with any one of the specified audiences. If the `aud` field in the JWT is an array of audiences (string), then the audience check passes if any of the audience in the `aud` field matches with any one of the secified audiences.

### Issuer check

In certain rare scenarios, you might have multiple auth services for different applications, all using the same secret for signing the JWTs. 

In such case, you might want to validate the issuer of the JWT as well. In order to do so, you should set the `iss` field of the JWT in your auth service, specifying the issuer of the JWT.

Then you should set the issuer field in the secrets configuration of Space Cloud. 

To set the issuer field, check the `Check issuer` option in the `Advanced` section while adding a JWT secret. and specify the issuer value there: 


Space Cloud supports specifying multiple issuers for a secret. 

The issuer check will pass if the value in the `iss` field of JWT matches with any one of the specified issuer. If the `iss` field in the JWT is an array of issuers (string), then the issuer check passes if any of the issuer in the `iss` field matches with any one of the secified issuers.