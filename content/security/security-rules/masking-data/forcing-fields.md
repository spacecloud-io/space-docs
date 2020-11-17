---
title: "Forcing Fields"
description: "Forcing Fields"
date: 2020-06-18T12:08:35+05:30
draft: false
weight: 4
---

Sometimes we would like to force a field rather than check its value. Space Cloud allows you to easily force the value of a field in request/response using the `force` rule.

## How it works

The syntax for `force` rule is:

{{< highlight javascript >}}
{
  "rule": "force",
  "field": "<field>",
  "value": "<value>"
}
{{< /highlight >}}

> **The force rule will always get resolved no matter what.**

The force rule replaces the contents of the `field` specified in the rule with the specifief `value`. These fields can be present either in the request or response. The `value` can be a literal value or any other variable.

### Example

Let's say we want the user to always create an article with his user id only. Here's how we can use the `force` rule on the create operation of the `articles` table to enforce this:

{{< highlight javascript >}}
{
  "rule": "force",
  "field": "args.doc.user_id", // assuming articles table consist of user_id field indicating the user of the article
  "value": "args.auth.id" // assuming token contains a claim named id equal to id of the user
}
{{< /highlight >}}

> **Note:** The `force` rule creates the `field` with the specified `value` if it does not exist already.

## Forcing fields conditionally

In certain cases, you might want to force the value of a field based on a certain condition. You can do so easily by adding the `clause` field in the `force` rule. 

For example, let's say we want to force the `user_id` field only if a person's role is `user`. Here's how you can use a `match` rule in the `clause` field of the `force` rule to do so:

{{< highlight javascript >}}
{
  "rule": "force",
  "field": "args.doc.user_id", // assuming articles table consist of user_id field indicating the user of the article
  "value": "args.auth.id", // assuming token contains a claim named id equal to id of the user
  "clause": {
    "rule": "match",
    "eval": "==",
    "type": "string",
    "f1": "args.auth.role",
    "f2": "user"
  }
}
{{< /highlight >}}

Any security rule of Space Cloud can go inside the `clause` field including `and/or` for nested conditions. The force operation will only take place if the `clause` evaluates to true. However, the `force` rule itself will always evaluate to true irrespective of the output of the `clause`.

## Combining force with other rules

Force rule can be easily combined with any other data masking operations or authorization logic by using the `and` rule. Check out the [documentation of and rule](/security/security-rules/combining-multiple-rules).

**Example:** Allow a record to be inserted in users table only if the length of username is greater than 10. The `role` field in the record should be forced with the value `user` and the `password` field should be hashed. Here's how you can write this access control logic using `and` rule:

{{< highlight javascript >}}
{
  "rule": "and",
  "clauses": [
    {
    "rule": "match",
    "eval": ">",
    "type": "number",
    "f1": "length(args.doc.username)",
    "f2": 10 
    },
    {
      "rule": "force",
      "field": "args.doc.role",
      "value": "user"
    },    
    {
      "rule": "hash",
      "fields": ["args.doc.password"]
    }
  ]
}
{{< /highlight >}}

With the above security rule, a record will only get inserted whenever the `match` clause gets resolved, since the `force` and `hash` rule always gets resolved. However, due to the nature of the `and` rule, the `force` and `hash` rules will only get processed if the `match` rule passes since they are after the `match` rule.