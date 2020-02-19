---
title: "Cloud"
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

> **Make sure you have disabled `istio-ingressgateway`. Space Cloud configures and uses an internal ingress gateway.**

For convenience, we have already made a YAML file to install istio for a [production cluster](https://raw.githubusercontent.com/spaceuptech/space-cloud/master/install-manifests/kubernetes/prod/istio.yaml).

```bash
kubectl apply -f https://raw.githubusercontent.com/spaceuptech/space-cloud/master/install-manifests/kubernetes/prod/istio.yaml
```

Wait for all the pods to start:

```bash
kubectl get pods -n istio-system --watch
```

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
kubectl port-forward -n space-cloud service/gateway 4122:4122
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
