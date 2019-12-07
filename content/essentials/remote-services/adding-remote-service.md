---
title: "Adding Remote Service"
date: 2019-10-19T10:45:42+05:30
draft: true
weight: 2
---

Follow the steps below to add a remote service to Space Cloud:

## Step 1: Write a custom HTTP server

You first need to create your custom HTTP server and deploy it. You can write this server in any language or framework of your choice. 

> **Note:** The custom logic that you want to access via Space Cloud should only go in `POST` handlers.

## Step 2: Add remote service

Head to the `Remote Services` section in Mission Control.

Click on the `Add` button to open the following form:

![Add service screen](/images/screenshots/add-service.png)

You need to enter the following information:

- **Service name:** Used in your frontend queries to uniquely identify a service. This name should be unique within a project.
- **Remote URL:** The URL of your remote service.

Click on the `Add` button to add the remote service. 

Once you have added the remote service, you should be able to see it in the remote services table:

![Services table](/images/screenshots/services.png)

## Step 3: Add endpoint to your remote service

Click on the `View` button in the Actions column to open the service page.

Click on the `Add` button to add an endpoint to your remote service:

![Add endpoint screen](/images/screenshots/add-endpoint.png)

You need to enter the following information:

- **Name:** Used in your frontend queries along with the service name to uniquely identify an endpoint. This name should be unique within a service. 
- **Method:** The HTTP method for your endpoint.
- **Path:** Endpoint for your custom logic. Space Cloud makes an HTTP request of the specified method to the endpoint formed by `Service URL + Path`.

> **Note:** You can also use arguments to make the path dynamic. For example, a path - `/hello/{args.name}` will receive the `name` URL param from the arguments sent by the client in the query.

- **Rules:** These are the security rules for your endpoint. Read more about security [here](/auth/authorization).