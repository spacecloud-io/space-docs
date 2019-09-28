---
title: "Manual"
date: 2019-09-26T18:04:00+05:30
draft: true
weight: 2
---

This guide will help you set up Space Cloud manually using the `space-cloud` binary.

## Step 1: Download Space Cloud

The first step is to download the `space-cloud` binary. You need to download binary for your operating system or you could build it directly from its source code. You will need go version 1.12.0 or later to build it from source.

Download the binary for your OS from here:

- [Mac](https://spaceuptech.com/downloads/darwin/space-cloud.zip)
- [Linux](https://spaceuptech.com/downloads/linux/space-cloud.zip)
- [Windows](https://spaceuptech.com/downloads/windows/space-cloud.zip)

You can unzip the compressed archive

**For Linux / Mac:** `unzip space-cloud.zip && chmod +x space-cloud`

**For Windows:** Right click on the archive and select `extract here`.

To make sure if `space-cloud` binary is correct, type the following command from the directory where `space-cloud` is downloaded:

**For Linux / Mac:** `./space-cloud -v`

**For Windows:** `space-cloud.exe -v`

It should show something like this:

{{< highlight bash>}}
space-cloud-ee version 0.12.0
{{< /highlight >}}

## Step 2: Start Space Cloud

The following command runs `space-cloud` binary along with setting the `admin` credentials for Mission Control:  

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#run-sc-on-linux">Linux/Mac</a></li>
      <li class="tab col s2"><a href="#run-sc-on-windows">Windows</a></li>
    </ul>
  </div>
  <div id="run-sc-on-linux" class="col s12" style="padding:0">
{{< highlight bash>}}
./space-cloud run \
  --admin-user=some-admin \
  --admin-pass=some-pass \
  --admin-secret=some-secret 
{{< /highlight >}}
  </div>
  <div id="run-sc-on-windows" class="col s12" style="padding:0">
{{< highlight bash>}}
space-cloud.exe run \
  --admin-user=some-admin \
  --admin-pass=some-pass \
  --admin-secret=some-secret  
{{< /highlight >}}
  </div>
</div>

Here, `--admin-user` and `--admin-pass` are the credentials to login into Mission Control (Admin UI), whereas `--admin-secret` is the JWT secret used to authenticate login requests for Mission Control. 

> **Note:** The HTTP and grpc endpoints are available in a secure fashion over SSL on ports `4126` and `4128` respectively.

To expose the HTTP and grpc endpoints of Space Cloud in a secure way via SSL run the following command:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#run-sc-via-ssl-on-linux">Linux/Mac</a></li>
      <li class="tab col s2"><a href="#run-sc-via-ssl-on-windows">Windows</a></li>
    </ul>
  </div>
  <div id="run-sc-via-ssl-on-linux" class="col s12" style="padding:0">
{{< highlight bash>}}
./space-cloud run \
  --admin-user=some-admin \
  --admin-pass=some-pass \
  --admin-secret=some-secret \
  --ssl-cert=/path/to/ssl-cert-file \
  --ssl-key=/path/to/ssl-key-file
{{< /highlight >}}  
  </div>
  <div id="run-sc-via-ssl-on-windows" class="col s12" style="padding:0">
{{< highlight bash>}}
space-cloud.exe run \
  --admin-user=some-admin \
  --admin-pass=some-pass \
  --admin-secret=some-secret \
  --ssl-cert=/path/to/ssl-cert-file \
  --ssl-key=/path/to/ssl-key-file
{{< /highlight >}}  
  </div>
</div>

You should be seeing something like this when `space-cloud` starts:

{{< highlight bash>}}
Starting Nats Server
Starting grpc server on port: 4124
2019/08/03 08:00:38 Syncman node query response error: failed to respond to key query: response is past the deadline
Starting http server on port: 4122

	 Hosting mission control on http://localhost:4122/mission-control/

Space cloud is running on the specified ports :D
{{< /highlight >}}  

## Step 3: Configure Space Cloud

As you would have noticed, on running `space-cloud`, a `config.yaml` file and a `raft-store` folder would have been generated in the directory from where you had run `space-cloud`.

Space Cloud needs this config file in order to function. The config file is used to load information like the database to be used, its connection string, security rules, etc. 

Space Cloud has it's own Mission Control (admin UI) to configure all of this in an easy way. 

> **Note:** All changes to the config of `space-cloud` has to be done through the Mission Control only. Changes made manually to the config file will get overwritten. 


**Open Mission Control**

Head over to `http://localhost:4122/mission-control` or `https://localhost:4126/mission-control` to open Mission Control depending on how you started `space-cloud`.

> **Note:** Replace `localhost` with the address of your Space Cloud if you are not running it locally. 


## Next Steps

Awesome! We just started Space Cloud manually. Next step would be to [set up a project](/getting-started/setting-up-project/) to use Space Cloud in your preffered language.

Feel free to check out various capabalities of `space-cloud`:

- Perform database [queries](/essentials/queries)
- [Mutate](/essentials/mutations) data
- [Realtime](/essentials/subscriptions) data sync across all devices
- Manage files with ease using [File Storage](/essentials/file-storage) module
- [Authenticate](/auth/authentication) your users
- Write [custom business logic](/essentials/custom-logic)
- [Secure](/auth/authorization) your apps
