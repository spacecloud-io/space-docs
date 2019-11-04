---
title: "Remove event logs"
date: 2019-10-19T13:39:18+05:30
draft: true
weight: 3
---

Space Cloud stores the event logs related to Event Triggers in the `event_logs` table/collection. If there are lots of events, the `event_logs` table can get huge, and you may want to prune them. You can use any of the following options to prune your event logs depending on your need.

> **Note:** You can even change the table and database where Space Cloud stores its event logs from the `Configure` section.

## Table structure

The `event_logs` table managed by Space Cloud has the following structure:

| Field             | Type   |                                                                     Description |
|:------------------|--------|--------------------------------------------------------------------------------:|
| `_id`             | String |                                                  Unique identifier of an event. |
| `batchid`         | Number | Unique identifier of a batch of an event. Used for internal Space Cloud events. |
| `type`            | Number |                                                                      Event type |
| `token`           | String |                                                             Authorization token |
| `timestamp`       | Number |                                Timestamp of when the event should get executed. |
| `event_timestamp` | Number |                                         Timestamp of when the event was queued. |
| `payload`         | String |                                                         Event data stringified. |
| `status`          | String |                            Status of event - `staged`, `processed` or `failed`. |
| `retries`         | Number |                                                    Number of retries performed. |
| `url`             | String |                                                                    Webhook URL. |
| `remark`          | String |                                                              Reason of failure. |

## Option 1: Clear only failed events

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#option1-sql">SQL</a></li>
      <li class="tab col s2"><a href="#option1-mongo">MongoDB</a></li>
    </ul>
  </div>
  <div id="option1-sql" class="col s12" style="padding:0">
{{< highlight sql >}}
DELETE from event_logs where status = "failed";
{{< /highlight >}}   
  </div>
  <div id="option1-mongo" class="col s12" style="padding:0">
{{< highlight javascript>}}
db.event_logs.remove({ status: "failed" })
{{< /highlight >}}  
  </div>
</div>

## Option 2: Clear only processed events

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#option2-sql">SQL</a></li>
      <li class="tab col s2"><a href="#option2-mongo">MongoDB</a></li>
    </ul>
  </div>
  <div id="option2-sql" class="col s12" style="padding:0">
{{< highlight sql >}}
DELETE from event_logs where status = "processed";
{{< /highlight >}}   
  </div>
  <div id="option2-mongo" class="col s12" style="padding:0">
{{< highlight javascript>}}
db.event_logs.remove({ status: "processed" })
{{< /highlight >}}  
  </div>
</div>

## Option 3: Clear both failed and processed events

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#option3-sql">SQL</a></li>
      <li class="tab col s2"><a href="#option3-mongo">MongoDB</a></li>
    </ul>
  </div>
  <div id="option3-sql" class="col s12" style="padding:0">
{{< highlight sql >}}
DELETE from event_logs where status = "failed" or status = "processed";
{{< /highlight >}}   
  </div>
  <div id="option3-mongo" class="col s12" style="padding:0">
{{< highlight javascript>}}
db.event_logs.remove({ status: { $in: ["failed", "processed"]} })
{{< /highlight >}}  
  </div>
</div>

## Option 4: Clear only failed events

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#option4-sql">SQL</a></li>
      <li class="tab col s2"><a href="#option4-mongo">MongoDB</a></li>
    </ul>
  </div>
  <div id="option4-sql" class="col s12" style="padding:0">
{{< highlight sql >}}
DELETE from event_logs;
{{< /highlight >}}   
  </div>
  <div id="option4-mongo" class="col s12" style="padding:0">
{{< highlight javascript>}}
db.event_logs.remove({ })
{{< /highlight >}}  
  </div>
</div>