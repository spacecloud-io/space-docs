---
title: "Simple Access Deny"
description: "Simple Access Deny"
date: 2020-06-18T12:06:20+05:30
draft: false
weight: 1
---

`allow` and `deny` are used to simply allow or deny access to a resource without any conditions. 

> **`allow`/`deny` should be used directly at the root and not inside any other security rule such as `and`/`or`.** 

## Allow

`allow` is used to disable access control entirely for a particular resource. The request is allowed to be made even if the JWT token is absent in the request. This rule is used when you want a resource to be public (i.e. even anonymous users should be able to access it)

**Example:** Allow access to anyone to view articles of your blog by providing the following rule for the `read` operation of the `articles` table:

{{< highlight javascript >}}
{
  "rule": "allow"
}
{{< /highlight >}}

> **You shouldn't use `allow` for mutations like `update` or `delete`. Otherwise any anonymous user might just update or delete your entire table.**

## Deny

`deny` is used to disable access to a particular resource entirely/ The request is always denied access irrespective of any token. 

> **Note:** All security rules, including `deny` are bypassed when the request contains an internal Space Cloud token.

This rule is used when you don't want to expose certain resource or operation.

**Example:** Deny access to delete any article by providing the following rule for the `delete` operation of the `articles` table:

{{< highlight javascript >}}
{
  "rule": "deny"
}
{{< /highlight >}}