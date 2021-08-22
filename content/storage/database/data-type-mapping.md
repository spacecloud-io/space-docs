---
title: "Datatype mapping"
description: "This page shows a mapping of Space Cloud data types with actual relational database types"
date: 2020-02-18T18:04:00+05:30
draft: false
weight: 3
---

If you want to know, How to create a table using Space Cloud data types then follow this [Docs](/storage/database/data-modelling/quick-start/)

## NUMERIC DATA TYPES
Space Cloud | Precision / Scale Supported | Postgres | Mysql | Sql Server
:--- | :---: | :---: | :---: | ---:
SmallInteger | NO | smallint | smallint | smallint
Integer | NO | integer | integer | integer
BigInteger | NO | bigint | bigint | bigint
Decimal | YES | numeric | decimal | decimal
Float | NO | double precision | double | double

### Example

{{< highlight graphql >}}
type pokemon {
  id: BigInteger! @primary
  code: Integer!
  age: SmallInteger
  combat_power: Decimal @args(precision: 5, scale: 2)
  trainer_id: Float
}
{{< /highlight >}}
The `precision` represents the number of significant digits that are stored for values, and the `scale` represents the number of digits that can be stored following the decimal point.

In this example `precision` is 5 & `scale` is 2, which means a decimal can have total of 5 digits & maximum of 2 digits is allowed after decimal (`-999.99 to 999.99`)

if this field is not provided then it's up to the datbase to choose the default value

## STRING DATA TYPES
Space Cloud | Size Supported | Postgres | Mysql | Sql Server
:--- | :---: | :---: | :---: | ---:
ID | YES | character varying | varchar | nvarchar
Char | YES | character | char | nchar
Varchar | YES | character varying | varchar | nvarchar
String | Not needed | text | longtext | nvarchar(max)

### Example

{{< highlight graphql >}}
type pokemon {
  id: ID! @size(value : 5) @primary
  code: Char @size(value : 5)
  name: String
  description: Varchar @size(value : 5)
}
{{< /highlight >}}
The `size` is an optional way to specify the number of characters that has to be stored for values, if this field is not provided then it's up to the datbase to choose the default value

## DATE & TIME DATA TYPES
Space Cloud | Precision Supported | Postgres | Mysql | Sql Server
:--- | :---: | :---: | :---: | ---:
DateTime | YES | timestamp without time zone | datetime | datetime2
DateTimeWithZone | YES | timestamp with time zone | timestamp | datetimeoffset
Date | NO | date | date | date
Time | YES | time with time zone | time | time
TimeWithZone | YES | time with time zone | timestamp(func to retrieve only time) | datetimeoffset(func to retrieve only time)

### Example

{{< highlight graphql >}}
type pokemon {
  id: ID! @primary
  created_at: DateTime @args(precision: 3)
  updated_at: TimeWithZone @args(precision: 3)
}
{{< /highlight >}}
SQL permits fractional seconds for storing time values, with up to microseconds (6 digits) precision.

The highlighted (2038-01-19 03:14:07.`999999`) part in this time stamp represents the microseconds.

if this field is not provided then it's up to the datbase to choose the default value


## BIT & BOOLEAN DATA TYPES
Space Cloud | Precision / Size Supported | Postgres | Mysql | Sql Server
:--- | :---: | :---: | :---: | ---:
Boolean | NO | boolean | boolean (tinyint(1)) | NA

### Example

{{< highlight graphql >}}
type user {
  id: ID! @primary
  is_prime: Boolean
}
{{< /highlight >}}

## JSON DATA TYPES
Space Cloud | Precision / Size Supported | Postgres | Mysql | Sql Server
:--- | :---: | :---: | :---: | ---:
JSON | NO | jsonb | json | nvarchar(max) with additional constraint for json check

### Example

{{< highlight graphql >}}
type pokemon {
  id: I! @primary
  meta : JSON
}
{{< /highlight >}}
