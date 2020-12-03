---
title: "Minikube"
description: "Installing Space Cloud on Minikube"
date: 2020-02-18T18:04:00+05:30
draft: false
weight: 3
---

Follow these instructions to install Space Cloud on Minikube.

## Step 1: Install Minikube

> **Make sure you have `kubectl` installed before installing minikube.**

Install the latest version of [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/) for Windows, Linux or macOS.

Start minikube:

```bash
minikube start --cpus=4 --memory=8096
```

## Step 2: Install Istio

Space Cloud requires [Istio](https://istio.io/docs/setup/getting-started/) to work correctly. The default Istio profile works perfectly well.

Download the latest istio release:
```bash
curl -L https://istio.io/downloadIstio | sh -
```

> **Space Cloud has been tested with Istio versions `v1.8.X`, `v1.7.X` and `v1.6.X`.**

Move to the Istio package directory and install Istio. For example, if the package is `istio-1.8.0`:
```bash
cd istio-1.8.0
./bin/istioctl install --set profile=demo
```

For more detailed Istio install instructions, visit the [Istio Docs](https://istio.io/latest/docs/setup/install/istioctl/)

## Step 3: Install Space Cloud

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

## Step 4: Open Mission Control

You should be able to access Mission Control on `http://$(minikube ip):30122/mission-control`

Set up port forwarding to access Mission Control on `localhost:4122`.

```bash
kubectl port-forward -n istio-system deployments/istio-ingressgateway 4122:8080
```

You should be able to access Mission Control on `http://localhost:4122/mission-control`.

The default credentials are:
- **Username:** admin
- **Key:** 1234

You can change it by editing the `admin.username` and `admin.password` variables of [the space-cloud configuration](/install/kubernetes/configure) file.

## Next Steps

Awesome! We just started Space Cloud using Kubernetes. Next step would be to [set up a project](/introduction/setting-up-project/) to use Space Cloud in your preferred language.

Feel free to check out various capabilities of `space-cloud`:

- Perform database [operations](/storage/database/queries)
- [Mutate](/storage/database/mutations) data
- [Realtime](/storage/database/subscriptions) data sync across all devices
- Manage files with ease using [File Storage](/storage/filestore) module
- [Authenticate](/user-management) your users
- Explore Space Cloud's [microservice](/microservices) capability