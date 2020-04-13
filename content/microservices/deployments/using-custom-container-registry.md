---
title: "Using custom container registry"
date: 2020-04-07T09:17:32+05:30
draft: false
weight: 5
---

`space-cli` requires a container registry to push the docker images of your code. 

> **If you have followed the guide for [deploying your code](), you already know that `space-cli` can setup a docker registry as well for us. However, if you want to specify a custom container registry, this guide will help you do that.**

## Specifying custom container registry

Checkout the `Settings` section of `Mission Control` and click on the `Add Docker Registry` button to open the following form:

You can add any custom registry by selecting the `Others` option and providing the Docker registry like this:

However, to make it easy to add managed container registries of popular cloud vendors like Google, AWS and Azure, we have options for their managed registries as well. If you select an option apart from `Others`, you will be asked few more questions to auto generate the docker registry for that managed service. For example, if you choose `Google ACR`, you need to provide the `GCR Region` and `GCR Project`. 

## Authenticating with custom container registry

Make sure that the docker installed on the machine from where you are running `space-cli deploy` command is authenticated to use the custom registry that you have specified. Here are the guides to authenticate your docker to the popular managed container registries:

- [Google Container Registry](https://cloud.google.com/container-registry/docs/advanced-authentication)
- [Amazon Elastic Container Registry](https://docs.aws.amazon.com/AmazonECR/latest/userguide/Registries.html)
- [Azure Container Registry](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-authentication)