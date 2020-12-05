---
title: "Third Party Auth Providers"
description: "Third Party Auth Providers"
date: 2020-10-22T13:22:45+05:30
draft: false
weight: 2
---

Space Cloud integrates out of the box with most of the popular third-party auth providers out there.

## How it works

Space Cloud supports JWT based authentication. Check out [how JWT based authentication works](/security/jwt-based-authentication) in Space Cloud to learn more about it. 

Most third party auth services provide a JWK URL where they publish their JWKs (JSON Web Keys used for signing the JWTs). The URL must publish the JWKs in the standard format as described in [https://tools.ietf.org/html/rfc7517](https://tools.ietf.org/html/rfc7517).

Once you provide the JWK URL of your auth provider to Space Cloud, it will automatically sync the JWKs from your auth provider to itself. Thus, Space Cloud would be able to verify any JWTs signed by your authentication service. 

You can then configure Space Cloud to enforce authentication and authorization on various resources using Space Cloud's [security rules](/security/security-rules). All the claims inside the JWT tokens would be available inside `args.auth` variables in your security rules. 

## Adding JWK URL

Head over to the Project settings tab in the Settings section of Mission Control. You would see a JWT secrets section there:

![JWK URL secret](/images/screenshots/add-secret/jwk-url.pn

Click on the `Add` button. Select the type as `JWK URL` and then provide the JWK URL as follows:

That's it!

## Rotating JWKs

Some providers rotate their JWKs (e.g. Firebase). If the provider sends

- `max-age` or `s-maxage` in Cache-Control header
- or `Expires` header

with the response of JWK, then Space Cloud will refresh the JWKs automatically. If the provider does not send the above, the JWKs are not refreshed.

## Security checks

### Audience check

Certain JWT providers share JWKs between multiple tenants (like Firebase). They use the `aud` claim of JWT to specify the intended tenant for the JWT. 

In these case, you **MUST** set the audience field to the appropriate value. Failing to do so is a major security vulnerability.

Setting the audience field in the secrets configuration will make sure that the `aud` claim from the JWT is also checked during verification. Not doing this check will allow JWTs issued for other tenants to be valid as well.

To set the audience field, check the `Check audience` option in the `Advanced` section while adding a JWT secret, and specify the intended audience value there: 

![Audience Check](/images/screenshots/add-secret/audience-check.png)

Space Cloud supports specifying multiple audiences for a secret. The audience check will pass if the value in the `aud` field of JWT matches with any one of the specified audiences. If the `aud` field in the JWT is an array of audiences (string), then the audience check passes if any of the audience in the `aud` field matches with any one of the specified audiences.

### Issuer check

Certain JWT providers set the `iss` field of the JWT so that the issuer of the JWT provider can be verified. 

Setting the issuer field in the secrets configuration of Space Cloud will make sure that the `iss` claim from the JWT is also checked during verification. This is an additional security check which must be enforced if the JWT provider supports it.  

To set the issuer field, check the `Check issuer` option in the `Advanced` section while adding a JWT secret. and specify the issuer value there: 

![Issuer Check](/images/screenshots/add-secret/issuer-check.png)

Space Cloud supports specifying multiple issuers for a secret. The issuer check will pass if the value in the `iss` field of JWT matches with any one of the specified issuers. If the `iss` field in the JWT is an array of issuers (string), then the issuer check passes if any of the issuers in the `iss` field matches with any one of the specified issuers.

## Popular auth provider configs

To make things easier for you, we have listed the JWK URL configs of the popular auth providers below.

### Firebase Auth

- **JWK URL:** `https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com`
- **Audience:** `<firebase-project-id>`
- **Issuer:** `https://securetoken.google.com/<firebase-project-id>`

> **Not setting the audience check in case of Firebase is a big security vulnerability.**

### Auth0

- **JWK URL:** `https://<your-auth0-domain>.auth0.com/.well-known/jwks.json`
