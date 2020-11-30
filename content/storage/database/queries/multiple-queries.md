---
title: "Multiple Queries"
description: "Multiple Queries"
date: 2019-09-17T17:36:20+05:30
draft: false
weight: 9
---


With Space Cloud, you can make multiple queries even to **different databases** in a single request. If multiple queries are part of the same request, they get executed in parallel, and the individual responses are collated and returned. 

> **Note:** This is only a GraphQL feature and not available in any client SDKs.

**Example:** Fetch list of trainers (from PostgreSQL) and pokemons (from MongoDB):

{{< highlight graphql "hl_lines=2 6">}}
query {
  trainers @postgres {
    id
    name
  }
  pokemons @mongo {
    name
    type
  }
}
{{< /highlight >}}