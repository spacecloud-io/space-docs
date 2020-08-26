---
title: "Access Control"
description: "Access Control"
date: 2020-06-17T07:33:39+05:30
draft: false
weight: 6
---

## Overview

> Access control is the act of securing your apps from unauthorized access.

Access control consists of two parts:

- **Authentication:** Identifying the user of the request.
- **Authorization:** Determining whether an identified user has the rights to access a resource.

Space Cloud lets you write granular JSON based [security rules]() to enforce access control on every module of Space Cloud. These security rules can be **configured on the fly** without having to restart Space Cloud.

## Capabilities of security rules in Space Cloud

- Allowing / denying access to a particular resource.
- Allowing access to a particular resource to only authenticated users.
- Allowing access to a particular resource based on certain criterias. These criterias range from simple [matching on the incoming request]() to even [querying your database]() for advanced validations.
- Querying your custom access control APIs to grant access.
- [Masking data]() (encrypting, decrypting, hashing, etc) for sensitive information.

To learn more about how access control works in Space Cloud, check out the [access control basics]().