---
title: "Transforming Headers"
description: "Transforming Headers"
date: 2020-11-27T10:37:22+05:30
draft: false
weight: 1
---

Space Cloud allows you to modify headers in the request/response easily.

> **This feature is available only in remote services and ingress routes.**

## Purpose

Many times, your services might be expecting certain values in some headers. For example, your service might expect the user's `id` (from the JWT claims) in an `X-User-Id` header. Instead of expecting that the frontend will always set this header, you can specify a header modification to set the `X-User-Id` header key with the `id` value from the claims.

In some instances, your clients might be requiring specific headers in the response. Instead of changing your service code, you can specify the header modifications in Space Cloud.

## How it works

You can specify various modifications for the request/response headers. In each modification, you specify the following three fields:

- `key`: The key of header.
- `value`: The value of the header. Can be a static value or a variable.
- `op`: The operation to be performed.

There are three kinds of `op` (operations):
- `add`: Adds the specified `value` to the specified header `key`.
- `set`: Overrides the value of the specified `key` with the specified `value`.
- `delete`: Deletes the specified header key.

### Using variables and helper functions

The `value` specified in the header modification can be static or variable.

For example, if you want to the set the `X-User-Id` header with the user's `id` from the JWT claims, you can specify the following modification:

- `key`: `X-User-Id`.
- `value`: `auth.id`. (`auth` is a variable holding the JWT claims of the request)
- `op`: `set`.

Check out the complete [list of available variables](/transformations/available-variables).

Space Cloud also comes packed with certain [helper functions](/transformations/helper-functions) which you can use in the header value. 

## Specifying header modifications in remote services

Only request headers can be modified in remote services as of now at the endpoint level.

Head over to the `GraphQL API` section in Mission Control:

![Remote Services](/images/screenshots/remote-services.png) 

Click the `View` button beside the required service to view the endpoints of that service:

![Remote Endpoints](/images/screenshots/remote-endpoints.png) 

Open the `Advanced` section of the endpoint configuration and scroll below to the `Modify request headers` section:

![Remote Services Headers](/images/screenshots/remote-services-headers.png) 

After checking the checkbox, you can specify a list of modifications that you want to perform on the request headers.


## Specifying header modifications in ingress routes

In ingress routes, you can specify both the request and/or response headers, at route level as well as globally.

### At route level

Head over to the `Ingress Routing` section in Mission Control:

![Ingress Routes](/images/screenshots/ingress-routes.png) 

Click the `Edit` button beside the required ingress route. Open the `Advanced` section of the routing config and scroll below to see these two sections:

![Ingress Routes Headers](/images/screenshots/ingress-routes-headers.png) 

As you can see, you can specify the modifications for both the request and response headers.

### Globally

If certain header modifications are applicable to all the routes, then specifying them again and again for each route can be tedious and error-prone. 

Hence, Space Cloud allows you to specify header modifications globally as well for all the ingress routes apart from the route level modifications.  

> **Route level modifications take place after the global modifications. For example, if you have used the `set` operation for the same header key at both the route and global level, the value specified in the route level will override the one specified globally.**

To specify the header modifications globally, head over to the `Settings` tab in the `Ingress Routing` section of the Mission Control:

![Ingress Routes Headers](/images/screenshots/ingress-routes-global-headers.png)

The modifications that you specify here for the request/response headers are applied to all the ingress routes.