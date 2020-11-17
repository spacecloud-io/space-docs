---
title: "Removing Fields"
description: "Removing Fields"
date: 2020-06-18T12:08:42+05:30
draft: false
weight: 5
---

Sometimes we would like to restrict access to certain **private** fields in our data. Space Cloud allows you to do this easily by removing the values of certain fields in a request/response using the `remove` rule.

## How it works

The syntax for `remove` rule is:

{{< highlight javascript >}}
{
  "rule": "force",
  "fields": "<array-of-fields>"
}
{{< /highlight >}}

> **The remove rule will always get resolved no matter what.**

The remove rule removes the `fields` specified in the rule. These fields can be present either in the request or response. 

### Example

Let's say we want to remove the `email` and `password` fields from the response while reading the profiles table. Here's how we can use the `remove` rule on the read operation of the `profiles` table to enforce this:

{{< highlight javascript >}}
{
  "rule": "remove",
  "fields": ["res.email", "res.password"]
}
{{< /highlight >}}

## Removing fields conditionally

In certain cases, you might want to remove the value of a field based on a certain condition. You can do so easily by adding the `clause` field in the `remove` rule. 

For example, let's say we want the `address` field of a user to be read by a user, only if the address is his own or he is a delivery person. Here's how you can use an `or` rule in the `clause` field of the `remove` rule to do so:

{{< highlight javascript >}}
{
  "rule": "remove",
  "fields": ["res.address"],
  "clause": {
    "rule": "or",
    "clauses": [
      {
        "rule": "match",
        "eval": "==",
        "type": "string",
        "f1": "args.find.user_id",
        "f2": "args.auth.id"
      },
      {
        "rule": "match",
        "eval": "==",
        "type": "string",
        "f1": "args.auth.role",
        "f2": "delivery_person"
      }      
    ]
  }
}
{{< /highlight >}}

Any security rule of Space Cloud can go inside the `clause` field including `and/or` for nested conditions. The remove operation will only take place if the `clause` evaluates to true. However, the `remove` rule itself will always evaluate to true irrespective of the output of the `clause`.

## Combining remove with other rules

Remove rule can be easily combined with any other data masking operations or authorization logic by using the `and` rule. Check out the [documentation of and rule](/security/security-rules/combining-multiple-rules).

**Example:** Remove the `password` field from the response and encrypt the `email` field if the user performing the operation is not an `admin`. Here's how you can write this access control logic using `and` rule:

{{< highlight javascript >}}
{
  "rule": "and",
  "clauses": [
    {
    "rule": "match",
    "eval": "!=",
    "type": "string",
    "f1": "args.auth.role",
    "f2": "admin" 
    },
    {
      "rule": "remove",
      "fields": ["res.password"]
    },    
    {
      "rule": "encrypt",
      "fields": ["res.email"]
    }
  ]
}
{{< /highlight >}}

Due to the nature of the `and` rule, the `remove` and `hash` rules in the above example will only get processed if the `match` rule passes since they are after the `match` rule.
