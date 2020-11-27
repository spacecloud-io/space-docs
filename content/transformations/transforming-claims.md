---
title: "Transforming Claims"
description: "Transforming Claims"
date: 2020-11-27T11:24:06+05:30
draft: false
weight: 2
---

Space Cloud allows you to easily transform the JWT claims of a request using Go templates.

> **This feature is available in event triggers and remote services only.** 

## Purpose

Many a times, your services might be expecting token claims with a different structure as compared to what your clients or Space Cloud would be providing. Or you might want to set or completely override the token claims in some cases. In either cases, you want a way to describe the desired token claims.  

For example, you might have an existing email service that sends a welcome email to users on signup. And, now you want to use it with Space Cloud's event triggers. However, let's say that your email service requires the following claims in the request:

{{< highlight json >}}
{
  "role": "admin"
}
{{< /highlight >}}

Now instead of changing your email service or making a wrapper service, you can simply specify a transformation in Space Cloud to provide the above claims in a request.


## How it works

Space Cloud allows you to template out the desired claims using [Go templates](). You must specify the template either as a JSON or a YAML string.

Space Cloud will first execute the specified go template. It will then parse the templated output depending on the template format (JSON/YAML) and use that parsed output as the claims.

Go templates are extremely powerful. With Go templates, you can describe conditions, range on a array, use variables and functions and much more. 

If you are new to Go templating, read this article on [using go templates]().

### Using variables and helper functions

The templates you will specify will have access to certain pre-defined variables. For example, the variable `auth` contains the existing claims.

For example, let's say that the claims provided by a client while calling a remote service contains the user's id in the `id` field of the claims, while you want to provide it to your service as the `userId` field in the claims. Here's how you can do it using the `auth` variable:

{{< highlight json >}}
{
  "userId": "{{.auth.id}}"
}
{{< /highlight >}}

Check out the complete [list of available variables]().

Space Cloud also comes packed with certain helper functions which you can use in templates. Check out the [list of available helper functions]().

## Specifying claims in event triggers
 