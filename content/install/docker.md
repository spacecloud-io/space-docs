---
title: "Docker"
description: "Installing Space Cloud on Docker"
date: 2020-02-14T18:03:53+05:30
draft: false
weight: 2
---

The recommended way to run Space Cloud is using the `space-cli setup` command, which installs Space Cloud in a [Kubernetes cluster](/install/kubernetes/).

Running Space Cloud as a standalone docker container comes with some feature restrictions. 


The features which are ~~striked through~~ are not available since they depend on **Kubernetes**.

- Database
- Filestore
- Graphql API
- Eventing (Not availabe when database is sql server)
- Caching
- ~~Deployments~~
- ~~Secrets~~
- Ingress routing


## When to use docker compose
Running Space Cloud in docker can be useful for the following use cases:
- Test out basic Space Cloud features
- A POC project

## Installation
We ship a `docker-compose` file for those seeking to use Space Cloud as a standalone docker image. Download the `docker-compose` file using commands shown below:

> **Windows users should use power shell for running the below command.**


<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#mongo">Mongo DB</a></li>
      <li class="tab col s2"><a href="#postgres">Postgres</a></li>
      <li class="tab col s2"><a href="#mysql">Mysql</a></li>
      <li class="tab col s2"><a href="#sql-server">Sql server</a></li>
    </ul>
  </div>

  <div id="mongo" class="col s12" style="padding:0">
{{< highlight bash >}}
curl "https://raw.githubusercontent.com/spacecloud-io/space-cloud/master/install-manifests/docker/mongo/docker-compose.yaml" -o docker-compose.yaml
{{< /highlight >}}
  </div>

  <div id="postgres" class="col s12" style="padding:0">
{{< highlight bash >}}
curl "https://raw.githubusercontent.com/spacecloud-io/space-cloud/master/install-manifests/docker/postgres/docker-compose.yaml" -o docker-compose.yaml && curl "https://raw.githubusercontent.com/spacecloud-io/space-cloud/master/install-manifests/docker/postgres/postgresql.conf" -o postgresql.conf
{{< /highlight >}}
  </div>

  <div id="mysql" class="col s12" style="padding:0">
{{< highlight bash >}}
curl "https://raw.githubusercontent.com/spacecloud-io/space-cloud/master/install-manifests/docker/mysql/docker-compose.yaml" -o docker-compose.yaml
{{< /highlight >}}
  </div>

  <div id="sql-server" class="col s12" style="padding:0">
{{< highlight bash >}}
curl "https://raw.githubusercontent.com/spacecloud-io/space-cloud/master/install-manifests/docker/sql-server/docker-compose.yaml" -o docker-compose.yaml
{{< /highlight >}}
  </div>
</div>

Run the following command to start the containers:
{{< highlight bash >}}
docker-compose up -d
{{< /highlight >}}
