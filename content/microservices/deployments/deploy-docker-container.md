---
title: "Deploy Docker Container"
description: "Deploying Existing Docker Container"
date: 2020-02-12T08:04:06+05:30
draft: false
weight: 1
---

Space Cloud lets you leverage all the capabilities of Kubernetes without having to learn the Kubernetes API. 

> **If you don't already have a docker container published for your code/service, then you should check out [deploying your code](/microservices/deployments/deploy-your-code).**

## Deploying docker container

Checkout to the `Deployments` section in the `Microservices` navigation. Click on the `Add` button to open the following form to create a service:

![Deployment add service form](/images/screenshots/add-deployment.png)

Enter the following config:

- **Service Id:** A unique name to identify your service.
- **Version:** A unique name (e.g. `v1`) to identify the different versions of your service. 
- **Docker Image:** The docker image that you want to deploy.
- **Ports:** Ports of the docker container that you want to expose.

Hit the `Deploy` button to deploy the service. 

> **We haven't changed any of the advanced configurations in this example. Feel free to explore those as well.**

Space Cloud will now pull the docker image (if it was not cached earlier) and run the docker container with the specified ports being exposed.

> **You can deploy containers from any docker registry as long as it is accessible to Space Cloud.**

Space Cloud also creates an internal domain to access the service from within the cluster. This internal domain is of the following format:

{{< highlight bash >}}
<service-id>.<project-id>.svc.cluster.local
{{< /highlight >}}

Assuming your project id is `myproject`, and you haved named your service as `myapp`, then the the internal domain will be:

{{< highlight bash >}}
myapp.myproject.svc.cluster.local
{{< /highlight >}}

Under the hood Space Cloud also configures [Istio](https://istio.io) and setups up **mtls**, **authentication policies** and more to secure your deployments by default.

## Next steps

- Explore the [service configuration](/microservices/deployments/services-in-depth) in more detail.