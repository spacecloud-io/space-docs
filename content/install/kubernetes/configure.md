---
title: "Configuration"
description: "Configuring Space Cloud"
date: 2019-02-15T18:03:26+05:30
draft: false
weight: 5
---

Sometimes it is important to configure certain parameters like Space Cloud's default admin username and password. Space Cloud lets you do that by providing a yaml file while running `space-cli setup`.

## Default Configuration

Space Cloud is started by sensible defaults which works out of the box for most use cases. The following configuration is used when no files are provided.

```yaml
# Default values for space-cloud.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

clusterId: "default" # Can contain lowercase alphanumeric characters only.
devMode: "true" # Turn this to false for production mode
version: "0.20.0" # This ensures both runner & gateway using the same version
isKedaEnabled: true # Set this to false to skip installing keda

admin:
  username: "admin" # Log in username. Consider changing this in production.
  password: "1234" # Log in password. Consider changing this in production.
  secret: "some-secret" # Space cloud uses this secret for parsing jwt tokens for config APIs

meta:
  logLevel: "debug" # debug | info | warn
  logFormat: "json" # text | json

# Gateway service configuration
gateway:
  image:
    name: "spaceuptech/gateway"
    pullPolicy: "IfNotPresent" # IfNotPresent | Always
  resources:
    requests:
      memory: "256Mi"
      cpu: "250m"
    limits:
      memory: "512Mi"
      cpu: "500m"
  ssl:
    enabled: "true"
    custom_ssl_secret: "" # If required change this to the Kubernetes secret name containing custom SSL cert
    custom_ssl_cert_key: "" # Secret key containing SSL public certificate
    custom_ssl_private_key: "" # Secret key containing SSL private key
  autoScaler: 
    averageCPUUtilization: 70
    minReplicas: 1
    maxReplicas: 10
  disableUI: "false"
  replicas: 3
  restricted_hosts: "*" # Comma seperated IPs for restricting access to admin UI
  envs: 

# Runner service configuration
runner:
  image:
    name: "spaceuptech/runner"
    pullPolicy: "IfNotPresent" # IfNotPresent | Always
  resources:
    requests:
      memory: "256Mi"
      cpu: "250m"
    limits:
      memory: "512Mi"
      cpu: "500m"
  autoScaler: 
    averageCPUUtilization: 70
    minReplicas: 1
    maxReplicas: 10  
  envs: 

# Redis service configuration
redis:
  image:
    name: "redis"
    version: "6.0"
    pullPolicy: "IfNotPresent" # IfNotPresent | Always
  resources:
    requests:
      memory: "256Mi"
      cpu: "250m"
    limits:
      memory: "512Mi"
      cpu: "500m"

# Prometheus service configuration
prometheus:
  image:
    name: "prom/prometheus"
    version: "v2.19.0"
    pullPolicy: "IfNotPresent" # IfNotPresent | Always
  resources:
    requests:
      memory: "256Mi"
      cpu: "250m"
    limits:
      memory: "512Mi"
      cpu: "500m"

# DB events service configuration
dbEvents:
  image:
    name: "spaceuptech/dbevents"
    version: "0.1.0"
    pullPolicy: "IfNotPresent" # IfNotPresent | Always
  resources:
    requests:
      memory: "256Mi"
      cpu: "250m"
    limits:
      memory: "512Mi"
      cpu: "500m"

# Connection string used by gateway & runner to connect to other services
connections:
  redisConn: "redis.space-cloud.svc.cluster.local:6379" 
  prometheusConn: "http://prometheus.space-cloud.svc.cluster.local:9090" 
```

## Overriding Default Configuration

To override the default configurations:
- Download the [default yaml config](https://raw.githubusercontent.com/spaceuptech/space-cloud/master/install-manifests/helm/space-cloud/values.yaml) and store it as a yaml file (Eg. `sc-config.yaml`).
- Make necessary changes in the file directly.
- Run the following command to install Space Cloud with the provided config:

```bash
space-cli setup -f sc-config.yaml
```

## Changing Configuration After Installation

It is possible to change Space Cloud configuration after installation as well.

Simply make a `sc-config.yaml` file with the updated config and run the following command:

```bash
space-cli update -f sc-config.yaml
```
