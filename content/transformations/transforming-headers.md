---
title: "Transforming Headers"
description: "Transforming Headers"
date: 2020-11-27T10:37:22+05:30
draft: false
weight: 1
---

Space Cloud allows you to easily modify headers in the request/response.

> **This feature is available only in remote services and ingress routes.**

## Purpose

Many a times your services might be expecting certain values in some headers. For example, your service might expect the user's `id` (from the JWT claims) in a `X-User-Id` header. Insteading of expecting that the frontend will always set this headers, you can specify a header modification to set the `X-User-Id` header key with the `auth.id` value.

In certain cases, your clients might be requiring specific headers in the response. Instead of changing your service code, you can specify the header modifications in Space Cloud.

## How it works

You can specify various modifications for the request/response headers. In each modifcation you specify the following 3 fields:

- `key`: The key of header.
- `value`: The value of header. Can be a static value or a variable.
- `op`: The operation to be performed.

There are three kinds of `op` (operations):
- `add`: Adds the specified `value` to the specified header `key`.
- `set`: Overrides the value of the specified `key` with the specified `value`.
- `delete`: Deletes the specified header key.

### Using variables and helper functions

The `value` specified in the header modification can be a static or variables.

For example, if you want to the set the `X-User-Id` header with the user's `id` from the JWT claims, you can specify the following modification:

- `key`: `X-User-Id`.
- `value`: `auth.id`. (`auth` is a variable holding the JWT claims of the request)
- `op`: `set`.

Check out the complete [list of available variables]().

Space Cloud also comes packed with certain helper functions which you can use in the header value. Check out the [list of available helper functions]().

## Specifying header modifications in remote services

Only request headers can be modified in remote services as of now at endpoint level.

Head over to the `GraphQL API` section in Mission Control:

Click the `View` button besides the required service to view the endpoints of that service:

Open the `Advanced` section of the endpoint configuration and scroll below to the `Modify request headers` section:

After checking the checkbox, you can specify a list of modifications that you want to perform on the request headers.


## Specifying header modifications in ingress routes

In ingress routes, you can specify both the request and/or response headers, at route level as well as globally.

### At route level

Head over to the `Ingress Routing` section in Mission Control:

Click the `Edit` button besides the required ingress route. Open the `Advanced` section of the routing config and scroll below to see these two sections:

As you can see, you can specify the modifications for both the request and response headers.

### Globally

If certain header modifications are applicable to all the routes, then specifying them again and again for each route can be tedious and error prone. 

Hence, Space Cloud allows you to specify header modifications globally as well for all the ingress routes apart from the route level modifications.  

> **Route level modifications take place after the global modifications. For example, if you have used the `set` operation for the same header key at both the route and global level, the value specified in the route level will override the one specified globally.**

To specify the header modifications globally, head over to the `Settings` tab in the `Ingress Routing` section of the Mission Control:


The modifications that you specify here for the request/response headers are applied to all the ingress routes.