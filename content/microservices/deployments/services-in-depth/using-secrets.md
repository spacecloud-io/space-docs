---
title: "Using secrets"
date: 2020-02-14T10:45:00+05:30
draft: false
weight: 5
---

Our services often need to use secrets. Things like database credentials and 3rd party API keys cannot be put inside a docker image right?

Space Cloud provides the ability to describe such `secrets` and inject them in containers in runtime. 

## Advantage of using Secrets

- All secrets are encrypted at rest hence are stored securely.
- Changing secrets redeploys all services using it automatically.
- Makes the container images for flexible to use in different environments.
- You can create the secret once and use it in multiple services.

## How to works?

There are two types of secrets.
- **Environment variables:** This creates the provided environment variables in the services using it.
- **File Secrets:** This creates the provided files at a specific location in the services using it.

Here's how you create the two secrets:

![Create env secret](/images/screenshots/create-env-secret.png)

![Create file secret](/images/screenshots/create-file-secret.png)

To apply these secrets to a service, simply mention them in the service configuration.

![Using secrets](/images/screenshots/using-secrets.png)
