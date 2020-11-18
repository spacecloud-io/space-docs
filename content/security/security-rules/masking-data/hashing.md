---
title: "Hashing"
description: "Hashing"
date: 2020-06-18T12:08:12+05:30
draft: false
weight: 3
---

Hashing is the process of converting a given key to another value according to a mathematical algorithm. Space Cloud allows you to hash fields in your request/response easily with the `hash` rule.

> **Hashing is an irreversible operation.**

The values of hashed fields cannot be retrieved back. However, hashing generates consistent result every time for the same key. Hashing is often used to store fields like password, that later needs to be compared. If you instead want to show the original value later, use the `encrypt` rule. However, remember that encryption always generates a different value even for the same input.

## How it works

The syntax for `hash` rule is:

{{< highlight javascript >}}
{
  "rule": "hash",
  "fields": "<array-of-fields>",
}
{{< /highlight >}}

> **The hash rule will always get resolved no matter what.**

The `hash` rule replaces the `fields` specified in the rule with their hashed value. These fields can be present either in the request or response.

### Hashing algorithm

Space Cloud uses the SHA-256 algorithm for hashing fields. It first creates an SHA-256 hash of the specified fields, and then base64 encode them.

### Example

Let's say we want to hash the `password` field of user before inserting it into the `users` table. This is how we can use the `hash` rule to do that:
  
{{< highlight javascript >}}
{
  "rule": "encrypt",
  "fields": ["args.doc.password"]
}
{{< /highlight >}}

`args.doc` is nothing but a variable containing the document/record that the user is trying to insert. 

You can even hash the fields sent back to the user in response by using the `args.res` variable. You can check out the [list of available variables](/security/security-rules/available-variables) in security rules for each operation.

Let's say the document to be inserted (`args.doc`) was:
{{< highlight javascript >}}
{
  "id": "1",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "123",
  "role": "user"
}
{{< /highlight >}}

After passing through the `hash` rule, the `args.doc` would look like this:
{{< highlight javascript >}}
{
  "id": "1",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "pmWkWSBCL51Bfkhn79xPuKBKHz//H6B+mY6G9/eieuM=",  
  "role": "user"
}
{{< /highlight >}}

The crud module of Space Cloud will then insert this hashed data.

## Hashing fields conditionally

In certain cases, you might want to hash the value of fields based on a certain condition. You can do so easily by adding the `clause` field in the `hash` rule. 

For example, let's say we want to hash the `password` field only if a person's role is `user`. Here's how you can use a `match` rule in the `clause` field of the `hash` rule to do so:

{{< highlight javascript >}}
{
  "rule": "decrypt",
  "fields": ["args.doc.password"]
  "clause": {
    "rule": "match",
    "eval": "==",
    "type": "string",
    "f1": "args.auth.role",
    "f2": "user"
  }
}
{{< /highlight >}}

Any security rule of Space Cloud can go inside the `clause` field including `and/or` for nested conditions. The hashing operation will only take place if the `clause` evaluates to true. However, the `hash` rule itself will always evaluate to true irrespective of the output of the `clause`.

## Combining hash with other rules

Hash rule can be easily combined with any other data masking operations or authorization logic by using the `and` rule. Check out the [documentation of and rule](/security/security-rules/combining-multiple-rules).

**Example:** Allow a record to be inserted in users table only if the length of the username is greater than 10. The password field in the record should be hashed, while the email field should be encrypted. (`encrypt` rule). Here's how you can write this access control logic using `and` rule:

{{< highlight javascript >}}
{
  "rule": "and",
  "clauses": [
    {
    "rule": "match",
    "eval": ">",
    "type": "number",
    "f1": "length(args.doc.username)",
    "f2": "admin" 
    },
    {
      "rule": "hash",
      "fields": ["args.doc.password"]
    }    
    {
      "rule": "encrypt",
      "fields": ["args.doc.email"]
    },
  ]
}
{{< /highlight >}}

With the above security rule, a record will only get inserted whenever the `match` clause gets resolved since the `hash` and `encrypt` rules always gets resolved. However, due to the nature of `and` rule, the `hash` and `encrypt` rules will only get processed when the `match` rule passes since they are after the `match` rule.