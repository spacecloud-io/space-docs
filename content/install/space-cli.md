---
title: "Space CLI"
description: "Installing Space CLI for interacting with Space Cloud resources"
date: 2020-02-14T18:03:53+05:30
draft: false
weight: 2
---

## Context
Space CLI is heavily inspired from `kubectl`. If you have ever worked with kubectl before you won't have much difficulty in understanding `space-cli` commands.

## Installation
Run the below commands to download the latest `space-cli` binary for yous OS.

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
For installing a specific version of `space-cli` just append the version tag at the end of the url.

For `v0.19.8` the linux command will change to:
{{< highlight bash >}}
wget https://storage.googleapis.com/space-cloud/linux/space-cli-v0.19.8.zip
{{< /highlight >}}

## Login to Space Cloud
Before executing any operation using space-cli, you need to be authenticated with Space Cloud.

We will use the login command provided by `space-cli` to do the same.

{{< highlight bash >}}
space-cli login
{{< /highlight >}}

It will ask for username & password. By default, the username is **admin** & password is **1234**.

If you are not sure about the login credentials, then checkout the [config](https://docs.space-cloud.io/install/kubernetes/configure/#default-configuration) file provided while setting up Space Cloud.

If you are running space cloud on a remote VM, provide the address using `--url` flag.
{{< highlight bash >}}
space-cli login --url "https://example.com:8080"
{{< /highlight >}}

## Setup Space Cloud
To install Space Cloud on a Kubernetes cluster, follow this [docs](/install/kubernetes/minikube).

## Removing Space Cloud
For removing Space Cloud from a Kubernetes cluster, use the below command:
{{< highlight bash >}}
space-cli destroy
{{< /highlight >}}

## Backup Space Cloud config
Space cloud config is broken down into resources, each resource configures a specific module in Space Cloud.

To view the exhaustive list of resources that space cloud has, run the below command:
{{< highlight bash >}}
space-cli get --help
{{< /highlight >}}


To backup entire configuration with all resources, run the below command:
{{< highlight bash >}}
space-cli --project <project-name> get all "directory-name"
{{< /highlight >}}
where **directory-name** is the name of the folder where all config resources will be stored

## Restore Space Cloud config
This operation applies the backed up configuration files in the above step.

{{< highlight bash >}}
space-cli apply "file-or-folder-name"
{{< /highlight >}}
where **file-or-folder-name** can be the name of the file in which configuration exists or a folder name inside which all the config files exists. In case of a folder all config files will be applied one after the other.
