---
title: "Browse Event Logs"
description: "Browse Event Logs"
date: 2020-04-02T08:17:25+05:30
draft: false
weight: 4
---

Space Cloud has a built-in Event Logs explorer so that you can quickly view/debug your event logs.

## Browsing all event logs
Head to the `Event Logs` tab of the `Eventing` section in Mission Control. You will see all the event logs sorted by time in a descending order by default like this:

The status column shows whether the event is being processed successfully or not.

### Invocation logs
After an event is queued, space cloud invokes the webhook URL of the corresponding event trigger multiple times (depending on the status and retry configuration). Invocation logs tell you what happened during each invocation. This is a good place to begin debugging your event triggers in case of failures.

To view event logs for a particular event, click on the `+` button to the left of any row in the event logs table and you will be able to see its invocation logs like this:


To view an invocation log in detail, click on the `+` button beside any invocation log to see a detailed analysis of an event log like this:

## Filtering event logs

Space Cloud allows you to filter event logs based on the following:
- **Status:** Processed, Failed and Pending.
- **Event trigger name:** The event trigger rule that you have created.
- **Date:** Event logs between specific dates. 

Click on the `Filters` button to configure these filters and hit `Apply`: