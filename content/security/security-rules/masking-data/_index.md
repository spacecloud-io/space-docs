---
title: "Masking/Transforming Data"
description: "Masking/Transforming Data"
date: 2020-06-18T12:08:02+05:30
draft: false
weight: 5
---

Masking is the process of replacing/hiding parts of your data from the user or the system. 

For instance, many compliances require you to encrypt all the private details of a user like `email` or `name` to be encrypted. In some use cases, you might want certain sensitive parts of your data to be viewed only by a user authorized to view that.

Data masking rules in Space Cloud allows you to do all of these easily without writing any code.

The various types of security rules available for data masking in Space Cloud are:

- **encrypt:** Used to encrypt certain fields in the request or response.
- **decrypt:** Used to decrypt certain fields in the request or response.
- **hash:** Used to hash certain fields in the request or response.
- **force:** Used to force the value of a certain field in the request.
- **remove:** Used to remove certain fields from the request or response.

These data masking rules can be combined with other rules as well in Space Cloud. Check out the docs for [combining multiple rules](/security/security-rules/available-variables).