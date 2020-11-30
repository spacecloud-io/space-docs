---
title: "Kubernetes"
description: "Installing Space Cloud on Kubernetes"
date: 2020-02-15T18:04:00+05:30
draft: false
weight: 2
---

The first step to start using Space Cloud is setting it up. Space Cloud requires several components to be running for proper functions. The most important components are:

- **Gateway:** Responsible for ingress traffic and generation of REST / GraphQL APIs
- **Runner:** Responsible for intra-cluster traffic and policy enforcement
- **Container Registry:** Responsible for storing docker images. We won't be needing this for local setup.

Luckily, we don't have to interact with these components directly. Space Cloud ships with a utility named `space-cli` which bootstraps a cluster for us.

> If you just want to use the `Gateway` component of Space Cloud directly, you can [follow this guide](/install/using-gateway-directly) instead.

## Choosing a Installation Guide

There are many ways to get started with Kubernetes. Choose a guide which works for you best:
- [MicroK8s](/install/kubernetes/microk8s) **(recommended for local deployment with k8s)**
- [Minikube](/install/kubernetes/minikube)
- [Cloud Vendor](/install/kubernetes/cloud) **(recommended for production systems)**
