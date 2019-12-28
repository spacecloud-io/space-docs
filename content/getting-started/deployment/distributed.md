---
title: "Distributed Mode"
date: 2019-11-03T11:28:45+05:30
draft: false
weight: 3
---

This guide talks about running Space Cloud in distributed/clustered mode. Head over to our [discord channel](https://discordapp.com/invite/ypXEEBr) if you want any help in deployment.

## How it works
In distributed mode, Space Cloud requires [Consul](https://www.consul.io/) or [Etcd](https://etcd.io/) for service discovery and syncing config across the cluster. In the distributed mode, we store the project config and addresses of all active `space-cloud` instances in a config store. The project config is automatically synced across all active instances and is persisted even after `space-cloud` restarts.

> **Note:** In distributed mode, Space Cloud does not store its config in a file. Instead, it uses the key-value store like `consul` or `etcd`.

## Running Space Cloud in distributed mode (using Consul)

Make sure you have [Consul up and running](https://learn.hashicorp.com/consul/getting-started/install). The official Consul docs has a guide on [setting up consul for a production environment](https://learn.hashicorp.com/consul/datacenter-deploy/day1-deploy-intro) as well.

Run each instance of Space Cloud in the cluster with the following flags/environment variables:

- `--store-type` flag or `STORE_TYPE` env variable with the value `consul`. This instructs `space-cloud` to use Consul as its config store.
- `--advertise-addr` flag or `ADVERTISE_ADDR` env variable. This value of this flag is broadcasted as the address of the current `space-cloud` instance to other instances. Eg. `10.192.0.3:4122` or `sc1.space-cloud.svc.cluster.local:4122`.

Space Cloud connects to Consul using the default connection options of Consul. However, you can override these defaults by passing the following environment variables to Space Cloud:

- `CONSUL_HTTP_ADDR`: HTTP address
- `CONSUL_HTTP_TOKEN`: HTTP token
- `CONSUL_HTTP_TOKEN`: HTTP authentication header
- `CONSUL_HTTP_SSL`: Whether or not to use HTTPS
- `CONSUL_CACERT`: CA file to use for talking to Consul over TLS
- `CONSUL_CLIENT_CERT`: Client cert file to use for talking to Consul over TLS
- `CONSUL_CLIENT_KEY`: Client key file to use for talking to Consul over TLS
- `CONSUL_TLS_SERVER_NAME`: Server name to use as the SNI host when connecting via TLS
- `CONSUL_HTTP_SSL_VERIFY`: Whether or not to disable certificate checking


That's all that is required to configure Space Cloud in distributed mode using Consul.

## Running Space Cloud in distributed mode (using Etcd)

Make sure you have a [Etcd up and running](https://etcd.io/docs/v3.4.0/dev-guide/local_cluster/). You can download the `etcd` binary from the [Github release page](https://github.com/etcd-io/etcd/releases).

Run each instance of Space Cloud in the cluster with the following flags/environment variables:

- `--store-type` flag or `STORE_TYPE` env variable with the value `etcd`. This instructs `space-cloud` to use Etcd as its config store.
- `--advertise-addr` flag or `ADVERTISE_ADDR` env variable. This value of this flag is broadcasted as the address of the current `space-cloud` instance to other instances. Eg. `10.192.0.3:4122` or `sc1.space-cloud.svc.cluster.local:4122`.

Space Cloud connects to Etcd using the default connection options of Etcd. However, you can override these defaults by passing the following environment variables to Space Cloud:

- `ETCD_ENDPOINTS`: Comma seperated list of addresses (Eg. `192.162.1.2:2379,192.162.1.3:2379,192.162.1.4:2379`)
- `ETCD_USER`: The username to login with when using authentication
- `ETCD_PASSWORD`: The password to login with when using authentication
- `ETCD_HTTP_SSL`: Whether or not to use HTTPS
- `ETCD_CACERT`: CA file to use for talking to Etcd over TLS
- `ETCD_CLIENT_CERT`: Client cert file to use for talking to Etcd over TLS
- `ETCD_CLIENT_KEY`: Client key file to use for talking to Etcd over TLS

That's all that is required to configure Space Cloud in distributed mode using Etcd.
