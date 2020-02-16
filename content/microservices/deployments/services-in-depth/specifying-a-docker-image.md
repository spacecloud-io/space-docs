---
title: "Specifying a Docker Image"
date: 2020-02-14T10:45:00+05:30
draft: false
weight: 1
---

To use Space Cloud's _Deployments Module_ you need to specify a docker image to deploy.

> **Currently, Space Cloud can only deploy containerized applications.**

## Specify an image from Docker Hub

In the add service form, you'll see the following config

![Docker image public](/images/screenshots/docker-image-public.png)

All you need to do is supply the docker image name and that's it. For eg. `spaceuptech/basic-service`.

> **Space Cloud will search for the image on Docker Hub by default.**

## Specify an image from another registry

In some cases, you may want to use a registry apart from Docker Hub. This is especially true when using the registry provided by a cloud vendor. In this case you simply prefix the url of the registry to the name of the docker image.

Here are a few examples of `spaceuptech/basic-service` being on different registries.

- **Docker Hub:** `spaceuptech/basic-service`
- **Google Container Registry:** `gcr.io/spaceuptech/basic-service` ([more details](https://cloud.google.com/container-registry/docs/pushing-and-pulling#tag_the_local_image_with_the_registry_name))
- **Amazon Container Registry:** `<aws_account_id>.dkr.ecr.<region>.amazonaws.com/basic-service` ([more details](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html))

## Specify a private image

You might want to create private images for the more sensitive applications. Space Cloud gives you the provision to pull private images as well.

The first step is creating a docker secret from the `Secrets` section. You will be asked to provide the following:
- **Name:** The name to use while referring to the secret.
- **User Name:** The username used to login into the registry.
- **Password:** The password used to login into the registry.
- **Registry Url:** The url of the registry being used.

![Create Docker Secret](/images/screenshots/create-docker-secret.png)

Once you have the secret ready, simply use it while creating / updating the service.

![Docker image private](/images/screenshots/docker-image-private.png)

