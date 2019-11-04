---
title: "Distributed Mode"
date: 2019-11-03T11:28:45+05:30
draft: true
weight: 3
---

This guide talks about running Space Cloud in distributed/clustered mode. Head over to our [discord channel](https://discordapp.com/invite/ypXEEBr) if you want any help in deployment.

## How it works
In distributed mode, Space Cloud requires [Consul](https://www.consul.io/) for service discovery and syncing config across the cluster. In the distributed mode, the eventing queue in Space Cloud needs to discover other `space-cloud` instances in the cluster to distribute the workload of event triggers and maintain the `ONLY ONCE` semantics of delivering events to the webhooks.

> **Note:** In distributed mode, Space Cloud does not store its config in a file. Instead, it uses the key-value store in `consul`.

## Running Space Cloud in distributed mode

Make sure you have `consul` up and running.

Run each instance of Space Cloud in the cluster with the following flags/environment variables:

- `--id` flag or `NODE_ID` variable: Used to identify a Space Cloud in the cluster uniquely 
- `--enable-consul` flag or `ENABLE_CONSUL` variable: To enable consul

Make sure that you have registered each Space cloud instance of your cluster in Consul with service name as `space-cloud` and service id as the unique id of Space Cloud.

By default, Space Cloud connects to Consul using the default connection options of Consul. However, you can override these defaults by passing the following environment variables to Space Cloud:

- `CONSUL_HTTP_ADDR`: HTTP address
- `CONSUL_HTTP_TOKEN`: HTTP token
- `CONSUL_HTTP_TOKEN`: HTTP authentication header
- `CONSUL_HTTP_SSL`: Whether or not to use HTTPS
- `CONSUL_CACERT`: CA file to use for talking to Consul over TLS
- `CONSUL_CLIENT_CERT`: Client cert file to use for talking to Consul over TLS
- `CONSUL_CLIENT_KEY`: Client key file to use for talking to Consul over TLS
- `CONSUL_TLS_SERVER_NAME`: Server name to use as the SNI host when connecting via TLS
- `CONSUL_HTTP_SSL_VERIFY`: Whether or not to disable certificate checking


That's all that is required to configure Space Cloud in distributed mode.