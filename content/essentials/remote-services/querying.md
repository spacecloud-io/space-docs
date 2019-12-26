---
title: "Querying Remote Service"
date: 2019-11-04T09:56:01+05:30
draft: false
weight: 3
skipsubheader: true
---

Once you [have added a remote service](/essentials/remote-services/adding-remote-service), you can access it via the GraphQL and REST APIs of Space Cloud.

## Querying static endpoints
Here's how you can access a remote endpoint named `adder` of a service named `arithmetic` from your frontend:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#graphql-static">GraphQL</a></li>
      <li class="tab col s2"><a href="#js-static">Javascript</a></li>
    </ul>
  </div>
  <div id="graphql-static" class="col s12" style="padding:0">
{{< highlight graphql >}}
query {
  adder(
    num1: 10,
    num2: 20
  ) @arithmetic {
    sum
  }
}
{{< /highlight >}}
  </div>
  <div id="js-static" class="col s12" style="padding:0">
{{< highlight javascript>}}
const { status, data } = await api.call("arithmetic", "adder", { num1: 10, num2: 20 })
{{< /highlight >}}  
  </div>
</div>

That's it! The arguments sent by the client (num1 and num2 in this case) are available to the remote service in the request body as well as URL params. You can pass any number of arguments to the remote endpoint.

## Querying dynamic endpoints

Let's say you have added an endpoint `hello` in `greeting` service which accepts path parameters like these:
{{< highlight bash >}}
/hello/{args.name}
{{< /highlight >}}

Then you can query this service in the following manner:
<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#graphql-dynamic">GraphQL</a></li>
      <li class="tab col s2"><a href="#js-dynamic">Javascript</a></li>
    </ul>
  </div>
  <div id="graphql-dynamic" class="col s12" style="padding:0">
{{< highlight graphql >}}
query {
  hello(
    name: "John"
  ) @greeting {
    sum
  }
}
{{< /highlight >}}
  </div>
  <div id="js-dynamic" class="col s12" style="padding:0">
{{< highlight javascript>}}
const { status, data } = await api.call("greeting", "hello", { name: "John" })
{{< /highlight >}}  
  </div>
</div>

The remote service gets `name: John` in the URL parameters as well as in the request body.