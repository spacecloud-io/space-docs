---
title: "Affinities"
description: "Affinities"
date: 2020-11-30T05:38:51+05:30
draft: false
weight: 7
---

## What is affinity?

Affinities help you control where your service runs. 

The default scheduling of Kubernetes is enough for most applications. However, in certain use cases, you might want to control where a service runs. 

For example, you might prefer that a particular service runs on nodes with SSD. Or that a particular service runs next to another service. This preference is known as affinity.

There are two types of affinities:

- **Node affinity:** Affinity or anti-affinity towards a group of nodes.
- **Service affinity:** Affinity or anti-affinity towards a group of services.

For a more in-depth understanding of affinities, you should consider reading [this guide](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/) from Kubernetes.

## Prerequisites

In order to specify service affinity, you must first attach labels to the service towards which you have an affinity. By default the following labels are attached to a service deployed by Space Cloud:

- `app`: `{{service.ID}}`
- `version`: `{{service.Version}}`
- `app.kubernetes.io/name`: `{{service.ID}}`
- `app.kubernetes.io/version`: `{{service.ID}}`
- `app.kubernetes.io/managed-by`: `space-cloud`
- `space-cloud.io/version`: `{{Space Cloud Version}}`

Apart from these labels, you can attach custom labels to a service. To attach labels to service, open the `Advanced` section of the service configuration and scroll below to the `Labels` section:

![Affinities](/images/screenshots/affinities.png)

You can add/edit/delete your labels from here. Click on the `Add a label` button to add a label. 

## Configuring affinity
 
Head over to the `Deployments` section in Mission Control:

![Deployments](/images/screenshots/deployments.png)

Click on the `Edit` button beside the required service to open the service configuration form. Open the `Advanced` section and scroll below to the `Affinities` section:

![Affinities](/images/screenshots/affinities.png)

Click on the `Add` button to add an affinity. You would see the following form:

![Add Affinity](/images/screenshots/add-affinity.png)

Configure the following fields to add an affinity:

### Type of affinity

- **Node:** If you want to specify an affinity (or anti-affinity) towards a group of nodes. 
- **Service:** If you want to specify an affinity (or anti-affinity) towards a service or group of services.

### Weight

Weight should be between -100 and 100. Specifying a negative weight implies an anti-affinity.

### Operator

There are two types of operators:

- **Preferred:** The affinity would be preferred. However, there is no guarantee that the affinity will be enforced.
- **Required:** The service will not run until the specified conditions (match expressions) are met.

### Topology key

Kubernetes topology key. Only applicable for affinity type `Service`.

### Target service projects

Only applicable for affinity type `Service`. The projects in which your target service exists.

### Match expressions

Match expressions help you describe the affinity towards a group of nodes or services using labels.

Each match expression contains the following fields:

- **Key:** The label key.
- **Operator:** The match operator.
- **Value:** The label values.

To use affinities, you first need to make sure your nodes/services have appropriate labels so that you can use the match expressions. You can easily manage the labels on your services via Mission Control.
