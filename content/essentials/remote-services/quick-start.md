---
title: "Quick Start"
date: 2019-10-19T10:45:30+05:30
draft: true
weight: 1
---

This guide helps you quickly get started with `Remote Services`. As mentioned earlier, remote services help you access your custom business logic via the unified API of Space Cloud.

In this guide, we are writing a service to carry out a complex arithmetic operation 😎. To be more precise, we are computing the addition of two numbers and returning the result 😛.

> **Note:** We are using NodeJS and Express to write the remote service. However, you can choose any language or framework.

## Prerequisites

- [NodeJS](https://nodejs.org/en/download/)
- [Docker](https://docs.docker.com/install/)

## Step 1: Writing a service

Let's start by writing our remote service. We are going to use npm as our package manager.

First, create a folder that serves as our working directory.

**Create NPM project:**

{{< highlight bash >}}
npm init -y
{{< /highlight >}}

**Install Express:**

{{< highlight bash >}}
npm install --save express
{{< /highlight >}}

**Write express server**

Create a file `index.js` and copy paste the following code:

{{< highlight bash >}}
var express = require("express");
var app = express();

app.use(express.json());

app.post("/adder", function(req, res) {
  const num1 = req.body.num1;
  const num2 = req.body.num2;
  const result = { sum: num1 + num2 };
  res.status(200).send(JSON.stringify(result));
});

var server = app.listen(5000, function () {
    console.log("app running on port:", server.address().port);
});
{{< /highlight >}}

As you can see, the code is pretty straight forward. We have just created an HTTP server using ExpressJS that is listening on port 5000.

This server listens for `POST` request on `/adder` endpoint. We are expecting to receive two numbers - num1 and num2 in the request body. All we are doing is returning the sum of these numbers. That's all we need to perform our complex arithmetic operation 😛.

## Step 2: Start the service

Simply run the following command to run the service:

{{< highlight bash >}}
node index.js
{{< /highlight >}}

Great! We have our remote service up and running. Let's start Space Cloud and use this remote service.

## Step 3: Start Space Cloud

You can start Space Cloud in a docker container by simply runnning the following command:

{{< highlight bash >}}
docker run -d -p 4122:4122 --name space-cloud -e DEV=true spaceuptech/space-cloud:latest
{{< /highlight >}}

> **Note:** You can also start space-cloud without docker by following [this guide](/getting-started/deployment/manual).


## Step 4: Configure Space Cloud

On running `space-cloud`, a `config.yaml` file gets generated in the directory from where you run `space-cloud`.

Space Cloud needs this config file to function. The config file is used to load information like the database to be used, its connection string, security rules, etc. 

Space Cloud has it's own Mission Control (admin UI) to configure all of this quickly. 

> **Note:** In distributed mode, Space Cloud stores the config in [Consul](https://www.consul.io/) instead of a file. 

### Open Mission Control

Head over to `http://localhost:4122/mission-control` to open Mission Control.

> **Note:** Replace `localhost` with the address of your Space Cloud if you are not running it locally. 

### Create project

Click on `Create a Project` button to open the following screen:

![Create a project screen](/images/screenshots/create-project.png)

Give a `name` to your project. For this guide, we'll use the name `my-adder`. 

It doesn't matter which database you choose here since we won't be using it anyways.

Hit `Next` to create the project.

## Step 5: Add remote service to Space Cloud

Head to the `Remote Services` section in Mission Control.

Click on the `Add first remote service` button to open the following form:

![Add service screen](/images/screenshots/add-service.png)

Put the service name as `arithmetic` and service URL as:

{{< highlight bash >}}
http://$HOST_ADDRESS:5000
{{< /highlight >}}

> **Note:** The `$HOST_ADDRESS` is the address of the host machine where the remote service is running.

Once you have added the remote service, you should be able to see it the remote services table:

![Services table](/images/screenshots/services.png)

Click on the `View` button in the Actions column to open the service page.

Click on the `Add first remote endpoint` button to open the following form:

![Add endpoint screen](/images/screenshots/add-endpoint.png)

Put the endpoint name as `adder` and path as `/adder`.

## Step 6: Query remote services

We have added our arithmetic service and the adder endpoint to Space Cloud. Time to query it using our unified GraphQL API.

Head to the `Explorer` section:

![Explorer](/images/screenshots/explorer.png)

Try running the following query in the GraphiQL explorer:

<div class="graphql holder">
<div class="query">
{{< highlight graphql "noclasses=false">}}
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
<div class="response">
{{< highlight json "noclasses=false">}}
{
  "data": {
    "adder": {
      "sum": 30
    }
  }
}
{{< /highlight >}}
</div>
</div>

If you have noticed, you have to use the `endpoint name` inside `query`, and the `service name`  as directive. The response is the object sent by the remote service. 


## Next steps
Great! You have learned how to write remote services! Next steps would be [securing them](/auth/authorization).