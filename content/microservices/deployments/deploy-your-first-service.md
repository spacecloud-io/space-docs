---
title: "Deploy your First Service"
date: 2020-02-12T08:04:06+05:30
draft: false
weight: 1
---

Space Cloud lets you leverage all the capabilities of Kubernetes without having to learn the Kubernetes API.

> **Follow the [Space Cloud Basic guide](https://learn.spaceuptech.com/space-cloud/basics/deploy-a-service/) for step-by-step instructions to get started with the Deployments Module!**

## Deployments Module

In mission control, the `Deployments` section in the `Microservices` navigation contains the UI to play around with the module. It looks something like this:

![Deployments overview](/images/screenshots/deployments-overview.png)

Hitting the `Deploying your first container` button opens up a form to create a new `Service`.

![Deployment add service form](/images/screenshots/deploy-basic-service.png)

The configuration entered in the above image is as follows:

Service Id  | Docker Image                | Port
---         | ---                         | ---
`myapp`     | `spaceuptech/basic-service` | `8080` with the protocol set to `HTTP`

## What does this do?

We just created a service named `myapp` and instructed Space Cloud to pull the `spaceuptech/basic-service` docker image from Docker Hub. We also specified that our `myapp` service listens on port `8080`.

> **We haven't changed any of the advanced configurations in this example. Feel free to explore those as well.**

Space Cloud now pulls the docker image and starts it with the default configs. It also creates an internal domain `myapp.myproject.svc.cluster.local` to access our service from within the cluster.

> **Domains are created in the format `<service-id>.<project-id>.svc.cluster.local`.**

Under the hood Space Cloud also configures [Istio](https://istio.io) and setups up **mtls**, **authentication policies** and more to secure your deployments by default.

## Next steps

- Explore the [service configuration](/microservices/deployments/services-in-depth) in more detail.