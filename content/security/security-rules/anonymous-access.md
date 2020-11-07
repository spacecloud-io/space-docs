---
title: "Anonymous/Public Access"
description: "Anonymous/Public Access"
date: 2020-10-22T13:26:45+05:30
draft: false
weight: 3
---

Many a times, you might want to expose/restrict certain operations on a resource publicly i.e. grant/deny access irrespective of whether the user is logged in or not. 

Space Cloud allows you to do this in a very easy manner by using the `allow` and `deny` rules. 

## Grant access to anonymous users

The `allow` rule is used to disable access control entirely for a particular operation on a resource. The request is allowed to be made even if the JWT token is absent in the request. This rule is used only when you want to publicly expose a resource.

**Example:** Allow anonymous users to view articles of your blog by providing the following rule for the `read` operation of the `articles` table:

{{< highlight javascript >}}
{
  "rule": "allow"
}
{{< /highlight >}}

> **You shouldn't use `allow` for mutations like `update` or `delete`. Otherwise any anonymous user might just update or delete your entire table.**

## Deny access completely

The `deny` rule is used to restrict access to a particular operation on a resource. The request is denied irrespective of whether the JWT token is present in the request or not.

**Example:** Restrict anyone from deleting the purchase history by providing the following rule for the `delete` operation of the `purchases` table:

{{< highlight javascript >}}
{
  "rule": "deny"
}
{{< /highlight >}}