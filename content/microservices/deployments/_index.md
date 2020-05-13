---
title: "Deployments"
description: "Deploying Custom Code with Space Cloud"
date: 2020-02-14T10:45:00+05:30
draft: false
weight: 3
---

The _Deployments Module_ automatically deploys and scales your microservices on any Kubernetes cluster. It has first-class support of Istio; hence all your services enjoy the benefit of using a Service Mesh. All you need to do it provide a docker image and that's it.

> **Follow the [Space Cloud Basic guide](https://learn.spaceuptech.com/space-cloud/basics/deploy-a-service/) for step-by-step instructions to get started with the Deployments Module!**

In a nutshell, the deployments module lets you:
- Deploy docker images to Kubernetes / Docker
- Fully encrypt all internal traffic by default for enhanced security.
- PKI authentication for all services to prevent rogue services from accessing internal APIs.
- AutoScale HTTP workloads even down to zero!
- Define service to service communication policy for easy compliance with regulations.
- Ability to manage your microservice lifecycle for easy adoption of DevOps best practices like GitOps.

Space Cloud can also deploy docker images on a single node using the docker driver. However, this comes with a few limitations, which includes:
- No autoscaling
- No benefits of a service mesh
