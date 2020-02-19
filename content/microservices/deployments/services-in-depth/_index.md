---
title: "Services in Depth"
date: 2020-02-14T10:45:00+05:30
draft: false
weight: 3
---

At the core of the _Deployments Module_ is the `Service Configuration` commonly called `services`.

You can think of `services` as an equivalent of `Pods` in Kubernetes.

> **Space Cloud only supports running stateless services as of now.**

Each `service` describes the following:

## Service Id

Each service requires an id. These ids need to be unique inside a project. Services can be accessed internally using the domain name Space Cloud generates from this service id.

The format for the domains goes as: `<service-id>.<project-id>.svc.cluster.local`.

For example, if you create a service by the id `myapp` inside the project `myproject`, the domain generated would read as `myapp.myproject.svc.cluster.local`.

> **Note:** This is true for the docker driver as well. 

## Tasks

A `service` is composed of one or more tasks. You can see each task as an equivalent of `Containers` in each `Pod`.

> **Currently, Mission Control lets you create a single task in each service. For creating multiple tasks per service, use the `space-cli`.**

There are several cases when you would need to club several tasks together into one service.
- A logging task which collects and delivers all service logs
- A proxy task to intercept network traffic as in case of a service mesh
- A config management tasks which hot reloads the configuration of other tasks (like Nginx).

Space Cloud automatically injects an `istio-proxy` and `metrics-proxy` when using the Kubernetes driver.

You specify the following for each task.
- The ports exposed by the task (e.g. `8080`).
- The docker image and the registry credentials (if private).
- The resources (CPU and Ram) to be allocated to this task.
- The scaling configuration (e.g. max and min scale and concurrency).
- The secrets and environment variables used by the task.

## Upstreams

Space Cloud makes you explicitly define the upstream services your service depends on. All upstream services in the project are accessible by default.

## Whitelists

Whitelists are a way to describe service to service communication policies. As the name implies, it restricts downstream services from accessing the current service.