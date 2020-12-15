---
title: "Transforming Body"
description: "Transforming Request/Response Body"
date: 2020-11-27T11:23:15+05:30
draft: false
weight: 3
---

Space Cloud allows you to transform the request/response body easily using Go templates.

## Purpose

Many times, your services might be expecting a request body with a different structure as compared to what your clients or Space Cloud would be providing. 

**For example**, you might have an existing email service that sends a welcome email to users on signup. Let's assume that this email service requires a request with the following body:

{{< highlight javascript >}}
{
  "name": "<name>"
  "email": "<email-address>"
}
{{< /highlight >}}


Now you want to use it with Space Cloud's event triggers. However, the webhook request body that Space Cloud posts have the following structure:

{{< highlight javascript >}}
{
  "specversion": "1.0-rc1",
  "id": "<unique-uuid>",
  "type": "<event-type>",
  "source": "<space-cloud-node-id>",
  "time": "<date-string>",
  "data": {
    "db": "<db-type>",
    "col": "<collection-name>",
    "docId": "<document-id>" ,
    "doc": { // Assuming that the users table consists of `id`, `name` and `email` fields.
      "id": "<user-id>",
      "name": "<name>",
      "email": "<email>"
    }
  }
}
{{< /highlight >}}

Now instead of changing your email service or making a wrapper service, you can simply specify a transformation in Space Cloud to transform the above webhook request body.

Similarly, in many cases, you might want to transform the response body as well.

**For example**, you might have a remote service with an endpoint that hits Stripe's API to fetch the status of the latest invoice of a subscription. The Stripe API returns a big nested object with the status field being in the `latest_invoice.status` field. 

However, you might simply want to return the `status` field at the root level to the client. You can once again use transformation in Space Cloud to transform the response body that would be sent to the client.


## How it works

Space Cloud allows you to template out the desired request/response body using [Go templates](https://golang.org/pkg/text/template/). You must specify the template either as a JSON or a YAML string.

Space Cloud executes the specified go template to generate the templated output at runtime. It then parses the templated output depending on the template format (JSON/YAML) and uses that parsed output as the request/response body.

Go templates are extremely powerful. You can use flow control blocks (`if else`, loops, etc.), variables, functions and much more in Go templates. 

If you are new to Go templates, read this article on [using go templates](https://blog.gopheracademy.com/advent-2017/using-go-templates/).

### Using variables and helper functions

The templates you specify will have access to certain pre-defined variables. For example, the variable `args` contains the current request/response body before the transformation.

For example, let's say that you want to forward the `user.id` field provided in the request body as `userId`. Here's how you can do it using the `args` variable:

{{< highlight json >}}
{
  "userId": "{{.args.user.id}}"
}
{{< /highlight >}}

Check out the complete [list of available variables](/transformations/available-variables).

Space Cloud also comes packed with certain [helper functions](/transformations/helper-functions) which you can use in templates.

## Specifying webhook request body transformations in event triggers

Head over to the `Eventing` section of the Mission Control:

![Event Triggers](/images/screenshots/event-triggers.png) 

Click the `Edit` button beside the required event trigger to open the event trigger configuration modal. 

Open the `Advanced` section and scroll below to `Apply Tramsformations` section:

![Event Triggers Transformations](/images/screenshots/event-triggers-transformations.png) 

After checking the checkbox, you can specify the template for webhook request as well as the template output format (JSON/YAML).

## Specifying request/response body transformations in remote services

Head over to the `GraphQL API` section in Mission Control:

![Remote Services](/images/screenshots/remote-services.png) 

Click the `View` button beside the required service to view the endpoints of that service:

![Remote Endpoints](/images/screenshots/remote-endpoints.png) 

Open the `Advanced` section of the endpoint configuration and scroll below to the `Apply transformations` section:

![Remote Services Transformations](/images/screenshots/remote-services-transformations.png) 

After checking the checkbox, you can specify the templates for request/response body as well as the template output format (JSON/YAML).

## Specifying request/response body transformations in ingress routes

Head over to the `Ingress Routing` section in Mission Control:

![Ingress Routes](/images/screenshots/ingress-routes.png) 

Click the `Edit` button beside the required ingress route to view its route configuration.

Open the `Advanced` section of the routing config and scroll below to the `Apply transformations` section:

![Ingress Routes Transformations](/images/screenshots/ingress-routes-transformations.png) 

After checking the checkbox, you can specify the templates for request/response body as well as the template output format (JSON/YAML).
