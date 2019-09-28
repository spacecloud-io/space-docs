---
title: "Upload file"
date: 2019-09-21T08:15:38+05:30
draft: true
weight: 1
toc: false
---

Here's how you can upload a file by simply calling `uploadFile` function on your frontend:

<div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#insertmany-js">Javascript</a></li>
      <li class="tab col s2"><a href="#insertmany-golang">Golang</a></li>
      <li class="tab col s2"><a href="#upload-java">Java</a></li>
      <li class="tab col s2"><a href="#upload-python">Python</a></li>
    </ul>
  </div>
  <div id="insertmany-js" class="col s12" style="padding:0">
{{< highlight javascript "hl_lines=10" >}}
import { API } from "space-api";

// Initialize api with the project name and url of the space cloud
const api = new API("todo-app", "http://localhost:4122");

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
  </div>
  <div id="insertmany-golang" class="col s12" style="padding:0">
{{< highlight golang "hl_lines=13">}}
api, err := api.New("books-app", "localhost:4124", false)
if(err != nil) {
  fmt.Println(err)
}
filestore := api.Filestore()

file, err := os.Open("a.txt")
if err != nil {
  log.Println("Error opening file", err)
  return
}

resp, err := filestore.UploadFile("<destination-path>", "hello1.txt", file)
if err != nil {
  log.Println("Error uploading file", err)
  return
}

if resp.Status != 200 {
  fmt.Println("Error uploading file", resp.Status, resp.Error)
  return
}

fmt.Println("Uploaded file successfully")
{{< /highlight >}} 
  </div>
    <div id="upload-java" class="col s12" style="padding:0">
{{< highlight java "hl_lines=14" >}}
API api = new API("books-app", "localhost", 4124);
FileStore fileStore = api.fileStore();
InputStream inputStream = new FileInputStream("input.txt");
fileStore.uploadFile("\\", "file.txt", inputStream, new Utils.ResponseListener() {
    @Override
    public void onResponse(int statusCode, Response response) {
        if (statusCode == 200) {
            System.out.println("Success");
        } else {
            System.out.println(response.getError());
        }
    }

    @Override
    public void onError(Exception e) {
        System.out.println(e.getMessage());
    }
});
{{< /highlight >}}      
  </div>
 <div id="upload-python" class="col s12" style="padding:0">
{{< highlight python "hl_lines=10" >}}
from space_api import API

# Initialize api with the project name and url of the space cloud
api = API("books-app", "localhost:4124")

# Initialize file storage module
file_store = api.file_store()

# Upload a file (to be named "new.txt" [remote]) into location ("\\" [remote]) from a file ("a.txt" [local])
response = file_store.upload_file("\\", "new.txt", "a.txt")
if response.status == 200:
    print("Success")
else:
    print(response.error)
{{< /highlight >}}     
  </div>
</div>


As you can see, the `uploadFile` function takes 3 parameters:

- **path** - The path at which the file needs to be uploaded
- **file** - A file of the type HTML5 File API
- **name** - Name of the file

The `path` can be nested as well. For e.g a path - /folder1/folder2 would mean to upload the file inside folder2 which is in folder1. If any of the folders mentioned in the path were not present, they would be created before uploading the file.

## Response
A response object sent by the server contains the **status** fields explained below:

**status**: Number describing the status of the upload operation. Following values are possible:

- 200 - Successful upload
- 401 - Request was unauthenticatedoverview
- 403 - Request was unauthorized
- 500 - Internal server error