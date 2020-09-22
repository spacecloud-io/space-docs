---
title: "Cloud"
description: "Installing Space Cloud on a Managed Kubernetes Solution"
date: 2020-02-18T18:04:00+05:30
draft: false
weight: 3
---

Follow these instructions to install a production Space Cloud cluster on any cloud vendor.

## Prerequisites

- Make sure you have a Kubernetes cluster ready.
- Point `kubectl` to your cluster

> **Each node must have a minimum of 2 CPUs**

## Step 1: Install Istio

Space Cloud requires [Istio](https://istio.io/docs/setup/getting-started/) to work correctly. The default Istio profile works perfectly well.

Download the latest istio release:
```bash
curl -L https://istio.io/downloadIstio | sh -
```

> **Space Cloud has been tested with Istio versions `v1.7.X` and `v1.6.X`.**

Move to the Istio package directory and install Istio. For example, if the package is `istio-1.7.2`:
```bash
cd istio-1.7.2
./bin/istioctl install
```

For more detailed Istio install instructions, visit the [Istio Docs](https://istio.io/latest/docs/setup/install/istioctl/)

## Step 2: Install Space Cloud

To install Space Cloud, run the command:

```bash
kubectl apply -f https://raw.githubusercontent.com/spaceuptech/space-cloud/master/install-manifests/kubernetes/prod/space-cloud.yaml
```

Wait for all the pods to start:

```bash
kubectl get pods -n space-cloud --watch
```

## Step 3: Open Mission Control

You should be able to access Mission Control on `http://LOADBALANCER_IP:4122/mission-control`

You can find the public IP address by running:

```bash
kubectl get -n space-cloud svc gateway
```

Set up port forwarding to access Mission Control on `localhost:4122`.

```bash
kubectl port-forward -n istio-system deployments/istio-ingressgateway 4122:8080
```

You should be able to access Mission Control on `http://localhost:4122/mission-control`.

The default credentials are:
- **Username:** admin
- **Key:** 1234

You can change it by editing the `ADMIN_USER` and `ADMIN_PASS` env variables of the `gateway` deployment. You can find these towards the end of the [space-cloud.yaml](https://raw.githubusercontent.com/spaceuptech/space-cloud/master/install-manifests/kubernetes/prod/space-cloud.yaml) file.  

## Next Steps

Awesome! We just started Space Cloud using Kubernetes. Next step would be to [set up a project](/introduction/setting-up-project/) to use Space Cloud in your preferred language.

Feel free to check out various capabilities of `space-cloud`:

- Perform database [operations](/storage/database/queries)
- [Mutate](/storage/database/mutations) data
- [Realtime](/storage/database/subscriptions) data sync across all devices
- Manage files with ease using [File Storage](/storage/filestore) module
- [Authenticate](/user-management) your users
- Explore Space Cloud's [microservice](/microservices) capability
