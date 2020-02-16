---
title: "Autoscaling"
date: 2020-02-14T10:45:00+05:30
draft: false
weight: 4
---

Space Cloud automatically scales your services to match on the load on the system. Each service is scaled independently of each other

![Service Autoscaling](/images/screenshots/service-autoscaling.png)

> **Currently, Autoscaling works for HTTP based workloads only**

## How it works

The following parameters are required in order for autoscaling to work.

- **Min:** The minimum number of instances for the service. This can be zero.
- **Max:** The maximum number of instances for the service.
- **Concurrency:** The desired number of requests per second indented for this service

Some points to remember:

- Autoscaling works for each service independently. This makes sure that each service can scale independent of the other keeping the system highly reactive.
- The number of instances is calculated at a global level. Space Clouds sums up the number of requests per second for each instance of each service and uses that to decide the desired number of replicas.
- Scaling down to zero works for HTTP workloads only.

## Limitations

The autoscaling feature is under active development. Currently, it contains the following limitations:

- It only works for HTTP workloads. Workloads with a port described as TCP will not be autoscaled. For such cases, the `min replica count` is considered as the desired scale.
- Scaling can only happen on the basis of number of requests per second.