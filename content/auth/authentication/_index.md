---
title: "Authentication"
date: 2019-09-23T08:08:17+05:30
draft: true
weight: 1
---

Space Cloud uses **JWT (JSON Web Token)** based authentication to identify the users of your app. You can use the in-built user management module of Space Cloud or any other auth services including your own.

## How it works

Space Cloud expects a JWT in every incoming request. The JWT should be present in the **Authorization header** of the request in the following format: `Bearer <JWT-TOKEN>`. 

Space Cloud verifies if the signature of the token is valid or not based on a `secret` provided to it, which can be configured via Mission Control. This makes sure that the user is authenticated and hasn't tried to change or create his / her own false token. You can check out the [official website](https://jwt.io) of the JWT project to learn more about it.

If the signature of the token is verfied, Space Cloud considers the request to be authenticated and parses the claims present in JWT for access control.

## In-built user management module

> **Note:** It is recommended to use your own user management module for a production environment. The current user management module is not production ready.

User management is used for managing the various sign in methods which are generally used to develop applications. It's basically a way for the user to sign up or login into your application. In addition to that it provides the user with a `JWT token` which is used in all the other modules for authentication and authorization. 

The various sign in methods supported are:
- Basic (email & password sign in)
- OAuth (Coming Soon)

### Configuration

Head over to the `User Management` section in the Mission Control.

**Enable** the Basic Email authentication.

User management module expects the information of users in a `users` table/collection. Thus, we will need to create one.

Head to the `Database` section and create a table/collection with the following schema:

{{< highlight graphql >}}
type users {
  id ID! @id ## _id for MongoDB
  email String!
  name String!
  pass String
  role String
}
{{< /highlight >}}

> **Note:** The password field is bcrypted by the user management module

**Hit save button**.

That's all you need to configure for user management module.

### Usage

Once you have configured the user management module as mentioned above, you can start using it in your apps.

On the frontend you can use one of our client SDKs to perform various operations in user management module:
- Email [sign in](/auth/authentication/signin)
- Email [sign up](/auth/authentication/signup)
- Reading [profiles](/auth/authentication/profiles)

