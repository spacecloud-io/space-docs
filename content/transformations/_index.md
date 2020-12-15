---
title: "Transformations"
description: "Transformations"
date: 2020-11-27T09:16:57+05:30
draft: false
weight: 6
---

## What are transformations?

Many times, we might want to override/transform the request/response between Space Cloud and other entities. Transformations in Space Cloud help you do that easily without writing any extra code, all through the config.

Transformations is an extremely powerful tool. If used wisely with other components (like templated queries), it can help eliminate code in a lot of use cases.

## Where can we use transformations?

|                     | JWT Claims | Request Headers | Response Headers | Request Body | Response Body |
|---------------------|------------|-----------------|------------------|--------------|---------------|
| **Event Triggers**  | ✔️          |                 |                  | ✔️            |               |
| **Remote Services** | ✔️          | ✔️               |                  | ✔️            | ✔️             |
| **Ingress Routes**  |            | ✔️               | ✔️                | ✔️            | ✔️             |