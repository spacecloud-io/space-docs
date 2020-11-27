---
title: "Security"
description: "Security"
date: 2020-06-17T07:33:39+05:30
draft: false
weight: 7
---

Security is a crucial part of building cloud-native apps. We take security so seriously that we are close to being paranoid about it.

## Overview

Space Cloud provides powerful and flexible mechanisms to secure your apps/services at both layers:

- Application layer (L7)
- Platform layer (L4)

## Application layer security features

- [Validating authentication](/security/security-rules/authenticated-access)
- Allowing [anonymous access](/security/security-rules/anonymous-access) to public data
- [Granting access conditionally](/security/security-rules/conditional-access) based on the request, auth token claims and any existing data in your app:
- [Masking](/security/security-rules/masking-data) sensitive/private data     
- Implementing [custom authorization/validation logic](/security/security-rules/custom-authorization-logic)


## Platform layer security features

- Automatic mTLS between all your services.
- Whitelisting of services (i.e. you can describe which services can talk to each other) 
- Storing environment variables and secrets in a secure manner.
- Securing external traffic via Letsencrypt's SSL certificates.  