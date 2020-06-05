---
title: "Delete file/folder"
description: "Delete file/folder"
date: 2019-09-21T08:16:48+05:30
draft: false
weight: 5
toc: false
---

You can easily allow users to delete a file or folder via the File Management module of Space Cloud by calling a simple function, as shown below:

{{< highlight javascript "hl_lines=7" >}}
import { API } from "space-api";

// Initialize api with the project name and url of the space cloud
const api = new API("todo_app", "http://localhost:4122");

// Delete a file
api.FileStore().delete("/some-path/some-file")
  .then(res => {
    if (res.status === 200) {
      // File deleted successfully
    }
    // Error deleting file
  })
  .catch(ex => {
    // Exception occured while processing request
  });
{{< /highlight >}}

The `delete` function takes a `path` of the file or folder you want to delete.

The `delete` function recursively deletes all files/folders in a folder if the `path` was for a folder. The `path` can be nested as well. For e.g a `path` - /folder1/folder2/file1 would mean to delete the file - `file1` inside folder2 which is in folder1.

## Response

A response object sent by the server contains the **status** fields explained below:

**status:** Number describing the status of the upload operation. Following values are possible:

- 200 - Successfully deleted file/folder
- 401 - Request was unauthenticated
- 403 - Request was unauthorized
- 500 - Internal server error