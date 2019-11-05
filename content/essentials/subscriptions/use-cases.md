---
title: "Sample use cases"
date: 2019-09-17T18:18:52+05:30
draft: true
weight: 2
---

The following are a few use cases for using subscription:

## Realtime chat app

If you want to build a realtime chat app, then you can use Space Cloud for various realtime features in your app like:

- Realtime stream of chat messages
- Online/offline status of a user
- Is typing indicator for a user

Example: Subscribe to chat messages:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#chat-messages-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#chat-messages-js">Javascript</a></li>
    </ul>
  </div>
  <div id="chat-messages-graphql" class="col s12" style="padding:0">
{{< highlight graphql >}}
subscription {
  messages (
    where: {to: {_eq: "user1"}}
  ) @mongo {
    type
    payload {
      _id
      from
      to
      text 
      timestamp
    }
    docId
  }
}
{{< /highlight >}}   
  </div>
  <div id="chat-messages-js" class="col s12" style="padding:0">
{{< highlight javascript >}}
const whereClause = cond("to", "==", "user1")

// Callback for data changes:
const onSnapshot  = (messages, type, message) => {

}

// Callback for error while subscribing
const onError = (err) => {
   console.log('Live query error', err)
}

let subscription = db.liveQuery("messages")
  .where(whereClause)
  .subscribe(onSnapshot, onError)

// Unsubscribe to changes
if (on some logic) {
  subscription.unsubscribe()
}
{{< /highlight >}}  
  </div>
</div>

Example: Subscribe to is_typing indicator and status of a user:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#is-typing-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#is-typing-js">Javascript</a></li>
    </ul>
  </div>
  <div id="is-typing-graphql" class="col s12" style="padding:0">
{{< highlight graphql >}}
subscription {
  users (
    where: {_id: {_eq: "user2"}}
  ) @mongo {
    type
    payload {
      _id
      status
      is_typing
    }
    docId
  }
}
{{< /highlight >}}   
  </div>
  <div id="is-typing-js" class="col s12" style="padding:0">
{{< highlight javascript >}}
const whereClause = cond("_id", "==", "user2")

// Callback for data changes:
const onSnapshot  = (_, type, user) => {

}

// Callback for error while subscribing
const onError = (err) => {
   console.log('Live query error', err)
}

let subscription = db.liveQuery("users")
  .where(whereClause)
  .subscribe(onSnapshot, onError)

// Unsubscribe to changes
if (on some logic) {
  subscription.unsubscribe()
}
{{< /highlight >}}  
  </div>  
</div>

## Live score updates

Let's say you want to display the score of a particular game in realtime without polling the database again and again. In this case, you can subscribe to the game score and get notified whenever it's updated.

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#scores-graphql">GraphQL</a></li>
      <li class="tab col s2"><a href="#scores-js">Javascript</a></li>
    </ul>
  </div>
  <div id="scores-graphql" class="col s12" style="padding:0">
{{< highlight graphql >}}
subscription {
  games (
    where: {_id: {_eq: "1"}}
  ) @mongo {
    type
    payload {
      score
    }
  }
}
{{< /highlight >}}   
  </div>
  <div id="scores-js" class="col s12" style="padding:0">
{{< highlight javascript >}}
const whereClause = cond("_id", "==", "1")

// Callback for data changes:
const onSnapshot  = (_, type, game) => {

}

// Callback for error while subscribing
const onError = (err) => {
   console.log('Live query error', err)
}

let subscription = db.liveQuery("games")
  .where(whereClause)
  .subscribe(onSnapshot, onError)

// Unsubscribe to changes
if (on some logic) {
  subscription.unsubscribe()
}
{{< /highlight >}}  
  </div>
</div>