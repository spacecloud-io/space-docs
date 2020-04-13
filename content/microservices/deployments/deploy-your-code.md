---
title: "Deploy your code"
date: 2020-04-07T09:35:44+05:30
draft: false
weight: 2
---

Space Cloud lets you leverage all the capabilities of Kubernetes without having to learn the Kubernetes API. This guide shows how you can deploy your code to Space Cloud.

> **If you want an interactive and step-by-step guide to deploy your code, follow this [Space Cloud Basic guide](https://learn.spaceuptech.com/space-cloud/basics/deploy-a-service/)**

## Preparing your code for deployment

To deploy your code, it should have these two files:

- `Dockerfile` - To build the docker image since Space Cloud can only deploy docker containers.
- `service.yaml` - To describe the service configuration (example: resources, auto-scaling, ports)

> **If you already have these two files, you can straight away jump to [deploying the service](/microservices/deployments/deploy-your-code/#deploying-the-service).**

`space-cli` has a built-in command to generate both of these. It automatically generates a `Dockerfile` for us and a `service.yaml` as well with suitable defaults by asking us only a few required questions.

Checkout into the root folder of your code and just run the following command:

{{< highlight bash >}}
space-cli deploy --prepare
{{< /highlight >}}

It asks you the following bunch of questions to auto-generate the config file. Most notable questions are:

- **Project Id:** Id of the space cloud project in which you want to deploy this service.  
- **Service Id:** A unique name to identify your service.
- **Version:** A unique name (e.g. `v1`) to identify the different versions of your service. 
- **Port:** (Default: 8080) Port of the service that you want to expose. 

This will generate a `Dockerfile` and a `service.yaml` file if these files did not exist before. Feel free to explore and change both these files before finally deploying the service. The `service.yaml` file looks something like this:

{{< highlight bash >}}
./space-cli deploy
{{< /highlight >}}

Great! Your service now has everything that is required to deploy it.

## Deploying the service

Before we can deploy our service, we need to make sure that you have configured your Space Cloud project for which container registry to publish the docker images to.

If you are using the Docker setup of Space Cloud, then `space-cli` has a built-in command to spin up a container registry at `localhost:5000` for you and configure Space Cloud to publish images to this registry. Here's the command to do it:

> **In a production environment we recommend using a managed container registry (example: Google Container Registry), Checkout the docs for [using a custom container registry](/microservices/deployments/using-custom-container-registry) to do so.**

{{< highlight bash >}}
space-cli --project <project-id> add registry
{{< /highlight >}}

Since we have everything ready now, we are now going to build and publish the Docker image for our service and deploy it to Space Cloud with the config specified in its `service.yaml` file. We are going to use the `deploy` command of `space-cli` to do all of these.

Just run the following command from within your service folder:

{{< highlight bash >}}
space-cli deploy
{{< /highlight >}}

> **You  may have to run the above command with sudo privileges if your `docker` is not in the sudoer group.**

This will first build the docker image for our service and publish it to the configured container registry. The published docker image will be of the following format: 

{{< highlight bash >}}
<docker-registry>/<project-id>-<service-id>:<service-version>
{{< /highlight >}}

`space-cli` then automatically instructs the Space Cloud to deploy the published docker image of the service with the config specified in the `service.yaml` file.

That's it! You have successfully deployed your code using `space-cli`.

## Next steps

- Explore the [service configuration](/microservices/deployments/services-in-depth) in more detail.