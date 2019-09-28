---
title: "Custom Backend Code"
date: 2019-09-21T11:59:05+05:30
draft: true
weight: 6
---

Space Cloud was made keeping flexibility in mind. It provides a neat way of writing custom backend code whenever requried. 

## Need of custom backend code

Most of the problems which we see as business logic, can actually be solved without any backend, just by using the basic building blocks (database, file storage and authorization module) provided by Space Cloud.

However, in certain scenarios, you need to write some backend code. Following are some scenarios when you may have to write backend code:

- Integration with 3rd party services and APIs (eg: Signin with Facebook)
- Perform certain **async tasks** on events (eg: sending a welcome email to user on signup)
- Custom data validation
- Advanced authorization problems (eg: Any one is authorized to watch premium content on Sunday nights)
- Run some ML or data processing algorithms periodically on your data 

## Functions Mesh

The functions module in Space Cloud brings the **ease of Functions as a Service** (FaaS) and power of a **microservice based architecture** together.

### Ease of FaaS

Functions module allows you to write backend code in the form of **simple functions** in any language. 

These functions can be called in a secure manner either directly from the frontend or from any other backend functions you have written. This provides the ease of development that FaaS has to offer. 

### Service Mesh Redefined

Unlike FaaS, Space Functions run as **long lived processes** on the backend giving you all the flxibility of microservice based architectures.

However, the functions module redefines the traditional service mesh architecture. The code you write is simple functions rather than end to end services.

Space Cloud takes care of **service discovery**, authorization, **load balancing** and all networking under the hood.


## How it works

As an user, you need to write functions on the backend. You can group related functions together as a `service`. Each service runs as a long lived process on the backend. In a single project, you can have multiple services in the language of your choice. 

Each service connects and subscribes to Space Cloud with its service name.

> **Note:** A service acts as a client to Space Cloud and not an upstream server.

The frontend or some other function can request to trigger a specific function by providing a service name, function name and params for that function. On receiving the request, Space Cloud first validates the request via the [authoization module](/auth/authorization). If the request can be made, it then makes an RPC (remote procedural call) on behalf of the client to the requested function. The function is executed with the params and returns a response to Space Cloud which is then returned to the client.

Space Cloud uses [Nats](https://nats.io) (pub sub broker) under the hood to heavy lift the scaling, networking and load balancing of RPC calls. Space Cloud runs a Nats server by default in it's own process so that you don't have to run a broker.

## Configuring the functions module

Head over to the `Functions Mesh` section in Mission Control to configure the functions module.

### Enabling the functions module
Enable the switch in the upper right corner of `Functions Mesh` section to enable the functions module.

### Configuring services

Mission Control by default creates the configuration for a `default` service for you with a `default` function. The configuration of the `default` service/function is used when the configuration of requested service/function is not found.    

The configuration of a service looks like the following: 

{{< highlight json >}}
{
  "functions": {
    "func1": {
      "rule": {
        "rule": "allow"
      }
    }
  }
}
{{< /highlight >}}  


The above example exposes all function calls to `func1`. You can learn more about securing the functions module in depth over [here](/auth/authorization/functions).  


