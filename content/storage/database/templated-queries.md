---
title: "Templated Queries"
description: "Templated Queries"
date: 2020-11-29T11:12:13+05:30
draft: false
weight: 9
---

Templated queries is a more secure way of accessing the GraphQL APIs of Space Cloud. 😇


## What are templated queries?

Often we want to provide a simpler, customised and restricted REST/GraphQL API to the frontend while enjoying the full flexibility of the GraphQL API on the backend. This is where templated queries come into the picture.

Templated queries let you expose a customised GraphQL API on top of the auto-generated GraphQL APIs of Space Cloud.

In short it allows frontend developers to send a simple, domain-specific query like this:

{{< highlight graphql >}}
query {
  changeName (userId: $userId, name: $name) @profile {
    status
    error
  }
}
{{< /highlight >}} 

while Space Cloud executes the following query behind the scenes:

{{< highlight graphql >}}
mutation {
  update_users (where: { id: $userId }, set: { name: $name }) @postgres {
    status
    error
  }
}
{{< /highlight >}}

## Getting started

Let's continue the example described above to see how we can add a templated query to Space Cloud and use it. 

For the sake of this example, we will be assuming certain things like the table and database names, operation we want to perform, etc. You can change them as per your use case. 

[Add a database](/storage/database/add-new-database/) to Space Cloud, if you haven't already. 

Head over to the `Overview` tab of the `Database` section and click on the `Add` button to add the `users` table:

{{< highlight graphql >}}
type users {
  id: ID! @primary
  name: String!
  email: String!
}
{{< /highlight >}}

Then head over to the `Browse` tab of the `Database` section and click on the `Insert` button to add the following `user` record:

{{< highlight json>}}
{
  "id": "1",
  "name": "John",
  "email"
}
{{< /highlight >}}

Now, it's time to create a templated query. 

Templated queries are nothing but a kind of a remote endpoint, pointing to the Space Cloud's GraphQL API internally.

Head over to the `GraphQL API` section under `Microservices` in the Mission Control. Click on the Add button to add the following remote service:

- `Service name`: `profile`
- `URL`: `xyz` (The value of the URL doesn't matter in this use case).

After adding the remote service, you will be directed to its endpoints page. Click on the `Add` button there to add the following endpoint:

- `Endpoint name`: `changeName`
- `Endpoint type`: `Space Cloud`
- `Template output format`: `YAML`
- `GraphQL query template`:

{{< highlight graphql >}}
mutation {
  update_users (where: { id: $userId }, set: { name: $name }) @postgres {
    status
    error
  }
}
{{< /highlight >}}

- `Response body template` under the `Advanced` options:

{{< highlight bash >}}
{{marshalJSON .args.data.update_users}}
{{< /highlight >}}

That's it! We have added our templated query!

> Wondering what is that response body template? 🤔. The auto-generated GraphQL API of `update_users` will respond with the `status` and `error` fields under the `data.update_users` key. Since `changeName` is a GraphQL API on top of `update_users`, we will get the `status` and `error` fields under the `data.changeName.data.update_users`. To avoid that, we are transforming the response body of our `changeName` endpoint to a JSON body with only the contents of the `data.update_users`. We have used Go templates to describe the transformed response body above. Check out the [docs of transformations](/transformations) to learn more about it in detail.

Time to use our templated query now!

Head over to the `API Explorer` section of the Mission Control. Copy-paste the following query and variables:

{{< highlight graphql >}}
query {
  changeName (userId: $userId, name: $name) @profile {
    status
    error
  }
}
{{< /highlight >}}

Variables:

{{< highlight json >}}
{
  "userId": "1",
  "name": "Rock"
}
{{< /highlight >}}

Hit the play button, and you should be able to see the following result as expected:

{{< highlight json>}}
{
  "data": {
    "changeName": {
      "status": 200
    }
  }
}
{{< /highlight >}}

To confirm that everything worked as expected, you can run this query:

{{< highlight graphql >}}
{
  users @postgres {
    id
    name
  }
}
{{< /highlight >}}


You should be able to see this response:

{{< highlight json>}}
{
  "data": {
    "users": [
      {
        "id": "1",
        "name": "Rock"
      }
    ]
  }
}
{{< /highlight >}}

Congrats!! 🥳 You just learned how to use templated GraphQL queries in Space Cloud.

## Securing templated queries

If you noticed in the getting started section above, a templated query is nothing but a remote endpoint. You can secure it using the same way you [secure remote services](/microservices/graphql/securing-apis/) in Space Cloud.

## Use cases of templated queries

### Abstracting backend details

Many times, we don't want to expose the details of our backend structure on the frontend like the names of the table, fields, database, etc. 

Instead, we want to expose a more customised and domain-driven API which is easier to consume on the frontend. That's a major use case when you might want to use templated queries, as we also saw above in our example. 

### Avoiding sub-optimal queries

Space Cloud's auto-generated GraphQL API is very powerful. From complex joins to batch operations, you have got it all. 

However, in a big application, there are chances of frontend not sending optimised queries. What if the frontend utilises links instead of the `join` clause that performs optimised SQL queries? What if the frontend updates two tables in different mutation queries, which should have been updated via a single batch query? 

With great power comes great responsibilities. However, sometimes we are more comfortable restricting this responsibility to our backend team. 

Using templated queries, your backend team can guarantee that the frontend always consumes optimised queries.


### Selectively exposing certain operations

Let's say we have a `users` table with the `id`, `username`, `email` and `date_of_birth` fields. And we only want the user to `set` the `email` field while updating his profile. 

It's possible to restrict the user from updating the other fields like `username`, `date_of_birth`, etc. by configuring proper security rules. However, writing security rules for such use cases can become tedious and error-prone if we have a lot of fields. Also remember, that `set` is just one operation, there are other operations as well like `unset`, `rename`, etc. which you might want to prevent.

Instead of writing and maintaining the security rules for such use cases, it is often easy to write a templated query that performs a given operation under the hood.
