---
title: "Kubernetes"
date: 2020-02-15T18:04:00+05:30
draft: false
weight: 2
---
The first step to start using Space Cloud is setting it up. Space Cloud requires several components to be running for proper functions. The most notable components are:

- **Gateway:** Responsible for ingress traffic and generation of REST / GaphQL APIs
- **Runner:** Responsible for intra cluster traffic and policy enforcement
- **Container Registry:** Responsible for storing docker images. We won't be needing this for local setup.

Luckily, we don't have to interact with these components in most use cases directly. Space Cloud ships with a utility named `space-cli` which will bootstrap a cluster for us.

## Prerequisites

- Make sure you have a Kubernetes cluster ready.
- Point `kubectl` to your cluster

## Installing Istio

Space Cloud requires [Istio to be installed](https://istio.io/docs/setup/getting-started/) in order to work properly. The default Istio profile works perfectly well.

> **Make sure the you have disabled `istio-ingressgateway`. Space Cloud configures and uses it's own ingress gateway.**

For convenience, we have already made a yaml file to install istio for a [local cluster](https://raw.githubusercontent.com/spaceuptech/space-cloud/master/install-manifests/kubernetes/local/istio.yaml) and [production cluster](https://raw.githubusercontent.com/spaceuptech/space-cloud/master/install-manifests/kubernetes/prod/istio.yaml).

After downloading either one of the files simply run:

```bash
kubectl apply -f istio.yaml
```

## Installing Space Cloud

Download the Kubernetes config file for [installing Space Cloud on minikube](https://raw.githubusercontent.com/spaceuptech/space-cloud/master/install-manifests/kubernetes/local/space-cloud.yaml) or for [installing Space Cloud on a cloud vendor](https://raw.githubusercontent.com/spaceuptech/space-cloud/master/install-manifests/kubernetes/prod/space-cloud.yaml).

After downloading the file simply run:

```bash
kubectl apply -f space-cloud.yaml
```

> **If you are using the config file for minikube, Mission Control will be accessible at `http://$(minikube ip):30122/mission-control`.**

The default credentials are:
- **Username:** admin
- **Key:** 1234

You can change it by editing the `ADMIN_USER` and `ADMIN_PASS` env variables of the `gateway` deployment. You can find these towards the end of the `space-cloud.yaml` file.  


## Next Steps

Awesome! We just started Space Cloud using Docker. Next step would be to [set up a project](/introduction/setting-up-project/) to use Space Cloud in your preferred language.

Feel free to check out various capabilities of `space-cloud`:

- Perform database [operations](/storage/database/queries)
- [Mutate](/storage/database/mutations) data
- [Realtime](/storage/database/subscriptions) data sync across all devices
- Manage files with ease using [File Storage](/storage/filestore) module
- [Authenticate](/user-management) your users
- Explore Space Cloud's [microservice](/microservices) capability