---
title: "Datatype mapping"
description: "This page shows a mapping of Space Cloud data types with actual relational database types"
date: 2020-02-18T18:04:00+05:30
draft: false
weight: 3
---

If you want to know, How to create a table using Space Cloud data types follow this [Docs](/storage/database/data-modelling/quick-start/)

Space Cloud | Precision / Size Supported | Postgres | Mysql | Sql Server
:--- | :---: | :---: | :---: | ---:
**NUMERIC DATA TYPES** | | | |
SmallInteger | NO | smallint | smallint | smallint
Integer | NO | integer | integer | integer
BigInteger | NO | bigint | bigint | bigint
Decimal | YES | numeric | decimal | decimal
Float | NO | double precision | double | double
**STRING DATA TYPES** | | | |
ID | YES | character varying | varchar | nvarchar
Char | YES | character | char | nchar
Varchar | YES | character varying | varchar | nvarchar
String | Not needed | text | longtext | nvarchar(max)
**DATE & TIME DATA TYPES** | | | |
DateTime | YES | timestamp without time zone | datetime | datetime2
DateTimeWithZone | YES | timestamp with time zone | timestamp | datetimeoffset
Date | NO | date | date | date
Time | YES | time with time zone | time | time
TimeWithZone | YES | time with time zone | timestamp(func to retrieve only time) | datetimeoffset(func to retrieve only time)
**BIT & BOOLEAN DATA TYPES** | | | |
Boolean | NO | boolean | boolean (tinyint(1)) | NA
**JSON DATA TYPES** | | | |
JSON | NO | jsonb | json | nvarchar(max) with additional constraint for json check