---
title: "Calling Functions"
date: 2019-09-21T13:35:31+05:30
draft: true
weight: 3
toc: false
---

Any function written on backend can be called on the frontend either by using GraphQL or our client SDKs.

## Using GraphQL

**Example:** Let's say we want to call a function - `func1` of service - `service1`. This is how you would do it in GraphQL:

<div class="graphql holder">
<div class="query">
{{< highlight graphql "noclasses=false">}}
query {
  func1(
    arg1: "10",
    arg2: "20"
  ) @service1 {
    status
    data
  }
}
{{< /highlight >}}
</div>
<div class="response">
{{< highlight json "noclasses=false">}}
{
  "data": {
    "func1": {
      "status": 200,
      "data": {
        "result: "Object sent by the function"
      }
    }
  }
}
{{< /highlight >}}
</div>
</div>

## Using client SDKs

 <div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#client-js">Javascript</a></li>
      <li class="tab col s2"><a href="#client-golang">Golang</a></li>
      <li class="tab col s2"><a href="#client-java">Java</a></li>
      <li class="tab col s2"><a href="#client-python">Python</a></li>
    </ul>
  </div>
  <div id="client-js" class="col s12" style="padding:0">
{{< highlight javascript>}}
import { API } from "space-api";

// Initialize api with the project name and url of the space cloud
const api = new API("todo_app", "http://localhost:4122");

// Call a function running 'my-func' of 'my-service' running on backend
api.call('my-service', 'my-func', { msg: 'Space Cloud is awesome!' }, 1000)
  .then(res => {
    if (res.status === 200) {
      console.log('Response: ', res.data)
    }
  }).catch(ex => {
    // Exception occured while processing request
  })
{{< /highlight >}}  
  </div>
  <div id="client-golang" class="col s12" style="padding:0">
{{< highlight golang>}}
import (
	"github.com/spaceuptech/space-api-go/api"
	"fmt"
)

func main() {
	api, err := api.New("books-app", "localhost:4124", false)
	if(err != nil) {
		fmt.Println(err)
	}
	v := map[string]interface{}{"params":"params"}
	resp, err := api.Call("service", "echo_func", v, 5000)
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		if resp.Status == 200 {
			var v map[string]interface{}
			err:= resp.Unmarshal(&v)
			if err != nil {
				fmt.Println("Error Unmarshalling:", err)
			} else {
				fmt.Println("Result:", v)
			}
		} else {
			fmt.Println("Error Processing Request:", resp.Error)
		}
	}	
}
{{< /highlight >}}    
  </div>  
  <div id="client-java" class="col s12" style="padding:0">
{{< highlight java>}}
API api = new API("books-app", "localhost", 4124);
Utils.ResponseListener responseListener = new Utils.ResponseListener() {
    @Override
    public void onResponse(int statusCode, Response response) {
        try {
            System.out.println("Functions Response: " + response.getResult(Object.class));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onError(Exception e) {
        System.out.println("Error: " + e.toString());
    }
};
api.call("service", "echo_func", 5000, "FaaS is awesome!", responseListener);
{{< /highlight >}}    
  </div>
 <div id="client-python" class="col s12" style="padding:0">
{{< highlight python>}}
from space_api import API

api = API("books-app", "localhost:4124")
# Call a function, 'my-func' of 'my-engine' running on backend
response = api.call('my-engine', 'my-func', {"msg": 'Space Cloud is awesome!'}, 1000)
if response.status == 200:
    print(response.result)
else:
    print(response.error)

api.close()
{{< /highlight >}}   
  </div>
</div>

The `call` function takes four arguments which are as follows:
- **serviceName** - Name of the service
- **funcName** - Name of the function
- **params** - An object that can contain any data that you want to pass to the function on backend
- **timeOut** - Timeout in milli seconds

As you would have noticed, the above function is asynchronous in nature. The `call` method triggers the specified function on the backend with the provided params. If the function takes more time to execute than the given `timeout`, an exception is returned 

### Response

On response from the server, the callback passed to the `then` method is called with the response object as described below:

{{< highlight json>}}
{
  "status": "number", // Status of the operation
  "data": {
    "result": "object" // Response returned by the function
  }
}
{{< /highlight >}}  
