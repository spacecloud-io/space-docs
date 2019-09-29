---
title: "Manual (using binary)"
date: 2019-09-26T12:40:33+05:30
draft: true
weight: 2
---

This guide will help you setup Space Cloud quickly on your local machine via its binary executable. It will guide you through exploring the Space Cloud APIs on MongoDB without having to set up any project.

If you instead want to start a project from scratch using Space Cloud, then check out the [getting started](/docs/getting-started) guide.

## Prerequisites

- [MongoDB Database](https://docs.mongodb.com/manual/installation/)

> **Note:** MongoDB is not a dependency of Space Cloud. We are using MongoDB in this guide for ease of use because of it's schemaless nature.

## Step 1: Download Space Cloud

The first step is to download the binary. You need to download the binary for your operating system or you could build it directly from its source code. You will need go version 1.13.0 or later to build it from source.

Download the binary for your OS from here:

- [Mac](https://spaceuptech.com/downloads/darwin/space-cloud.zip)
- [Linux](https://spaceuptech.com/downloads/linux/space-cloud.zip)
- [Windows](https://spaceuptech.com/downloads/windows/space-cloud.zip)

You can unzip the compressed archive

**For Linux / Mac:** `unzip space-cloud.zip && chmod +x space-cloud`

**For Windows:** Right click on the archive and select `extract here`.

To make sure if the binary is correct, type the following command from the directory where the binary is downloaded:

**For Linux / Mac:** `./space-cloud -v`

**For Windows:** `space-cloud.exe -v`

It should show something like this:

{{< highlight bash>}}
space-cloud-ee version 0.12.0
{{< /highlight >}}

## Step 2: Start Space Cloud

> **Note:** Make sure your MongoDB is up and running before this point

To start Space Cloud in `dev` mode, just copy paste the following command and hit enter:

**For Linux / Mac:** `./space-cloud run --dev`

**For Windows:** `space-cloud.exe run --dev`

You should be seeing something like this when Space Cloud starts:

{{< highlight bash>}}
Starting Nats Server
Starting grpc server on port: 4124
2019/08/03 08:00:38 Syncman node query response error: failed to respond to key query: response is past the deadline
Starting http server on port: 4122

	 Hosting mission control on http://localhost:4122/mission-control/

Space cloud is running on the specified ports :D
{{< /highlight >}}

> **Note:** The `--dev` flag tells Space Cloud to run in dev mode (so that the admin UI does not asks for a username and password)

## Step 3: Configure Space Cloud

As you would have noticed, on running the binary, a `config.yaml` file and a `raft-store` folder would have been generated in the directory from where you had run it.

Space Cloud needs this config file in order to function. The config file is used to load information like the database to be used, its connection string, security rules, etc. 

Space Cloud has it's own Mission Control (admin UI) to configure all of this in an easy way. 

> **Note:** All changes to the config of Space Cloud has to be done through the Mission Control only. Changes made manually to the config file will get overwritten. 


### Open Mission Control

Head over to `http://localhost:4122/mission-control` to open Mission Control.

> **Note:** Replace `localhost` with the address of your Space Cloud if you are not running it locally. 

### Creating a project

Click on `Create a Project` button. 

Give a `name` to your project. MongoDB will be selected as your database by default. Keep it as it is for this guide.

Hit `Next` to create the project. On creation of project you will be directed to the project overview screen. 

### Configuring DB config

Head over to the `Database` section.

The `Connection String` input contains the default connection string of MongoDB which is `mongodb://localhost:27017`.

If your MongodDB isn't running on this address, then paste the `connection string` of your MongoDB over there and hit `Save` button. That's all what is required to configure Space Cloud for this guide!

> **Note:** If you are using an SQL database, you should hit the `Set Up Database` button to create the internal tables which Space Cloud requires after saving the right connection string.

## Step4: Let us try it out 

Our backend is up and running, configured to expose APIs on MongoDB. Time to explore it's awesome powers. 

[Explore GraphQL APIs](/getting-started/quick-start/explore-graphql) of Space Cloud using GraphiQL.