---
title: "Transforming Claims"
description: "Transforming Claims"
date: 2020-11-27T11:24:06+05:30
draft: false
weight: 2
---

Space Cloud allows you to transform the JWT claims of a request easily using Go templates.

> **This feature is available in event triggers and remote services only.** 

## Purpose

Many times, your services might be expecting token claims with a different structure as compared to what your clients or Space Cloud would be providing. Or you might want to set or completely override the token claims in some cases. In either case, you want a way to describe the desired token claims.  

For example, you might have an existing email service that sends a welcome email to users on signup. And, now you want to use it with Space Cloud's event triggers. However, let's say that your email service requires the following claims in the request:

{{< highlight json >}}
{
  "role": "admin"
}
{{< /highlight >}}

Now instead of changing your email service or making a wrapper service, you can simply specify a transformation in Space Cloud to provide the above claims in a request.


## How it works

Space Cloud allows you to template out the desired claims using [Go templates](https://golang.org/pkg/text/template/). You must specify the template either as a JSON or a YAML string.

Space Cloud executes the specified go template to generate the templated output at runtime. It then parses the templated output depending on the template format (JSON/YAML) and uses that parsed output as the claims.

Go templates are extremely powerful. You can use flow control blocks (`if else`, loops, etc.), variables, functions and much more in Go templates. 

If you are new to Go templates, read this article on [using go templates](https://blog.gopheracademy.com/advent-2017/using-go-templates/).

### Using variables and helper functions

The templates you specify will have access to certain pre-defined variables. For example, the variable `auth` contains the existing claims.

For example, let's say that the claims provided by a client while calling a remote service contains the user's id in the `id` field of the claims, while you want to provide it to your service as the `userId` field in the claims. Here's how you can do it using the `auth` variable:

{{< highlight json>}}
{
  "userId": "{{.auth.id}}"
}
{{< /highlight >}}

Check out the complete [list of available variables](/transformations/available-variables).

Space Cloud also comes packed with certain [helper functions](/transformations/helper-functions) which you can use in templates.

## Specifying claims in event triggers

Head over to the `Eventing` section of the Mission Control:

![Event Triggers](/images/screenshots/event-triggers.png) 

Click the `Edit` button beside the required event trigger to open the event trigger configuration modal. 

Open the `Advanced` section and scroll below to `Apply Tramsformations` section:

![Event Triggers Transformations](/images/screenshots/event-triggers-transformations.png) 

After checking the checkbox, you can specify the template for JWT claims as well as the template output format (JSON/YAML).

## Specifying claims in remote services

Head over to the `GraphQL API` section in Mission Control:

![Remote Services](/images/screenshots/remote-services.png)

Click the `View` button beside the required service to view the endpoints of that service:

![Remote Endpoints](/images/screenshots/remote-endpoints.png)

Open the `Advanced` section of the endpoint configuration and scroll below to the `Apply transformations` section:

![Remote Services Transformations](/images/screenshots/remote-services-transformations.png) 

After checking the checkbox, you can specify the template for JWT claims as well as the template output format (JSON/YAML).