---
title: "Sample"
date: 2019-09-17T07:14:26+05:30
draft: true
---

This guide will help you run a local development setup that sets up both the `space-cloud` and MongoDB. It will guide you through exploring the Space Cloud APIs on MongoDB without having to set up any project.

> **Note:** MongoDB is not a dependency of Space Cloud. We are using MongoDB in this guide for ease of use because of it's schemaless nature.


## Prerequisites

- [Docker](https://docs.docker.com/install/) >= 18.02.0
- [Docker Compose](https://docs.docker.com/compose/install/) >= 1.20.0


## Highlight

This sections shows how to highlight code

### Bash

{{< highlight bash >}}
wget https://raw.githubusercontent.com/spaceuptech/space-cloud/master/install-manifests/quick-start/docker-compose/mongo/docker-compose.yaml
{{< /highlight >}}


### JSON

{{< highlight json >}}
{
  "result": {
      "_id": "2",
      "date": "2019-08-03T03:24:43.641Z",
      "text": "Follow us on Twitter"
    }
}
{{< /highlight >}}

### Graphql
<div class="graphql-container">
<div class="graphql-query">
{{< highlight graphql "noclasses=false">}}
query {
  id
  name
}
{{< /highlight >}}
</div>
<div class="graphql-response">
{{< highlight json "noclasses=false">}}
{
  "data": {
    "posts": [
      {
        "id": 1,
        "name": "John"
      }
    ]
  }
}
{{< /highlight >}}
</div>
</div>

### Tabs

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#insertmany-js">Javascript</a></li>
      <li class="tab col s2"><a href="#insertmany-golang">Golang</a></li>
    </ul>
  </div>
  <div id="insertmany-js" class="col s12" style="padding:0">
{{< highlight javascript >}}
const docs = [
  { _id: 1, text: "Star Space Cloud on Github!", time: new Date() },
  { _id: 1, text: "Fork Space Cloud on Github!", time: new Date() }
];
db.insert('todos').docs(docs).apply().then(res => ...).catch(ex => ...);
{{< /highlight >}}  
  </div>
  <div id="insertmany-golang" class="col s12" style="padding:0">
{{< highlight golang >}}
docs := make([]map[string]interface{}, 2)
docs[0] = map[string]interface{}{"name": "SomeBook"}
docs[1] = map[string]interface{}{"name": "SomeOtherBook"}
resp, err := db.Insert("books").Docs(docs).Apply()
{{< /highlight >}} 
  </div>
</div>


## Table

Table looks like this:

| Operator | Description                                       |
|:---------|:--------------------------------------------------|
| ==       | Passes if `op1` is equal to `op2`                 |
| !=       | Passes if `op1` is not equal to `op2`             |
| >        | Passes if `op1` is greater than `op2`             |
| <        | Passes if `op1` is lesser than `op2`              |
| >=       | Passes if `op1` is greater than or equal to `op2` |
| <=       | Passes if `op1` is lesser than or equal to `op2`  |
| in       | Passes if `op1` is in `op2`                       |
| notIn    | Passes if `op1` is not in `op2`                   |

## Next Steps

Awesome! We just performed few CRUD operations on MongoDB without writing a single line of backend code. The next step is to dive into the various Space Cloud modules.

- Perform CRUD operations using [Database](/docs/database/) module
- Manage files with ease using [File Management](/docs/file-storage) module
- Allow users to sign-in into your app using [User management](/docs/user-management) module
- Write custom logic at backend using [Functions](/docs/functions/) module
- [Secure](/docs/security) your apps


