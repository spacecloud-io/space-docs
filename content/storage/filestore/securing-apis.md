---
title: "Securing your APIs"
description: "Securing your APIs"
date: 2019-09-23T10:07:57+05:30
draft: false
weight: 6
---

The security rules for file storage access works to authorize client requests for file store operations. Authorization works on the operation level (read, create and delete) for each path prefix. This means that you can have different rules for different path prefixes. 

Here's a sample snippet which shows the rules on the `/images/:userId` prefix. Operations `create`  and `read` are allowed while `delete` is blocked.

{{< highlight json >}}
{
  "prefix": "/images/:userId",
  "rule": {
    "create": {
      "rule": "allow"
    },
    "read": {
      "rule": "allow"
    },
   "delete": {
      "rule": "deny"
    }
  }
}
{{< /highlight >}}

Space Cloud's security rules are flexible enough to enforce any access control logic including querying your databases, validating conditions and masking private data. Checkout the documentation of [security rules]() to learn more.

## Points to note

The following needs to be kept in mind for the security rules in the file storage module:

- All rules are applied on a prefix. A prefix is nothing but the path prefix where the file / folder is present or is to be created.
- The prefix may contain path parameters (e.g. `/:userId` in the above example). The value of the path parameter is available in the `args.params` object. For the above example, `userId` field would be available in the `args.params` object with the value being the actual value provided in the path for that `userId` path parameter.

## Configuring security rules

Head over to the `File Storage` section of the Mission Control. Click on the `Add` button to add a security rule:

Enter the path prefix for which you want to enter a rule. As discussed above, the prefix can contain path parameters. The default security rules would be prefilled for you. You can change it now or even later with the Rule Builder or the JSON editor.

Give the rule a name. This name is for you to identify the rule later.

To modify a rule, just click the `Edit` button from the `Actions` table. This will open a Rule Builder UI to configure the rules easily:

If you are more comfortable wih JSON, you can switch to the JSON editor as well by clicking on the `JSON` tab. 

## Available variables

Following are the variables available in the security rules for different operations in the filestore module:

### File store create

| Variable      | Data type | Description                                                                                            |
|---------------|-----------|--------------------------------------------------------------------------------------------------------|
| `args.auth`   | Object    | Object containing the jwt claims present in the token.                                                 |
| `args.params` | Object    | Object containing the path params of the file/folder to be created.                                    |
| `args.token`  | String    | Raw token present under the `Authorization` header in the request. (with the `Bearer ` prefix removed) |

### File store read

| Variable      | Data type | Description                                                                                            |
|---------------|-----------|--------------------------------------------------------------------------------------------------------|
| `args.auth`   | Object    | Object containing the jwt claims present in the token.                                                 |
| `args.params` | Object    | Object containing the path params of the file/folder to be read.                                       |
| `args.token`  | String    | Raw token present under the `Authorization` header in the request. (with the `Bearer ` prefix removed) |

### File store delete

| Variable      | Data type | Description                                                                                            |
|---------------|-----------|--------------------------------------------------------------------------------------------------------|
| `args.auth`   | Object    | Object containing the jwt claims present in the token.                                                 |
| `args.params` | Object    | Object containing the path params of the file/folder to be deleted.                                    |
| `args.token`  | String    | Raw token present under the `Authorization` header in the request. (with the `Bearer ` prefix removed) |