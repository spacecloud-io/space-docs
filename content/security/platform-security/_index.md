---
title: "Platform Security"
description: "Platform Security"
date: 2020-11-18T13:58:28+05:30
draft: false
weight: 4
---

Space Cloud uses Kubernetes and Istio under the hood to provide a robust and secure platform to build your applications.

## Encrypting ingress traffic

Space Cloud uses letsencrypt to issue SSL certificates for encrypting your incoming traffic. You can even use your custom SSL certificates. Check out the docs for [using SSL certificates](/security/platform-security/using-ssl-certificates).

## Whitelists and upstreams

Space Cloud allows you to control which services can talk to each other. Check out the docs for [whitelisting services](/microservices/deployments/services-in-depth/whitelisting-services) to learn more about it in detail.

## Automatic mTLS

Space Cloud uses Istio under the hood to automatically encrypt (mTLS) the traffic between all the services by default. You don't need to configure anything in order to get this benefit.

## Securing secrets

Space Cloud Secrets provides a simpler interface over [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) to store and manage sensitive information, such as passwords, tokens, etc.

You can use Space Cloud Secrets to secure:

- Database credentials
- Filestore provider credentials
- Secrets required in your services

Check out the [docs for securing secrets](/security/platform-security/securing-secrets). 