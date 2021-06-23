---
title: "Space CLI"
description: "Installing Space CLI for interacting with Space Cloud resources"
date: 2020-02-14T18:03:53+05:30
draft: false
weight: 2
---

## Context
Space CLI is heavily inspired from kubectl, if you have ever worked with kubectl before you won't have much difficulty in understanding space-cli operatons

## Installation
Run the below command to download the latest space-cli binary for yous OS

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#linux">Linux</a></li>
      <li class="tab col s2"><a href="#mac-os">Mac OS</a></li>
      <li class="tab col s2"><a href="#windows">Windows</a></li>
    </ul>
  </div>

  <div id="linux" class="col s12" style="padding:0">
{{< highlight bash >}}
wget https://storage.googleapis.com/space-cloud/linux/space-cli.zip
{{< /highlight >}}
  </div>

  <div id="mac-os" class="col s12" style="padding:0">
{{< highlight bash >}}
wget https://storage.googleapis.com/space-cloud/darwin/space-cli.zip
{{< /highlight >}}
  </div>

  <div id="windows" class="col s12" style="padding:0">
{{< highlight bash >}}
wget https://storage.googleapis.com/space-cloud/windows/space-cli.zip
{{< /highlight >}}
  </div>
  
</div>

## Installing specific version
For installing a specific version of space-cli just append the version tag at the end of the url

for instance the linux command will change to
{{< highlight bash >}}
wget https://storage.googleapis.com/space-cloud/linux/space-cli-0.19.5.zip
{{< /highlight >}}

## Login to Space Cloud
Before executing any operation using space-cli, you need to be authenticated with Space Cloud.

We will use the login command provided by space-cli to get authenticated with Space Cloud

{{< highlight bash >}}
space-cli login
{{< /highlight >}}

It will ask for username & password, by default the username is **admin** & password is **1234**

if you are not sure about the login credentials, then checkout the [config](https://docs.space-cloud.io/install/kubernetes/configure/#default-configuration) file provided while setting up Space Cloud.

If you are running space cloud on a VM, provide the address using --url flag
{{< highlight bash >}}
space-cli login --url "https://example.com:8080"
{{< /highlight >}}

## Setup Space Cloud
For setup follow this [docs](/install/kubernetes/minikube)

## Removing Space Cloud
For removing Space Cloud from kubernetes cluster, use the below command
{{< highlight bash >}}
space-cli destroy
{{< /highlight >}}

## Backup Space Cloud config
Space cloud config is broken down into resources, each resource configures a specific action in space cloud

To view the exhaustive list of resources that space cloud has, run the below command
{{< highlight bash >}}
space-cli get --help
{{< /highlight >}}


To backup entire configuration with all resources, run the below command
{{< highlight bash >}}
space-cli get all "directory-name"
{{< /highlight >}}
where **directory-name** is the name of the folder where all config resources will be stored

## Restore Space Cloud config
This operation requires that you have backed up the necessary configuration files using **space-cli get** command

{{< highlight bash >}}
space-cli apply "file-or-folder-name"
{{< /highlight >}}
where **file-or-folder-name** can be the name of the file in which configuration exists or a folder name inside which all the config file exists. In case of a folder all config files will be applied at once


