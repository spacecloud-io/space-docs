---
title: "Javascript client SDK"
date: 2019-09-26T09:23:20+05:30
draft: false
weight: 2
---

Follow this guide to use javascript client SDK in your web app or any Javascript/Node.js project.

## Step 1: Install Space Cloud API
**Install via npm:**

{{< highlight bash >}}
npm install space-api --save
{{< /highlight >}}

**Or import as a stand-alone library:**

{{< highlight html >}}
<script src="https://storage.googleapis.com/space-cloud/libraries/space-api.js"></script>
{{< /highlight >}}

## Step 2: Create an API instance

An `api` instance of Space Cloud on the frontend helps you talk to `space-cloud` binary and perform backend operations directly from the frontend. 

The `API` constructor takes two parameters: 

- **PROJECT_ID:** Unique identifier of a project. It's derived by converting your project name to lowercase. For example `TodoApp` becomes `todoapp`.
- **SPACE_CLOUD_URL:** This is the URL of your `space-cloud` binary. It's `http://localhost:4122` or `https://localhost:4126` for HTTP and HTTPS endpoints respectively.

> **Note:** Replace `localhost` with the address of your Space Cloud if you are not running it locally. 

**For ES6:**

{{< highlight javascript >}}
import { API } from 'space-api';

const api = new API('todo_app', 'http://localhost:4122');
{{< /highlight >}}

**For ES5/CommonJS:**

{{< highlight javascript >}}
const { API } = require('space-api');

const api = new API('todo_app', 'http://localhost:4122');
{{< /highlight >}}

**For stand-alone:**

{{< highlight javascript >}}
var api = new Space.API("todo_app", "http://localhost:4122");
{{< /highlight >}}


## Step 3: Create a DB instance

The `API` instance created above helps you to use `file storage` and `services` modules directly. However, to use `database` and `realTime` modules, you also have to create a `db` instance.

> **Note: You can use multiple `db` instances in the same project as space cloud supports multiple databases.**

This is how you create an instance of `db` in your project:

{{< highlight javascript >}}
const db = api.DB(<db-alias-name>);
{{< /highlight >}}

Let's say you have provided the alias name for your database as `mydb` while adding your database in Mission Control, then your db initialization code will be:
{{< highlight javascript >}}
const db = api.DB("mydb");
{{< /highlight >}}

The alias name identifies a database in your project uniquely. You can find out the alias name for your database from the database selector of the topbar in the Database section of Mission Control.

## Next steps
Great! Since you have initialized the `api` and `db` instance, you can start building apps with `space-cloud`. 

Feel free to check out various capabalities of `space-cloud`:

- Perform database [queries](/storage/database/queries)
- [Mutate](/storage/database/mutations) data
- [Realtime](/storage/database/subscriptions) data sync across all devices
- Manage files with ease using [File Storage](/storage/filestore) module
- [Authenticate](/user-management) your users
- Write [custom business logic](/microservices/graphql)