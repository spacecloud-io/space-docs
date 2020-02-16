---
title: "Upload file"
date: 2019-09-21T08:15:38+05:30
draft: false
weight: 1
toc: false
---

Here's how you can upload a file by simply calling `uploadFile` function on your frontend:

{{< highlight javascript "hl_lines=10" >}}
import { API } from "space-api";

// Initialize api with the project name and url of the space cloud
const api = new API("todo_app", "http://localhost:4122");

// Get the file to be uploaded
const myFile = document.querySelector("#your-file-input").files[0];

// Upload the file
api.FileStore().uploadFile("<destination-path>", myFile, "profile.jpg")
  .then(res => {
    if (res.status === 200) {
      // File uploaded successfully
    }
    // Error uploading file
  })
  .catch(ex => {
    // Exception occured while processing request
  });
{{< /highlight >}}  

As you can see, the `uploadFile` function takes 3 parameters:

- **path** - The path at which the file needs to be uploaded
- **file** - A file of the type HTML5 File API
- **name** - Name of the file

The `path` can be nested as well. For example, a path - /folder1/folder2 would mean to upload the file inside folder2 which is in folder1. If any of the folders mentioned in the path were not present, they would get created before uploading the file.

## Response
A response object sent by the server contains the **status** fields explained below:

**status**: Number describing the status of the upload operation. Following values are possible:

- 200 - Successful upload
- 401 - Request was unauthenticated
- 403 - Request was unauthorized
- 500 - Internal server error