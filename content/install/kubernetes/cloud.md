---
title: "Cloud"
description: "Installing Space Cloud on a Managed Kubernetes Solution"
date: 2020-02-18T18:04:00+05:30
draft: false
weight: 5
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

> **Space Cloud has been tested with Istio versions `v1.8.X`, `v1.7.X` and `v1.6.X`.**

Move to the Istio package directory and install Istio. For example, if the package is `istio-1.8.0`:
```bash
cd istio-1.8.0
./bin/istioctl install
```

For more detailed Istio install instructions, visit the [Istio Docs](https://istio.io/latest/docs/setup/install/istioctl/)

## Step 2: Install Space Cloud

To install Space Cloud, first download `space-cli`:

- [Linux](https://storage.googleapis.com/space-cloud/linux/space-cli.zip)
- [MacOS](https://storage.googleapis.com/space-cloud/darwin/space-cli.zip)
- [Windows](https://storage.googleapis.com/space-cloud/windows/space-cli.zip)

Now install Space Cloud using the following command:

```bash
space-cli setup
```

> **For details on how to customise Space Cloud installation, visit the [customisation docs](/install/kubernetes/configure).**

Wait for all the pods to start:

```bash
kubectl get pods -n space-cloud --watch
```

## Step 3: Open Mission Control

You should be able to access Mission Control on `http://LOADBALANCER_IP/mission-control`

You can find the public IP address by running:

```bash
kubectl get -n istio-system svc
```

Set up port forwarding to access Mission Control on `localhost:4122`.

```bash
kubectl port-forward -n istio-system deployments/istio-ingressgateway 4122:8080
```

You should be able to access Mission Control on `http://localhost:4122/mission-control`.

The default credentials are:
- **Username:** admin
- **Key:** 1234

You can change it by editing the `admin.username` and `admin.password` variables of [the space-cloud configuration file](/install/kubernetes/configure).

## Next Steps

Awesome! We just started Space Cloud using Kubernetes. Next step would be to [set up a project](/introduction/setting-up-project/) to use Space Cloud in your preferred language.

Feel free to check out various capabilities of `space-cloud`:

- Perform database [operations](/storage/database/queries)
- [Mutate](/storage/database/mutations) data
- [Realtime](/storage/database/subscriptions) data sync across all devices
- Manage files with ease using [File Storage](/storage/filestore) module
- [Authenticate](/user-management) your users
- Explore Space Cloud's [microservice](/microservices) capability
