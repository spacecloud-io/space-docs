---
title: "Auth"
date: 2019-09-23T08:08:05+05:30
draft: false
weight: 4
---

Authentication and authorization are mechanisms to secure your app againts unauthorized requests.

Authentication involves **indentification** of the user behind the request, while authorization involves determining whether the request should be allowed to made or not based on identity or any other parameters.

## Authentication 

For authentication, you can either use the in-built user management module of Space Cloud or any other other auth services including your own.

Authentication in Space Cloud is based on **JWT (JSON Web Token)**. As long as there is a valid JWT in the request, Space Cloud will consider the request to be authenticated and use it's claims in the authorization.

## Authorization / Access Control

Authorization module in Space Cloud determines whether a request is authorized or not.

Space Cloud helps you define granular JSON based security rules for every other modules (database, file storage and remote services) in Space Cloud.

Space Cloud's authorization module is powerful enough to even allow you **define custom logic** for authorization.

**See more details about setting up authentication and authorization at:** 



