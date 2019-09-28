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

A file can also be downloaded directly into a stream (or file), using the Java, Python and Golang clients.
Here's a code snippet to download a file:

 <div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a href="#download-golang">Golang</a></li>
      <li class="tab col s2"><a href="#download-java">Java</a></li>
      <li class="tab col s2"><a href="#download-python">Python</a></li>
    </ul>
  </div>
  <div id="download-golang" class="col s12" style="padding:0">
{{< highlight golang "hl_lines=13">}}
api, err := api.New("books-app", "localhost:4124", false)
if(err != nil) {
  fmt.Println(err)
}
filestore := api.Filestore()

file, err := os.Create("test1.txt")
if err != nil {
  fmt.Println("Error:", err)
  return
}
defer file.Close()
err = filestore.DownloadFile("\\Folder\\text.txt", file)
if err != nil {
  fmt.Println("Error:", err)
}
{{< /highlight >}}       
  </div>  
  <div id="download-java" class="col s12" style="padding:0">
{{< highlight java "hl_lines=4">}}
API api = new API("books-app", "localhost", 4124);
FileStore fileStore = api.fileStore();
OutputStream outputStream = new FileOutputStream("output.txt";);
fileStore.downloadFile("\\file.txt", outputStream, new Utils.ResponseListener() {
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
 <div id="download-python" class="col s12" style="padding:0">
{{< highlight python "hl_lines=10">}}
from space_api import API

# Initialize api with the project name and url of the space cloud
api = API("books-app", "localhost:4124")

# Initialize file storage module
file_store = api.file_store()

# Download the file ("\\a.txt" [remote]) into a file ("b.txt" [local])
response = file_store.download_file("\\a.txt", "b.txt")
if response.status == 200:
    print("Success")
else:
    print(response.error)
{{< /highlight >}}       
  </div>
</div>
