---
title: "Decrypting"
description: "Decrypting"
date: 2020-06-18T12:08:16+05:30
draft: false
weight: 2
---

Often you would use the [encrypt](/security/security-rules/masking-data/encrypting) rule to encrypt certain private fields in your data. To read the original values of such fields, you need to use the `decrypt` rule.

## How it works

The syntax for `decrypt` rule is:

{{< highlight javascript >}}
{
  "rule": "decrypt",
  "fields": "<array-of-fields>",
}
{{< /highlight >}}

> **The encrypt rule will always get resolved unless there's some problem with the configured AES key.**

The `encrypt` rule replaces the `fields` specified in the rule with their encrypted value. These fields can be present either in the request or response. However, mostly this rule is used to decrypt the response fields sent back to the client in a read request.

### Decryption algorithm

Space Cloud can only decrypt the fields that are encrypted by AES encryption (CFB mode). This is the algorithm which Space Cloud uses for encryption in the [encrypt](/security/security-rules/masking-data/encrypting) rule. 


The AES key used for decryption is configurable. Whenever you create a project through the Mission Control, it configures a random AES key for that project. This AES key can be changed later from the project settings in Mission Control. The AES key used for encryption should be a 32-byte string that is base64 encoded.


### Example

Let's say the `email` and `name` are stored in an encrypted format in the database with the help of `encrypt` rule. However, we want to show the original values in the app. Thus, we need to decrypt these fields in the `read` operation before sending its value back to the client. This is how we can use the `decrypt` rule to do that:
  
{{< highlight javascript >}}
{
  "rule": "decrypt",
  "fields": ["args.res.email", "args.res.name"]
}
{{< /highlight >}}

`args.res` is nothing but a variable containing the response sent back to the client. 

Space Cloud is smart enough to handle arrays. If the variable (`args.res` in this case) is an array of objects, then Space Cloud would decrypt the fields (email and name in this case) inside each object of that variable. 

You can check out the [list of available variables](/security/security-rules/available-variables) in security rules for each operation.

Let's say the documents to be read (`args.res`) were:
{{< highlight javascript >}}
[
  {
    "id": "1",
    "name": "oJsFxb2wVCA=", // original value was "John Doe"
    "email": "gJsFxbOQVCC2cOWoMQZFAMd7AWM", // original value was "john.doe@example.com"
    "dob": "26-04-1997",
    "role": "user"
  }
]
{{< /highlight >}}

After passing through the `decrypt` rule, the `args.res` would look become:
{{< highlight javascript >}}
[
  {
    "id": "1",
    "name": "John Doe", // Assuming the original name was "John Doe"
    "email": "john.doe@example.com", // Assuming the orignal email was "john.doe@example.com"
    "dob": "26-04-1997",
    "role": "user"
  }
]
{{< /highlight >}}

## Decrypting fields conditionally

In certain cases, you might want to decrypt the value of fields based on a certain condition. You can do so easily by adding the `clause` field in the `decrypt` rule. 

For example, let's say we want to decrypt the `email` field only if a person's role is `admin`. Here's how you can use a `match` rule in the `clause` field of the `decrypt` rule to do so:

{{< highlight javascript >}}
{
  "rule": "decrypt",
  "fields": ["res.email"]
  "clause": {
    "rule": "match",
    "eval": "==",
    "type": "string",
    "f1": "args.auth.role",
    "f2": "admin"
  }
}
{{< /highlight >}}

Any security rule of Space Cloud can go inside the `clause` field including `and/or` for nested conditions. The decryption operation will only take place if the `clause` evaluates to true. However, the `decrypt` rule itself will always evaluate to true irrespective of the output of the `clause`.

## Decrypting fields dynamically

In certain cases, the fields you want to decrypt might be dynamic. In such cases, you can specify a variable pointing to an array of fields instead of directly specifying the array. 

For example, let's say the fields we want to decrypt in a remote service call are specified as a `fieldsToBeDecrypted` argument. Here's how you can write the decrypt rule for it:

{{< highlight javascript >}}
{
  "rule": "decrypt",
  "fields": "args.params.fieldsToBeDecrypted"
}
{{< /highlight >}}

## Combining decrypt with other rules

Decrypt rule can be easily combined with any other data masking operations or authorization logic by using the `and` rule. Check out the [documentation of and rule](/security/security-rules/combining-multiple-rules).

**Example:** Decrypt the name and email fields in the response only if the user is reading his profile. Here's how you can write a security rule on the `profiles` table to do so:

{{< highlight javascript >}}
{
  "rule": "and",
  "clauses": [
    {
    "rule": "match",
    "eval": "==",
    "type": "string",
    "f1": "args.find.id", // assuming the profiles table contains a field id
    "f2": "args.auth.id" // assuming the token contains a field id equal to the user id
    },
    {
      "rule": "decrypt",
      "fields": ["args.doc.name", "args.doc.email"]
    }  
  ]
}
{{< /highlight >}}

With the above security rule, a profile will only be allowed to read if the user is trying to read his profile. However, due to the nature of `and` rule, the `decrypt` rule will only get processed when the `match` rule passes since it is after the `match` rule.