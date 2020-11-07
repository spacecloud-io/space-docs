---
title: "Security"
description: "Security"
date: 2020-06-17T07:33:39+05:30
draft: false
weight: 6
---

Security is a crucial part of building cloud native apps. We take security so seriously that we are close to being paranoid about it.

## Overview

Space Cloud provides powerful and flexible mechanisms to secure your apps/services at both the layers:

- Application layer (L7)
- Platform layer (L4)

## Application layer security features

- [Validating authentication]()
- Allowing [anonymous access]() to public data
- [Granting access conditionally]() based on the request, auth token claims and any existing data in your app:
- [Masking]() sensitive/private data     
- Implementing [custom authorization/validation logic]()


## Platform layer security features

- Automatic mTLS between all your services.
- Whitelisting of services (i.e. you can describe which services can talk to each other) 
- Storing environment variables and secrets in a secure manner.
- Securing external traffic via Letsencrypt's SSL certificates.  


<!-- ## Capabilities of security rules in Space Cloud

- Allowing / denying access to a particular resource.
- Allowing access to a particular resource to only authenticated users.
- Allowing access to a particular resource based on certain criterias. These criterias range from simple [matching on the incoming request]() to even [querying your database]() for advanced validations.
- Querying your custom access control APIs to grant access.
- [Masking data]() (encrypting, decrypting, hashing, etc) for sensitive information.

To learn more about how access control works in Space Cloud, check out the [access control basics](). -->