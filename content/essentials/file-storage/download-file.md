---
title: "Download file"
date: 2019-09-21T08:15:47+05:30
draft: false
weight: 2
toc: false
---

All files uploaded via File Management module are accessible on the following url:

{{< highlight bash>}}
url = `$SPACE_CLOUD_ADDRESS/v1/api/$projectID/files/$path/$fileName`
{{< /highlight >}}

The URL is different for each file and has the following variable parts to it:

- **$projectID** - This is the project id with which you initialized the API
- **$path** - The path at which you have uploaded the file
- **$fileName** - The name with which you have uploaded the file (e.g., profile.jpg)