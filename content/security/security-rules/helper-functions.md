---
title: "Helper Functions"
description: "Helper Functions"
date: 2020-06-18T12:11:16+05:30
draft: false
weight: 9
---

Often while writing security rules, you may want to transform certain variables/data. Space Cloud comes packed with quite a few helper functions that you can use to do so.

However, these helper functions are not limited to just security rules. They can be used anywhere where variables can be used.

**Example:** Length of the title of the article to be created should be greater than 10. Here's how we can use `length` function inside the `match` rule for this:

{{< highlight javascript >}}
{
  "rule": "match",
  "type": "number",
  "eval": ">",
  "f1": "utils.length(args.doc.title)",
  "f2": 10
}
{{< /highlight >}}

> **Note: All helper functions always start with `utils.`**

## Available helper functions

Following are the helper functions available in the security rules of Space Cloud:

### length

This function is used to calculate the length of a string, map and array. It takes a single string / variable as an argument and returns a number indicating the length of the string, map or array.

### exists

This function is used to check whether a provided variable exists or not. It takes a single string containing the variable to be tested for existence and returns a boolean value indicating whether that variable exists or not.

**Example:** Check whether the `author_id` is provided or not in the create operation of an `article`. Here's how we can use the `exists` function to check that:

{{< highlight javascript >}}
{
  "rule": "match",
  "type": "bool",
  "eval": "==",
  "f1": "utils.exists(args.doc.author_id)",
  "f2": true
}
{{< /highlight >}}

### now

This function does not take any argument. It simply returns the current timestamp in the RFC3339 format (e.g. `2020-09-25T00:00:00Z`)

**Example:**

{{< highlight javascript >}}
{
  "rule": "force",
  "field": "args.params.time",
  "value": "utils.now()"
}
{{< /highlight >}}

### addDuration

This function is used to add duration to a particular timestamp. It takes two parameters:

- A timestamp string (e.g. `2020-09-25T00:00:00Z`)
- A duration string denoting the duration to be added. (e.g. `300ms`, `-1.5h` or `2h45m`) Valid time units are `ns`, `us` (or `µs`), `ms`, `s`, `m`, `h`.

**Example1:** Adding duration to a static timestamp:

{{< highlight javascript >}}
{
  "rule": "force",
  "field": "args.params.time",
  "value": "utils.addDuration('2020-01-01T00:00:00Z', '4h')"
}
{{< /highlight >}}

**Example2:** Adding duration to a timestamp from a variable:

{{< highlight javascript >}}
{
  "rule": "force",
  "field": "args.params.time",
  "value": "utils.addDuration(args.params.date, '20m')"
}
{{< /highlight >}}

**Example3:** Adding duration to the current timestamp:

{{< highlight javascript >}}
{
  "rule": "force",
  "field": "args.params.time",
  "value": "utils.addDuration(utils.now(), '10s')"
}
{{< /highlight >}}

### roundUpDate

This function is used to round up the time to a particular unit (e.g. `day`).

It takes two parameters:
- A timestamp string (e.g. `2020-09-25T00:00:00Z`)
- The unit for rounding operation. Valid units are `year`, `month`, `day`, `hour`, `minute` and `second`.

**Example1:** Adding duration to a static timestamp:

{{< highlight javascript >}}
{
  "rule": "force",
  "field": "args.params.time",
  "value": "utils.roundUpDate('2020-09-25T04:16:45Z', 'month')" 
}
{{< /highlight >}}

The `roundUpDate` function in the above example will return `2020-09-01T00:00:00Z`.

### stringToObjectId

This function takes a string and converts it to an ObjectID. This is mostly useful while joining data between collections in MongoDB if one collection has `_id` in string format and the other in object format.

**Example:** Perform an on-the-fly join between the `users` and `posts` collection in MongoDB, wherein the `_id` of the `users` collection is a string, and the `_id` of the `posts` field is an ObjectID.   

{{< highlight graphql >}}
query {
  users @mongo {
    name
    posts (where: {_id: "utils.stringToObjectId(users._id)"}) @mongo {
      title
    }
  }
}
{{< /highlight >}}

### objectIdToString

This function is the exact opposite of `stringToObjectId`. It converts an ObjectID to a string.

**Example:** Perform an on-the-fly join between the `users` and `posts` collection in MongoDB, wherein the `_id` of the `users` collection is an ObjectID, and the `_id` of the `posts` field is a string.   

{{< highlight graphql >}}
query {
  users @mongo {
    name
    posts (where: {_id: "utils.objectIdToString(users._id)"}) @mongo {
      title
    }
  }
}
{{< /highlight >}}
