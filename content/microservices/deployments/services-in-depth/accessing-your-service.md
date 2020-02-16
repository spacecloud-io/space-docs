---
title: "Accessing your service"
date: 2020-02-14T10:45:00+05:30
draft: false
weight: 2
---

Space Cloud creates a unique domain name to access your service from inside the cluster.

The domain created in this format: `<service-id>.<project-id>.svc.cluster.local`.

Let's say you created a service with the id `myapp` inside the project `myproject`. In such a case the domain name created would be `myapp.myproject.svc.cluster.local`.

This holds true for Kubernetes and Docker environments.

> **These are domains names which can be accessed from inside the cluster only. To expose services to the external world, refer to the [docs on routing](/microservices/deployments/exposing-a-service).**

