---
title: "Security Rules in Depth"
description: "Security Rules in Depth"
date: 2020-06-18T12:06:05+05:30
draft: false
weight: 3
---

Security rules are at the heart of security module in Space Cloud.

A security rule is nothing but a simple JSON object that describes the access control logic for an operation. You can configure the security rules for each module in Space Cloud at a granular level. For instance, the security rules for database module can be configured at the operation level (`create`, `read`, `update` and `delete`) for each table in your database.

All incoming requests to the Space Cloud are first validated by the API controller using the security rules defined by you. A request is allowed to be made only if the security rule for that operation resolves.

Security rules help you enforce various access control mechanisms on an operation:

- [Token based authentication]()
- [Authorization]() (based on the token claims, request and data in database)
- [Data masking]() (Encrypting, decrypting, etc)

The various types of Security rules in Space Cloud are:

- **allow**: This rule is used to disable access control entirely. 
- **deny:** This rule is to deny all incoming requests for an operation. It is especially useful to deny certain operations like `delete` while selectively allowing the other ones.
- **authenticated:** This rule is used to allow the request if a valid JWT token is found in the request. No checks are imposed beyond that.
- **match:** This rule is used to allow a certain request only when a certain condition has been met. Generally it is used to match the input parameters (like the where clause or certain fields in the document to be inserted) with the auth object (token claims). It can also be used for role based authentication (match the role of user to a particular value).
- **query:** This rule is used to allow a request based on the data in your database. Space Cloud makes a database query to resolve this rule. The query's find clause is generated dynamically. The rule is considered to be resolved if the `clause` provided in the `query` rule is resolved.
- **webhook:** This rule allows you to trigger a webhook in order to invoke any custom authorization logic that is not possible via Space Cloud's security rules. The rule is considered to be resolved if the webhook returns a status code of `2xx`.
- **encrypt, decrypt:** These rules are used to encrypt/decrypt fields in your request/response.
- **hash:** This rule is used to hash fields in your request/response.
- **force:** This rule is used to force the value of a certain field in your request/response.
- **remove:** This rule is used to remove the values of certain fields from your request/response.
- **and, or:** These rules helps you mix and match any other security rules to tackle complex access control tasks.

## Next steps

Read more about the different security rule types in detail. The documentation of individual security rule types are organized as per their nature (`Authorization`, `Data Masking`, etc.)

You can also check out the [available variables]() or [helper functions]() in security rules.  