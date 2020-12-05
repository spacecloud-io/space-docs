---
title: "MicroK8s"
description: "Installing Space Cloud on MicroK8s"
date: 2020-02-18T18:04:00+05:30
draft: false
weight: 4
---

Follow these instructions to install Space Cloud on MicroK8s.

## Step 1: Install MicroK8s

> **Make sure you have `kubectl` installed before installing microk8s.**

Install the latest version of [MicroK8s](https://microk8s.io/) for Windows, Linux or macOS.

Install the required add-ons:
```bash
microk8s enable dns rbac
```

Copy the kubernetes config file to your host:

```bash
mkdir ~/.kube
microk8s config > ~/.kube/config
```

Wait for all the pods to start:

```bash
kubectl get pods -n istio-system --watch
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

Set up port forwarding to access Mission Control on `localhost:4122`.

```bash
kubectl port-forward -n istio-system deployments/istio-ingressgateway 4122:8080
```

## Step 4: Open Mission Control

You should be able to access Mission Control on `http://localhost:4122/mission-control` or `http://YOUR_IP:4122/mission-control`.

If you are running microk8s on Windows or MacOS, k8s runs in a separate VM. Run `multipass list` to find the IP of that VM. It should have an ouptut similar to:

```bash
Name                    State             IPv4             Image
microk8s-vm             Running           192.168.64.17    Ubuntu 18.04 LTS
```

Use the IP printed on the terminal to connect to Space Cloud instead of `localhost`.

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
