---
title: "Service Roles"
description: "Service Roles"
date: 2020-11-30T05:39:02+05:30
draft: false
weight: 8
---

Service roles are used to grant access to Kubernetes resources (e.g. pods, configmaps, etc.) to your services.

## Configuring service roles

Head over to the `Roles` tab in the `Deployments` section in Mission Control:

![Service Roles](/images/screenshots/service-roles.png)

Click on the `Add` button to open the following page:

![Add Service Role](/images/screenshots/add-service-role.png)

Enter the following details:

**Role name**

Role name is a unique name to identify why you are creating a particular service role.

**Role type**

Role type can have one of the two values:

- `Project`: If you want to limit the access for granted resources within a particular namespace of Kubernetes.
- `Cluster`: If you want to provide cluster-wide access to the granted resources.

**Project ID**

The project ID is applicable if you selected Role type as `Project`. The project ID should be the Kubernetes namespace to which you want to restrict the access.

**Service ID**

Service ID is the service to which you want to grant access.

**Rules**

Rules describe access to particular Kubernetes resources.

Click on the `Add rule` Button to open the following modal:

![Add Service Role Rule](/images/screenshots/add-service-role-rule.png)

Enter the match expression rule of Kubernetes for service roles in JSON.

For example, a rule to grant read access for pods would look like this:

{{< highlight json >}}
{ 
  "apiGroups": [""],
  "resources": ["pods"],
  "verbs": ["get", "watch", "list"]
}
{{< /highlight >}}
