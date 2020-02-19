---
title: "Restricting Resources"
date: 2020-02-14T10:45:00+05:30
draft: false
weight: 3
---

Space Cloud provides a mechanism to restrict the resources each task can consume. These limits let you optimize your cluster resources.

![Service resources](/images/screenshots/service-resources.png)

> **The total amount of resources required to run the service would be the sum of the resource required by all tasks combined.**

## Available Resource Types

Currently, you can restrict the following resources:
- **CPU:** Expressed as a fraction. (Eg. 0.5)
- **Memory:** Expressed in MBs. (Eg. 256)

> **Space Cloud doesn't yet support restricting disk space.**

## Default Resource Restrictions

Space Cloud always restricts resources by default. While these work for most use cases, you might want to tweak them as per your needs. Here are the default restrictions Space Cloud applies.

CPU   | Memory
---   | ---
0.1   | 100 MBs

## How it Works?

In Kubernetes, the resource restrictions are implemented as _Resource Requests_. You can read more about it [here](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#how-pods-with-resource-limits-are-run).