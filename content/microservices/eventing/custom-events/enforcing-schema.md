---
title: "Enforcing Schema"
date: 2020-03-31T20:23:24+05:30
draft: false
weight: 4
---

Space Cloud allows you to validate the schema of the event payload before queuing it.  

## Specifying schema of custom events

Space Cloud allows you to define the schema of event payload easily via GraphQL SDL. 

To specify the schema of event payload for a particular event type, go the `Schema` tab of the `Eventing` section in Mission Control. Click on the add button to open the following form:
![Event schema form](/images/screenshots/event-schema.png)

Fill the `Event Type` for which you want to define the schema and provide the `Schema`.

An example schema looks like this:
{{< highlight graphql >}}
type signup {
  email: String!
  pass: String!
  age: Integer 
}
{{< /highlight >}}

Here `signup` is the event type for which the schema is defined. The exclamation mark after `String` for `email` and `name` fields is used to denote that those fields are required in the event payload.

## Allowed data types

Space Cloud allows you to define literal values, objects and arrays in the schema for the event payload.

### Literal data types

- `String`
- `Integer`
- `Float`
- `Boolean`

### Specifying array

You can also specify fields of type array in your schema. 

**Example:** Specify `tags` in your event payload as an array of string:

{{< highlight graphql "hl_lines=4">}}
type signup {
  email: String!
  pass: String!
  tags: [String]
  age: Integer 
}
{{< /highlight >}}

### Specifying object/nested types

You can specify nested/object types in your schema as well. 

**Example:** Specify type of `address` (object) field:

{{< highlight graphql "hl_lines=4">}}
type signup {
  email: String!
  pass: String!
  address: address!
}
type address {
  pincode: Integer!
  city: String
}
{{< /highlight >}}
