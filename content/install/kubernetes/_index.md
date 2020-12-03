---
title: "Kubernetes"
description: "Installing Space Cloud on Kubernetes"
date: 2019-02-15T18:03:26+05:30
draft: false
weight: 1
---

The first step to start using Space Cloud is setting it up. Space Cloud requires several components to be running for proper functions. The most important components are:

- **Gateway:** Responsible for ingress traffic and generation of REST / GraphQL APIs.
- **Runner:** Responsible for communicating with K8s and deploying your services.

Luckily, we don't have to interact with these components directly. Space Cloud ships with a utility named `space-cli` which bootstraps a cluster for us.

> If you just want to use the `Gateway` component of Space Cloud directly, you can [follow this guide](/install/using-gateway-directly) instead.

## Choosing a Installation Guide

There are many ways to get started with Kubernetes. Choose a guide which works for you best:
- [K3s](/install/kubernetes/k3s) **(recommended for deployment on Linux)**
- [Docker Desktop](/install/kubernetes/docker-desktop) **(recommended for deployment on Windows/MacOS)**
- [Minikube](/install/kubernetes/minikube)
- [MicroK8s](/install/kubernetes/microk8s)
- [Cloud Vendor](/install/kubernetes/cloud)