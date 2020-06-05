---
title: "Create folder"
description: "Create folder"
date: 2019-09-21T08:16:10+05:30
draft: false
weight: 3
toc: false
---

You can easily allow users to create a folder via the File Management module of Space Cloud by calling `createFolder` on frontend. Here's a code snippet to do so:

{{< highlight javascript "hl_lines=7" >}}
import { API } from "space-api";

// Initialize api with the project name and url of the space cloud
const api = new API("todo_app", "http://localhost:4122");

// Create a folder
api.FileStore().createFolder("/some-path", "some-folder")
  .then(res => {
    if (res.status === 200) {
      // Folder created successfully
    }
    // Error creating folder
  })
  .catch(ex => {
    // Exception occured while processing request
  });
{{< /highlight >}}  

The `createFolder` function takes two parameters and creates a folder. The two parameters are as follows:

- **path:** The path at which to create the folder.
- **name:** The name of the folder.

The `path` can be nested as well. For example, a `path` - /folder1/folder2 would mean to create the folder inside folder2 which is in folder1. If any of the folders mentioned in the `path` were not present, they would get created before creating the specified folder.

## Response

A response object sent by the server contains the **status** fields explained below:

**status:** Number describing the status of the upload operation. Following values are possible:

- 200 - Successful creation of folder
- 401 - Request was unauthenticated
- 403 - Request was unauthorized
- 500 - Internal server error