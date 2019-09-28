---
title: "Writing Functions"
date: 2019-09-21T13:35:26+05:30
draft: true
weight: 2
toc: false
---

You can easily extend Space Cloud by writing your custom logic on the backend in the form of simple functions. These functions run as a microservice on the backend. This is how you write a simple service -

 <div class="row tabs-wrapper">
  <div class="col s12" style="padding:0">
    <ul class="tabs">
      <li class="tab col s2"><a class="active" href="#service-js">Javascript</a></li>
      <li class="tab col s2"><a href="#service-golang">Golang</a></li>
      <li class="tab col s2"><a href="#service-java">Java</a></li>
      <li class="tab col s2"><a href="#service-python">Python</a></li>
    </ul>
  </div>
  <div id="service-js" class="col s12" style="padding:0">
{{< highlight javascript "hl_lines=9" >}}
const { API, cond } = require('space-api');

const api = new API('my-app', 'http://localhost:4122');

// Make a service
const service = api.Service('service-name');

// Register function to a service
service.registerFunc('function-name', (params, auth, cb) => {
  // Your custom logic goes here

  // Response to be returned to client
  const res = { ack: true, message: 'Functions mesh is amazing!' }
  cb('response', res)
})

// Start the service
service.start() 
{{< /highlight >}}        
  </div>
  <div id="service-golang" class="col s12" style="padding:0">
{{< highlight golang "hl_lines=14" >}}
import (
	"github.com/spaceuptech/space-api-go/api"
	"github.com/spaceuptech/space-api-go/api/model"
	"github.com/spaceuptech/space-api-go/api/service"
	"fmt"
)

func main() {
	api, err := api.New("books-app", "localhost:4124", false)
	if(err != nil) {
		fmt.Println(err)
	}
	service := api.Service("service")
	service.RegisterFunc("echo_func", Echo)
	service.Start()
	
}

func Echo(params, auth *model.Message, fn service.CallBackFunction) {
	var i interface{}
	params.Unmarshal(&i)
	fn("response", i)
}
{{< /highlight >}}   
  </div>
  <div id="service-java" class="col s12" style="padding:0">
{{< highlight java "hl_lines=3" >}}
API api = new API("books-app", "localhost", 4124);
Service service = api.service("service");
service.registerFunc("echo_func", new ServiceFunction() {
    @Override
    public void onInvocation(Message params, Message auth, ReturnCallback cb) {
        cb.send("response", params.getValue(Object.class));
    }
});
service.start(); // Is blocking
{{< /highlight >}}   
  </div>
  <div id="service-python" class="col s12" style="padding:0">
{{< highlight python "hl_lines=13" >}}
from space_api import API

api = API('books-app', 'localhost:4124')

def my_func(params, auth, cb):  # Function to be registered
    print("Params", params, "Auth", auth)

    # Do Something
    cb('response', {"ack": True})


service = api.service('service')  # Create an instance of service
service.register_func('my_func', my_func)  # Register function
service.start()  # Start service (This is a blocking call)

api.close()
{{< /highlight >}}  
  </div>
</div>

Use `api.Service` to initialize an instance of an `service`. The `api.Service` function takes only one parameter - **serviceName** which uniquely identifies the service. 

A `service` can harbour multiple functions which can be invoked by client. `service.registerFunc` is used to register a function to a service. The `registerFunc` method takes two parameters:

- **funcName:** Name of the function which uniquely identifies a function within a service
- **func:** The function to be executed

## Function parameters

Any registered function gets three arguments during execution when triggered by client as follows:   

- **params:** The params object sent by the client.
- **auth:** Auth object (consists the claims of JWT Token)
- **cb:** Callback function used to return the response back to the client

## Sending Response

To send JSON object as a response back to client, call the `cb` function with type as `response` and the second parameter being the response object: 

{{< highlight javascript >}}
// Any object that you want to send as response
const response = { ack: true, message: 'I love functions mesh!' } 
cb('response', response)
{{< /highlight>}}

## Next steps

We just saw how to write custom backend code. Let's see how to trigger these functions from frontend.
