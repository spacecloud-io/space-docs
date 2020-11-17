---
title: "MicroK8s"
description: "Installing Space Cloud on MicroK8s"
date: 2020-02-18T18:04:00+05:30
draft: false
weight: 1
---

Follow these instructions to install Space Cloud on MicroK8s.

## Step 1: Install MicroK8s along with Istio

Install the latest version of [MicroK8s](https://microk8s.io/) for Windows, Linux or macOS.

Install the required add-ons:
```bash
microk8s enable dns rbac istio
```

Wait for all the pods to start:

```bash
microk8s kubectl get pods -n istio-system --watch
```

## Step 2: Install Space Cloud

To install Space Cloud, run the command:

```bash
microk8s kubectl apply -f https://raw.githubusercontent.com/spaceuptech/space-cloud/master/install-manifests/kubernetes/local/space-cloud.yaml
```

Wait for all the pods to start:

```bash
microk8s kubectl get pods -n space-cloud --watch
```

Set up port forwarding to access Mission Control on `localhost:4122/mission-control`.

```bash
microk8s kubectl port-forward -n space-cloud statefulsets/gateway --address 0.0.0.0 4122:4122
```

## Step 3: Open Mission Control

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

You can change it by editing the `ADMIN_USER` and `ADMIN_PASS` env variables of the `gateway` deployment. You can find these towards the end of the [space-cloud.yaml](https://raw.githubusercontent.com/spaceuptech/space-cloud/master/install-manifests/kubernetes/local/space-cloud.yaml) file.  

## Next Steps

Awesome! We just started Space Cloud using Kubernetes. Next step would be to [set up a project](/introduction/setting-up-project/) to use Space Cloud in your preferred language.

Feel free to check out various capabilities of `space-cloud`:

- Perform database [operations](/storage/database/queries)
- [Mutate](/storage/database/mutations) data
- [Realtime](/storage/database/subscriptions) data sync across all devices
- Manage files with ease using [File Storage](/storage/filestore) module
- [Authenticate](/user-management) your users
- Explore Space Cloud's [microservice](/microservices) capability
