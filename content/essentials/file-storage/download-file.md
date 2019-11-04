---
title: "Download file"
date: 2019-09-21T08:15:47+05:30
draft: true
weight: 2
toc: false
---

All files uploaded via File Management module are accessible on the following url:

{{< highlight bash>}}
url = `$SPACE_CLOUD_ADDRESS/v1/api/$projectID/files/$path/$fileName`
{{< /highlight >}}

The url is different for each file and has following variable parts to it:

- **$projectID** - This is the project id with which you initialized the API
- **$path** - This is the path at which the file was uploaded
- **$fileName** - This is the name with which the file was uploaded (eg: profile.jpg)
