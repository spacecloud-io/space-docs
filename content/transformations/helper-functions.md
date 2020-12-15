---
title: "Helper Functions"
description: "Helper Functions"
date: 2020-11-27T11:24:25+05:30
draft: false
weight: 5
---

Space Cloud comes packed with quite a few helper functions that you can in transformations.

## Helper functions in go templates

There are two sets of helper functions available in go templates for transformations in Space Cloud:
- Functions made by us.
- [Sprig functions](https://masterminds.github.io/sprig/) - A popular library for useful functions in go templates.

Below we are going to explain the functions made by us before giving a summary of the sprig functions: 

### hash

The `hash` function generates an SHA-256 hash of the provided string.

**Example:** Hash the `password` field recieved in the request body:

{{< highlight bash >}}
{{ $hashedPassword := hash .args.password }}
{{< /highlight >}}

### generateId

The `generateId` function simply returns a [ksuid](https://github.com/segmentio/ksuid) (K-Sortable Unique ID) string.

You can use this function to generate unique IDs in your templates.

**Example:** 

{{< highlight bash >}}
{{ $id := generateId }}
{{< /highlight >}}

### marshalJSON

The `marshalJSON` function stringifies a given JSON object. 

Many times while using go templates, we found ourselves simply shifting a JSON object up or down. For example, let's say we want to transform the following response object:

{{< highlight javascript >}}
{
  "result": {
    "user": {
      "id": "1",
      "name": "John"
    }
  }
}
{{< /highlight >}}

to:

{{< highlight javascript >}}
{
  "user": {
    "id": "1",
    "name": "John"
  }
}
{{< /highlight >}}

The template for such transformation would look like this:

{{< highlight bash >}}
{
  "user": {
    "id": "{{ .args.result.user.id }}",
    "name": "{{ .args.result.user.name }}"
  }
}
{{< /highlight >}}

As you can see, this use case will quickly become very tedious if the `user` object has a lot of fields.

With `marshalJSON`, we can simply generate the stringified version of the `user` object and use it instead of generating the string manually for each field. Here's an example of how to achieve this with `marshalJSON`:

{{< highlight bash >}}
{
  "user": {{ marshalJSON .args.result.user }}
}
{{< /highlight >}}

### copy

The `copy` function creates a deep copy of the given object.

**Example:** 

{{< highlight bash >}}
{{ $object2 := copy args.object1 }}
{{< /highlight >}}

### parseTimeInMillis

The `parseTimeInMillis` takes an integer (number of milliseconds since epoch) and converts it into a time object. This time object can then be used by other date functions in [sprig](https://masterminds.github.io/sprig/) for performing various operations like converting it into a date string or adding/subtracting time, etc.

**Example:** Convert time in milliseconds to a string with the format `YEAR-MONTH-DAY` with the help of `parseTimeInMillis` and `date` ( sprig function):

{{< highlight bash >}}
{{ $d := parseTimeInMillis .args.millis }}
{{ $dateString := date .d "2006-01-02" }}
{{< /highlight >}}

If you are wondering what's the `2006-01-02`, its because date formatting in Golang is a [little bit different](https://www.pauladamsmith.com/blog/2011/05/go_time.html).

### sprig functions

Space Cloud supports [Sprig](https://masterminds.github.io/sprig/) functions in its go templates. Sprig is a library of useful functions for Go templates. It has tons of functions for working with strings, arrays, dates, etc. 

**Example:** Uppercase a string:

{{< highlight bash >}}
{{ $name := "john" }}
{{ $uppercasedName = upper .name }}
{{< /highlight >}}

Check out the [documentation of Sprig functions](https://masterminds.github.io/sprig/) to learn all the
functions in details.

## Helper functions in header modifications

All the `utils` [functions in security rules](/security/security-rules/available-variables/) are available for use in header modifications as well. 

**For example,** let's say you want to set a header `Billing-Enabled` to `true` based on whether the JWT claims contains a field called `billingId`. Here's the header modification config for it using the `exists` function:

- `op`: `set`
- `key`: `Billing-Enabled`
- `value`: `utils.exists(auth.billingId)`