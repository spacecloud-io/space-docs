---
title: "List files/folders"
date: 2019-09-21T08:16:29+05:30
draft: false
weight: 4
toc: false
---

You can list all files and folders within a specific folder by simply calling `listFiles` on the frontend. Here's a code snippet that shows how to do it:

 {{< highlight javascript "hl_lines=7" >}}
import { API } from "space-api";

// Initialize api with the project name and url of the space cloud
const api = new API("todo_app", "http://localhost:4122");

// Upload the file
api.FileStore().listFiles("/some-path")
  .then(res => {
    if (res.status === 200) {
      // res.data.result contains list of files / folders
      console.log("Files: ", res.data.result)
    }
    // Error fetching list of files
  })
  .catch(ex => {
    // Exception occured while processing request
  });
{{< /highlight >}} 

As shown above, the `listFiles` function takes a single parameter `path` and lists all the files/folders located at that path.

The `path` can be nested as well. For example, if you give a  `path` - /folder1/folder2, then `listFiles` method returns all the files/folders located in folder2, which are in folder1.

## Response

The response object sent by server looks something like this:

{{< highlight json "hl_lines=6-7">}}
{
  "status": 200,
  "data": {
    "result": [
      { 
        "name": "Folder 1",
        "type": "dir"
      },
      { 
        "name": "file1.jpg",
        "type": "file"
      },
      { 
        "name": "file2.txt",
        "type": "file"
      }
    ]
  }
}
{{< /highlight >}} 

Here `name` is the name of the folder/file and `type` describes whether the item is a file or directory.

A response object sent by the server contains the **status** and **data** fields explained below:

Possible values for **status**:

- 200 - Successfully fetched list of files/folders
- 401 - Request was unauthenticated
- 403 - Request was unauthorized
- 404 - Path does not exist
- 500 - Internal server error

