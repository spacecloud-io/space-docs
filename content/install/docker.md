---
title: "Docker"
date: 2020-02-14T18:03:53+05:30
draft: false
weight: 1
---

The first step to start using Space Cloud is setting it up. Space Cloud requires several components to be running for proper functions. The most important components are:

- **Gateway:** Responsible for ingress traffic and generation of REST / GaphQL APIs
- **Runner:** Responsible for intra-cluster traffic and policy enforcement
- **Container Registry:** Responsible for storing docker images. We won't be needing this for local setup.

Luckily, we don't have to interact with these components directly. Space Cloud ships with a utility named `space-cli` which bootstraps a cluster for us.

> If you just want to use the `Gateway` component of Space Cloud directly, you can [follow this guide](/install/using-gateway-directly) instead.

## Prerequisites

- Make sure you have [Docker installed](https://docs.docker.com/install/).

## Downloading Space CLI

The first step is downloading `space-cli`. You can download a version for your particular platform:

- [Linux](https://storage.googleapis.com/space-cloud/linux/space-cli.zip)
- [MacOS](https://storage.googleapis.com/space-cloud/darwin/space-cli.zip)
- [Windows](https://storage.googleapis.com/space-cloud/windows/space-cli.zip)

Unzip the compressed archive.

**For Linux / Mac:** `unzip space-cli.zip && chmod +x space-cli`

**For Windows:** Right-click on the archive and select `extract here`.

To make sure if the space-cli binary is correct, type the following command from the directory where you downloaded space-cli:

**For Linux / Mac:** `./space-cli -v`

**For Windows:** `space-cli.exe -v`

The above command will print the `space-cli` version.

> Optionally, you can copy the `space-cli` binary to your environment path variable for global usage.

## Setting up Space Cloud

We can set up all Space Cloud components using a single command.

```bash
./space-cli setup --dev
```

The `setup` command selects `Docker` as a target by default and runs all the containers required to setup Space Cloud. On successful installation it generates an output similar to this one:

```bash
INFO[0000] Setting up space cloud on Docker
INFO[0000] Starting container space-cloud-gateway...
INFO[0000] Starting container space-cloud-runner...
INFO[0001] Space Cloud (id: "local-admin") has been successfully setup! :D
INFO[0001] You can visit mission control at http://localhost:4122/mission-control
INFO[0001] Your login credentials: [username: "local-admin"; key: "kUkqBffI1ISR"]
```

<!-- > **Note:** You can learn more about the `space-cli setup` command from [here]() link to the docs. -->

## Verify Installation

Verify the installation run the following docker command:

```bash
docker ps --filter=name=space-cloud
```

You should see an output similar to this!

```bash
CONTAINER ID        IMAGE                 COMMAND             CREATED              STATUS              PORTS                    NAMES
1263f8ab1372        spaceuptech/runner    "./app start"       About a minute ago   Up About a minute                            space-cloud-runner
35f820b550c7        spaceuptech/gateway   "./app run"         About a minute ago   Up About a minute   0.0.0.0:4122->4122/tcp   space-cloud-gateway
```

## Next Steps

Awesome! We just started Space Cloud using Docker. Next step would be to [set up a project](/introduction/setting-up-project/) to use Space Cloud in your preferred language.

Feel free to check out various capabilities of `space-cloud`:

- Perform database [operations](/storage/database/queries)
- [Mutate](/storage/database/mutations) data
- [Realtime](/storage/database/subscriptions) data sync across all devices
- Manage files with ease using [File Storage](/storage/filestore) module
- [Authenticate](/user-management) your users
- Explore Space Cloud's [microservice](/microservices) capability