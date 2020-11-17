---
title: "How it works"
description: "How it works"
date: 2020-06-17T10:23:19+05:30
draft: false
weight: 1
---

## Overview

Space Cloud provides robust and flexible mechanisms to secure your apps/services at both layers:

- Application layer (L7)
- Platform layer (L4)

## Application layer security

Application layer security consists of two parts:
- Authentication (Identifying the user of the request)
- Authorization (Ensuring that the user has sufficient permissions to make a particular request)

![Authentication](/images/architectures/authentication.png)

As you can see, authentication is performed outside of Space Cloud. However, it validates whether a request is authenticated and enforces your authorization/access-control logic. Space Cloud only expects a JWT token in each of your incoming requests. You can read more about using JWTs with Space Cloud from [here](/security/jwt-based-authentication).

As a developer, you need to write [security rules](/security/security-rules) via Space Cloud's admin console. All incoming requests to the Space Cloud are first validated by Space Cloud's API controller using the security rules defined by you. 

![Security Rules](/images/architectures/security-rules.png)

Security rules help check whether a request is authenticated and authorized. It can even modify the request/response before passing it on to the next stage. A request is allowed to be made, only if the security rules for that resource are resolved. 

Here's an example of a simple security rule for granting access to a resource only if the user's role is `admin`:

{{< highlight javascript >}}
{
  "rule": "match",
  "type": "string",
  "eval": "==",
  "f1": "args.auth.role", // assuming JWT consist of a claim named role
  "f2": "admin" 
}
{{< /highlight >}}

Security rules help you perform various access control operations like:

- [Validating authentication](/security/security-rules/authenticated-access)
- Allowing [anonymous access](/security/security-rules/anonymous-access) to public data
- [Granting access conditionally](/security/security-rules/conditional-access) based on the request, auth token claims and any existing data in your app:
- [Masking](/security/security-rules/masking-data) sensitive/private data     
- Implementing [custom authorization/validation logic](/security/security-rules/custom-authorization-logic)

## Platform layer security

On the platform layer, Space Cloud utilizes the power of Kubernetes and Istio under the hood to provide you the following security benefits:

- Automatic mTLS between all your services.
- Whitelisting of services (i.e. you can describe which services can talk to each other) 
- Storing environment variables and secrets in a secure manner.
- Securing external traffic via Letsencrypt's SSL certificates.  

## Next steps

- In depth explanation of [various security rules](/security/security-rules)..
- [Configuring the security rules](/security/security-rules/configuring-rules).