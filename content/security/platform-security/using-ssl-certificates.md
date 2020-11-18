---
title: "Using SSL Certificates"
description: "Using SSL Certificates"
date: 2020-11-18T14:06:22+05:30
draft: false
weight: 1
---

There are 2 ways of using SSL certificates in Space Cloud to encrypt incoming traffic:

- Using the inbuilt letsencrypt module
- Using custom SSL certificates

## Using Letsencrypt

We need to configure 2 things to use the letsencrypt module:

- **Letsencrypt Email:** Optional. Your email address to be provided to Letsencrypt.
- **Whitelisted Domains:** The domains for which you want to issue certificates.  

### Configuring letsencrypt email

Head over to the `Cluster settings` tab in the `Settings` section. Enter your email address in the `LetsEncrypt Email` section and hit `Save`:

![Letsencrypt email](/images/screenshots/letsencrypt-email.png)

### Configuring domains

Head over to the `Project settings` tab in the `Settings` section. Scroll down to the `Whitelisted Domains` section:

![Letsencrypt domains](/images/screenshots/letsencrypt-domains.png)

Enter the domains for which you want to issue letsencrypt certificates.

> **Note:** The domains are configured on a project level.

## Using custom SSL certificates

Docs coming soon!