---
title: "Using Gateway Directly"
description: "Using the Gateway Directly"
date: 2020-04-06T08:12:01+05:30
draft: false
weight: 3
---


This guide shows you how to use the `Gateway` component of Space Cloud directly.

## Why would I need to use the gateway directly?


<q>Space Cloud is an opensource serverless platform based on Kubernetes, which lets you develop, scale and secure cloud-native apps.</q>

You can see it as a Firebase + Heroku. On one side, it provides **instant GraphQL APIs for any database** which can be consumed directly from your frontend. On the other, it provides **serverless capabilities on top of kubernetes**. It also has an easy to use authorization system, end to end traffic encryption and a lot more.

To cover this entire spectrum of development (auto-generated GraphQL/REST APIs) to operations (auto-scaling, end to end traffic encryption), Space Cloud has two components:

- `Gateway` **(Reduces development time):** Responsible for ingress traffic and providing auto-generated GraphQL/REST APIs that can be consumed by frontend directly.
- `Runner` **(Automates operations):** Responsible for providing serverless capabilities, end-to-end traffic encryption, policy enforcement and other such features.

There might be various use cases why one would want to run the `Gateway` component directly, such as:

- You are just interested in the GraphQL/REST APIs that Space Cloud provides and don't need the serverless capabilities.
- You already have a deployment platform in place like [Nomad](https://nomadproject.io/) or [DCOS](https://dcos.io/), and so you don't want the `Runner` component.

Keeping such use cases in mind, we purposely split Space Cloud into two components.

## Using gateway directly

There are two ways of using the gateway directly:

- [Using the docker image](/install/using-gateway-directly/#using-the-docker-image)
- [Using the binary](/install/using-gateway-directly/#using-the-binary)

### Using the docker image


You can directly use the [docker image](https://hub.docker.com/r/spaceuptech/gateway) of gateway published on DockerHub by us.

The following command runs the gateway on docker in development mode and exposes its HTTP and HTTPS ports:

{{< highlight bash >}}
docker run --name sc-gateway -d -p 4122:4122 -p 4126:4126 -e DEV=true spaceuptech/gateway:latest
{{< /highlight >}}

Check out the [list of environment variables](/install/using-gateway-directly/#environment-variables--flags) below that you can pass to the gateway container.

### Using the binary

To use the binary of gateway directly, you first need to build it from its source.

> **You need to have Go 1.13.0 or above to build gateway from its source.**

Clone the repository of Space Cloud first:

{{< highlight bash >}}
git clone https://github.com/spaceuptech/space-cloud.git
{{< /highlight >}}


Checkout into the gateway folder:

{{< highlight bash >}}
cd space-cloud/gateway
{{< /highlight >}}

Now that we have the source code for the gateway, let's build it:

{{< highlight bash >}}
go build
{{< /highlight >}}

Building the gateway might take a few minutes depending on the internet as it downloads all the dependencies of gateway before building it.

Once the build is successful, you should be able to see a new binary with the name of `gateway` in case of Linux/Mac or `gateway.exe` in case of Windows. This is the desired binary that we need to use.

Now that we have the gateway binary, here's how to run it:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#unix">Linux/Mac</a></li>
      <li class="tab col s2"><a href="#windows">Windows</a></li>
    </ul>
  </div>
  <div id="unix" class="col s12" style="padding:0">
{{< highlight bash >}}
./gateway run --dev
{{< /highlight >}}
  </div>
  <div id="windows" class="col s12" style="padding:0">
{{< highlight bash >}}
gateway.exe run --dev
{{< /highlight >}}
  </div>
</div>

That's it. We have successfully run the gateway directly from its source code. You can pat yourself on the back now since you deserve it!😛

Check out the [list of environment variables/flags](/install/using-gateway-directly/#environment-variables--flags) below that you can pass to the gateway binary.

## Environment variables / flags

You can pass environment variables or flags while running the gateway to tweak certain things. Below is a list of the most important environment variables /flags:

> **While using docker container you can only set environment variables whereas with the binary you can use both the environment variables and/or flags**

| Environment variable | Flag             | Default value | Description                      |
|----------------------|------------------|---------------|----------------------------------|
| `DEV`                | `--dev`          | `false`       | Run gateway in development mode. |
| `ADMIN_USER`         | `--admin-user`   | `admin`       | Set the admin user name.         |
| `ADMIN_PASS`         | `--admin-pass`   | `123`         | Set the admin password.          |
| `ADMIN_SECRET`       | `--admin-secret` | `some-secret` | Set the admin JWT secret.        |
| `PORT`               | `--port`         | `4122`        | The HTTP port of Space Cloud. HTTPS port is auto calculated as (HTTP port + 4).|

The admin credentials are required to login into the `Mission Control` (Admin UI of Space Cloud).