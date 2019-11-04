---
title: "Querying Remote Service"
date: 2019-11-04T09:56:01+05:30
draft: true
---

Once you [have added a remote service](/essentials/remote-services/adding-remote-service), you can access it via the GraphQL and REST APIs of Space Cloud.

This is how you can access a remote endpoint named `adder` of a service named `arithmetic` from your frontend:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#js">Javascript</a></li>
    </ul>
  </div>
  <div id="graphql" class="col s12" style="padding:0">
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
  <div id="js" class="col s12" style="padding:0">
{{< highlight javascript>}}
const { status, data } = await api.call("arithmetic", "adder", { num1: 10, num2: 20 })
{{< /highlight >}}  
  </div>
</div>

That's it! The arguments (num1 and num2) are available to the remote service in the request body. You can pass any number of arguments to the remote endpoint.