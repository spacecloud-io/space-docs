---
title: "Viewing Logs"
description: "Viewing Logs"
date: 2020-11-30T05:39:30+05:30
draft: false
weight: 4
---

Space Cloud allows you to view the logs of your deployed services easily via Mission Control and `space-cli` both.

## Via Mission Control

Head over to the `Deployments` section in Mission Control:

![Deployment add service page](/images/screenshots/add-deployment.png)

Expand the required service to view its replicas by clicking on the plus icon in the left:

![Deployment replicas](/images/screenshots/deployment-replicas.png)

Click on the `View logs` button beside any replica to view its logs:

![Service Logs](/images/screenshots/service-logs.png)

The logs viewed via Mission Control are streamed in realtime (i.e. more logs will show up as and when they happen).

By default, the Mission Control applies a filter to view the logs from last 10 minutes only. You can change the applied filter by clicking on the `Filters` button.

### Viewing logs since a specific duration

Many times, you might want to view logs since specific time duration. For example, you might want to view logs of the last 5 minutes or maybe last 1 hour.

To change the time duration, click on the `Filters` button to open the following modal:

![Service Logs Duration Filter](/images/screenshots/service-logs-filter-duration.png)

Select the `Specific duration` option in the `Show logs since` field.

The unit of duration can be changed via the dropdown. The unit can be seconds, minutes or hours.

Click on the `Save filters` button to apply the filters.

### Viewing logs since a specific time

To view logs since a specific time, click on the `Filters` button to open the filters modal. Click on the `Specific time` option in the `Show logs since` field:

![Service Logs Time Filter](/images/screenshots/service-logs-filter-time.png)

Select a specific date and time via the date and time picker in the modal.

Click on the `Save filters` button to apply the filters.

### Viewing all logs since the start

To view all logs since the start, select the `Start` option in the `Show logs since` field:

![Service Logs All Filter](/images/screenshots/service-logs-filter-all.png)

### Limit the number of logs fetched

It's a good practice to limit the number of logs fetched, especially if you have a large number of logs. You can specify the number of most recent logs that you want to fetch in Mission Control.

Click on the `Filters` button. Check the `Tail logs` option and specify the limit:

![Service Logs Limit Rows](/images/screenshots/service-logs-filter-tail.png)

### Searching logs

Mission Control allows you to perform a `contains` search on the logs fetched. Just type the text that you want to search for in the logs and Mission Control will show the matching logs:

![Service Logs Search](/images/screenshots/service-logs-search.png)

## Via cli

### Viewing all logs since the start

To view all the logs of a service via space-cli, run the following command:

{{< highlight bash >}}
space-cli logs <replica-id> --project <project-id> --task <task-id>
{{< /highlight >}}

The `<replica-id>` will be autocompleted by `space-cli` if you have enabled autocomplete for `space-cli`.

### Viewing logs since a specific duration

Add the `--since` flag to view logs since a specific duration:

{{< highlight bash >}}
space-cli logs <replica-id> --project <project-id> --task <task-id> --since=<duration>
{{< /highlight >}}

Examples of duration:

- `10s` (10 seconds)
- `30m` (30 minutes)
- `2h` (2 hours)


**Example:** Fetch logs since last 5 minutes:

{{< highlight bash >}}
space-cli logs <replica-id> --project <project-id> --task <task-id> --since=5m
{{< /highlight >}}

### Viewing logs since a specific time

Add the `--since-time` flag to view logs since a specific time:

{{< highlight bash >}}
space-cli logs <replica-id> --project <project-id> --task <task-id> --since-time=<time>
{{< /highlight >}}

The `<time>` needs to be an ISO 8601 date string. 

**Example:**

{{< highlight bash >}}
space-cli logs <replica-id> --project <project-id> --task <task-id> --since-time="2019–02–06T03:59:40.417Z"
{{< /highlight >}}

### Limit the number of logs fetched

It's a good practice to limit the number of logs fetched, especially if you have a large number of logs. You can specify the number of most recent logs that you want to fetch via the `--tail` command.

**Example:** Fetch last 20 logs:

{{< highlight bash >}}
space-cli logs <replica-id> --project <project-id> --task <task-id> --tail=20
{{< /highlight >}}

### Following logs

While debugging your service, you often might want to follow/watch the logs as and when they are coming. Use the `--follow` flag to follow a log stream:

{{< highlight bash >}}
space-cli logs <replica-id> --project <project-id> --task <task-id> --follow
{{< /highlight >}}