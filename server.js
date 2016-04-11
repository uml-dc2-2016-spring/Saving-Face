var http = require('http');
var fs = require('fs');
var url = require('url');

//the class for accounts for now just accepts a username and password.
var Account = function(username, password){
   this.userName = username;
   this.passWord = password;
};

//will initially be 0 but will store account data.
var Base = []; 

http.createServer(function(request, response)
{
   // Parse the request containing file name
   
   var pathname = url.parse(request.url).pathname;
   
   // Print the name of the file for which request is made.
 
   console.log("Request for " + pathname + " received.");
   
   // Read the requested file content from file system
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP Status: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{	
         //Page found	  
         // HTTP Status: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});	
         
         // Write the content of the file to response body
         response.write(data.toString());		
      }
      // Send the response body 
      response.end();
   });   
}).listen(8081);

//console will print message
console.log('Server running at http://127.0.0.1:8081/');