---
title: "Docker Compose"
date: 2019-09-26T12:40:23+05:30
draft: true
weight: 1
---

This guide will help you run a local development setup that sets up both, Space Cloud and MongoDB. It will help you explore the Space Cloud APIs on MongoDB without having to set up any client side projects.

> **Note:** MongoDB is not a dependency of Space Cloud. We are using MongoDB in this guide for ease of use because of it's schemaless nature.

## Prerequisites

- [Docker](https://docs.docker.com/install/) >= 18.02.0
- [Docker Compose](https://docs.docker.com/compose/install/) >= 1.20.0


## Step 1: Get the docker-compose file

The [spaceuptech/space-cloud/install-manifests](https://github.com/spaceuptech/space-cloud/tree/master/install-manifests) repo contains all installation manifests required to deploy Space Cloud anywhere. Get the docker compose file from there:

{{< highlight bash>}}
wget https://raw.githubusercontent.com/spaceuptech/space-cloud/master/install-manifests/quick-start/docker-compose/mongo/docker-compose.yaml
{{< /highlight >}}

## Step 2: Run Space Cloud & MongoDB

{{< highlight bash>}}
docker-compose up -d
{{< /highlight >}}

Check if the containers are running:

{{< highlight bash>}}
docker ps
{{< /highlight >}}

## Step 3: Configure Space Cloud

If you `exec` into docker container of Space Cloud, you can see a `config.yaml` file and a `raft-store` folder would have been generated in the home directory.

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

Copy paste `mongodb://mongo:27017` in the `connection string` input.

Hit `Save` button. That's all what is required to configure Space Cloud for this guide!

## Step4: Let us try it out 

Our backend is up and running, configured to expose APIs on MongoDB. Time to explore it's awesome powers. 

[Explore GraphQL APIs](/getting-started/quick-start/explore-graphql) of Space Cloud using GraphiQL.
