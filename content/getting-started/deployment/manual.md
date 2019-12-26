---
title: "Manual"
date: 2019-09-26T18:04:00+05:30
draft: false
weight: 2
---

This guide helps you set up Space Cloud manually using the `space-cloud` binary.

## Step 1: Download Space Cloud

The first step is to download the `space-cloud` binary. You need to download the binary for your operating system, or you could build it directly from its source code. You need to have go version 1.12.0 or later to build it from source.

Download the binary for your OS from here:

- [Mac](https://spaceuptech.com/downloads/darwin/space-cloud.zip)
- [Linux](https://spaceuptech.com/downloads/linux/space-cloud.zip)
- [Windows](https://spaceuptech.com/downloads/windows/space-cloud.zip)

You can unzip the compressed archive.

**For Linux / Mac:** `unzip space-cloud.zip && chmod +x space-cloud`

**For Windows:** Right-click on the archive and select `extract here`.

To make sure if `space-cloud` binary is correct, type the following command from the directory where `space-cloud` is downloaded:

**For Linux / Mac:** `./space-cloud -v`

**For Windows:** `space-cloud.exe -v`

It should show something like this:

{{< highlight bash>}}
space-cloud-ee version 0.13.0
{{< /highlight >}}

## Step 2: Start Space Cloud

### Development mode

The following command runs `space-cloud` binary in dev mode:  

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#run-sc-on-linux">Linux/Mac</a></li>
      <li class="tab col s2"><a href="#run-sc-on-windows">Windows</a></li>
    </ul>
  </div>
  <div id="run-sc-on-linux" class="col s12" style="padding:0">
{{< highlight bash>}}
./space-cloud run --dev
{{< /highlight >}}
  </div>
  <div id="run-sc-on-windows" class="col s12" style="padding:0">
{{< highlight bash>}}
space-cloud.exe run --dev
{{< /highlight >}}
  </div>
</div>

You should see something like this when `space-cloud` starts:

{{< highlight bash>}}
Creating a new server with id auto-1T5fA9E1B2jeNUbV8R0fOPubRng
Starting http server on port: 4122

   Hosting mission control on http://localhost:4122/mission-control/

Space cloud is running on the specified ports :D
{{< /highlight >}}  


> **Note:** The only difference in dev mode is that the Mission Control (admin UI of Space Cloud) doesn't require you to log in.

### Production mode

The following command runs `space-cloud` in production mode along with an SSL certificate:

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

Here, `--admin-user` and `--admin-pass` are the credentials to login into Mission Control (Admin UI), whereas `--admin-secret` is the JWT secret used to authenticate login requests for Mission Control. 

> **Note:** Check out [this guide](/getting-started/deployment/distributed) to run Space Cloud in distributed mode. 

### Changing ports

Space Cloud only has two ports - HTTP and HTTPs. The HTTP port is available by default on `4122`, and you can change it by passing the `PORT` flag.

Example: 
{{< highlight bash>}}
./space-cloud run --port 5000
{{< /highlight >}}

Space Cloud calculates the HTTPs port by adding 4 to the HTTP port. Hence the default value of HTTPs port is `4126`.

### Providing existing config file
You can tell Space Cloud to take an existing config file that you may have rather than creating a new one by providing `--config` flag. Here's how you can do it:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#run-sc-on-linux-config">Linux/Mac</a></li>
      <li class="tab col s2"><a href="#run-sc-on-windows-config">Windows</a></li>
    </ul>
  </div>
  <div id="run-sc-on-linux-config" class="col s12" style="padding:0">
{{< highlight bash>}}
./space-cloud run --dev --config ./config.yaml
{{< /highlight >}}
  </div>
  <div id="run-sc-on-windows-config" class="col s12" style="padding:0">
{{< highlight bash>}}
space-cloud.exe run --dev --config config.yaml
{{< /highlight >}}
  </div>
</div>

## Step 3: Configure Space Cloud

As you would have noticed, `space-cloud` generates a `config.yaml` file in the working directory.

Space Cloud needs this config file to function. The config file is used to load information like the database to be used, its connection string, security rules, etc. 

Space Cloud has it's own Mission Control (admin UI) to configure all of this quickly. 

**Open Mission Control**

Head over to `http://localhost:4122/mission-control` or `https://localhost:4126/mission-control` to open Mission Control depending on the port configuration.

> **Note:** Replace `localhost` with the address of your Space Cloud if you are not running it locally. 


## Next Steps

Awesome! We just started Space Cloud manually. Next step would be to [set up a project](/getting-started/setting-up-project/) to use Space Cloud in your preferred language.

Feel free to check out various capabalities of `space-cloud`:

- Perform database [queries](/essentials/queries)
- [Mutate](/essentials/mutations) data
- [Realtime](/essentials/subscriptions) data sync across all devices
- Manage files with ease using [File Storage](/essentials/file-storage) module
- [Authenticate](/auth/authentication) your users
- Write [custom business logic](/essentials/remote-services)
- [Secure](/auth/authorization) your apps