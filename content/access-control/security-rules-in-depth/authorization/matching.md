---
title: "Matching fields"
description: "Matching fields"
date: 2020-06-18T12:07:00+05:30
draft: false
weight: 1
---

Many a times we want to allow access to a particular resource based on certain conditions. In such scenarios, we use a `match` rule to match/compare two values.

For example, to allow an operation only if the role is `admin`, we can write the following `match` rule:

{{< highlight javascript >}}
{
  "rule": "match",
  "eval": "==",
  "type": "string",
  "f1": "args.auth.role",
  "f2": "admin" 
}
{{< /highlight >}}

## How it works

The basic syntax for the `match` rule is as follows:

{{< highlight javascript >}}
{
  "rule": "match",
  "eval": "<operator>",
  "type": "<field-type>",
  "f1": "<field1>",
  "f2": "<field2>" 
}
{{< /highlight >}}

The `match` rule performs a comparison between the two fields `f1` and `f2` as per the operator specified in the `eval` field. If the comparison evaluates to true, the `match` rule is resolved and the access is granted. Otherwise the access is denied.

## Comparison operations

The field `eval` inside the `match` rule specifies the comparison operator. Following comparison operators are available in `match` rule:

| eval    | Description                                                                                                                  |
|---------|------------------------------------------------------------------------------------------------------------------------------|
| `==`    | The match rule is resolved only if the value of `f1` is equal to `f2`                                                        |
| `!=`    | The match rule is resolved only if the value of `f1` is not equal to `f2`                                                    |
| `>`     | The match rule is resolved only if the value of `f1` is greater than `f2`                                                    |
| `<`     | The match rule is resolved only if the value of `f1` is lesser than `f2`                                                     |
| `>=`    | The match rule is resolved only if the value of `f1` is greater than or equal to `f2`                                        |
| `<=`    | The match rule is resolved only if the value of `f1` is lesser than or equal to `f2`                                         |
| `in`    | The match rule is resolved only if the value of `f1` is equal to one of the values in `f2`. (`f2` is an array of values)     |
| `notIn` | The match rule is resolved only if the value of `f1` is not equal to any of the values in `f2`. (`f2` is an array of values) |

## Data type

The `type` field in match rule specifies the data type of the fields `f1` and `f2`. 

> **The values of `f1` and `f2` should be of the `type` specified in the rule. Otherwise the rule will not get resolved. Only in the case of `in` and `notIn` operator, the type of `f2` field should be array of the specified `type` rather than the `type` directly.**  

The value of `type` can be one of the following:

- **string:** For comparing string/text values. 
- **number:** For comparing integer/float values.
- **boolean:** For comparing boolean values.

## Fields

`f1` and `f2` are the fields under comparison. The value of these two fields can either be **static** or **variable**.

### Using static values 

Static values are nothing but harcoded or literal values. For example, "admin"`, true, 4.5, ["science", "arts"], etc.

### Using variables

Things that are unique to each request are avialble in the form of variables to the security rules. 

For instance, the `args.auth` variable contains the JWT claims of the request. So if your JWT token has a claim called `id`, you can refer to it as `args.auth.id`. 

Check out the [list of available variables]() to know what variables are available for each operation in Space Cloud.

You can refer to any nested property in the variables using the dot notation. 

Let's say if you have a token with the following claims:

{{< highlight javascript >}}
{
  "id": "1",
  "organization": {
    "id": "org1",
    "name": "Organization 1"
  }
}
{{< /highlight >}}

Then you can refer to the organization name in your `f1`/`f2` of the `match` rule as `args.auth.organization.name`.

The value of the variable is decided at the run time by the Space Cloud.

### Using helper functions in fields

The security module of Space Cloud provides you helper functions to use in fields. These helper functions let you perform various operations on your variables including but not limited to:

- Accessing current time.
- Computing the length of an array of string.
- Checking if a key exists in a variable.

**Example:** Check if a submission is made before a deadline:

{{< highlight javascript >}}
{
  "rule": "match",
  "type": "string",
  "eval": "<",
  "f1": "utils.roundUpDate(utils.now(), 'date')",
  "f2": "2020-10-25"
}
{{< /highlight >}}

In the above example, first the current time is calculated by a helper function `now`. The time value is then rounded up to the nearest date by using another helper function `roundUpDate`. The rounded up date value is then compared to the deadline - `2020-10-25`.

Check out the [list of all helper functions]() available in the security rules. 