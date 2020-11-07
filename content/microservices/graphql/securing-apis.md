---
title: "Securing your APIs"
description: "Securing your GraphQL APIs"
date: 2020-02-12T08:04:06+05:30
draft: false
weight: 4
---

You can easily configure the access control logic of your remote services with Space Cloud's [security rules](). The security rules for remote services work on the endpoint level. This means you can have different rules for different endpoints in each remote service.

Here's a sample snippet which shows the security rules to access the endpoint `endpoint1` of service `service1`.

{{< highlight json >}}
{
  "rule": "allow"
}
{{< /highlight >}}


You can add rules for each endpoint under each service. A request to an endpoint is denied if there is no corresponding rule for it. This ensures that all calls to remote services are secure by default.

Space Cloud's security rules are flexible enough to enforce any access control logic including querying your databases, validating conditions and masking private data. Checkout the documentation of [security rules]() to learn more.

## Configuring security rules

Head over to the `Remote Services` section of the Mission Control. Click the `View` action of the required remote service:

You will be directed to a page which will show all the endpoints of that remote service. Click the `Secure` action next to any of the endpoint that you wish to secure.

This will open a Rule Builder UI to configure the rules easily:

The rule editor also comes packed with a quite a few [shortcuts]() to make you feel productive.

If you are more comfortable wih JSON, you can switch to the JSON editor as well by clicking on the `JSON` tab. 

The API Explorer of Mission Control comes packed with a [token builder]() as well to make testing your security rules for different JWT claims a breeze!

## Available variables

Following are the variables available in the security rules of a remote service call:

| Variable      | Data type | Description                                                                                            |
|---------------|-----------|--------------------------------------------------------------------------------------------------------|
| `args.auth`   | Object    | Object containing the jwt claims present in the token.                                                 |
| `args.params` | Object    | Object containing the params/arguments provided while calling the remote service.                      |
| `args.token`  | String    | Raw token present under the `Authorization` header in the request. (with the `Bearer ` prefix removed) |
