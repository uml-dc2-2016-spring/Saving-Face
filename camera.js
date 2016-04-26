// Put event listeners into place
window.addEventListener("DOMContentLoaded", function() {
	// Grab elements, create settings, etc.
	var     video = document.getElementById("video"),
		videoObj = { "video": true },
		errBack = function(error) {
			console.log("Video capture error: "); 
		};

	// Put video listeners into place
	if(navigator.getUserMedia) { // Standard
		navigator.getUserMedia(videoObj, function(stream) {
			video.src = stream;
			video.play();
		}, errBack);
	} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
		navigator.webkitGetUserMedia(videoObj, function(stream){
			video.src = window.webkitURL.createObjectURL(stream);
			video.play();
		}, errBack);
	}
	else if(navigator.mozGetUserMedia) { // Firefox-prefixed
		navigator.mozGetUserMedia(videoObj, function(stream){
			video.src = window.URL.createObjectURL(stream);
			video.play();
		}, errBack);
	}
}, false);



// Ajax related code acquired from http://stackoverflow.com/questions/17805456/upload-a-canvas-image-to-imgur-api-v3-with-javascript from user: TK123
function imload(func){
        
        try {
	      var img = document.getElementById("canvas").toDataURL('image/jpeg', 0.9).split(',')[1];
	    } catch(e) {
               	         var img = document.getElementById("canvas").toDataURL().split(',')[1];
	               }


// uploads the image taken via the camera to imgur, the func passed into the code is used to call one of the functions that will utilize the face++ api.
$.ajax({
    url: 'https://api.imgur.com/3/image',
    type: 'post',
    headers: {
        Authorization: 'Client-ID 6d4bef5b55dab45'
    },
    data: {
        image: img
    },
    dataType: 'json',
    success: function(response) {
        if(response.success) {
             func(response.data.link);
        }
    }
});

}

function Face( link )
{
  //initialize the face++ api using my key and secret

	var api = new FacePP('dc33de5cf45a20090f8814cf0d09db74', 'Z4ggKeIGyayOjK1QWCZ8YmVW8JoSQ9h7', { apiURL: 'http://apius.faceplusplus.com/' });

  // calls the detection function to detect the face of the current person in the image. The link being passed in comes from the AJAX request in the imload function, the link to the imgur page created.

	api.request('detection/detect', {url: link } , function(err, result) {
  if (err) {
    document.getElementById('resp').innerHTML = 'Load failed.';
    return;
  }
  //document.getElementById('resp').innerHTML= JSON.stringify(result, null, 2);
  var t = JSON.stringify(result, null, 2);
  var f = t.split(": ");
  
  // error checker to make sure a face wwas actually detected, if not it refreshes the page. 
 
  if( f.length < 14 )
  {
   alert("No face was detected try again"); 
   window.location.href = "registration.html";
  }
  var yay = f[14].split(",");
  var nex = yay[0].split('"');
  //document.getElementById('diecaf').innerHTML= nex[1];
  var n = document.getElementById('user').value;
  var p = document.getElementById('password').value;
  creation( api, n, p, nex[1] );
  //window.location.href = "home.html"    
});

}

function creation( api, name, passw, ident )
{
  //var ident = document.getElementById('diecaf').innerHTML
  api.request('person/create', {person_name: name, face_id: ident} );
  Base[index] = new Account( name, passw, ident);
  index+=1;
  console.log(Base[index-1].userName);
  console.log(Base[index-1].passWord);
  console.log(Base[index-1].id);
  
}

function create_Account()
{
  takePhoto()
}

function takePhoto()
{
        var can = document.getElementById("canvas");
        var ctx = can.getContext("2d");
	ctx.drawImage(document.getElementById("video"), 0, 0, 300, 300);
	imload(Face);
	
}

//just a test function used through the course of the coding process
function testforjsonstuff()
{
	Face("http://i.imgur.com/BMhHpP1.jpg");
}

//this is the base login function for the site once the image to be used is loaded up to imgur.
function recogtest( link, i )
{
  var api = new FacePP('dc33de5cf45a20090f8814cf0d09db74', 'Z4ggKeIGyayOjK1QWCZ8YmVW8JoSQ9h7', { apiURL: 'http://apius.faceplusplus.com/' });
  api.request('detection/detect', {url: link } , function(err, result) {
        if (err) {
         return 'false';
        }
  var t = JSON.stringify(result, null, 2);
  var f = t.split(": ");
  
  //tests to make sure face was detected in image. 

  if( f.length < 14 )
  {
   alert("No face was detected try again"); 
   window.location.href = "login.html";
  }
  var yay = f[14].split(",");
  var nex = yay[0].split('"');

  //with the face id attached to the account being logged into, and the id of the newly acquired image we now ccompare the two.
  //we want the value of the similarities between the account's saved face and our attempted login's saved face.
  // If the value of the similarities is greater than 70% then it's safe to assume it's the right person.

  api.request('recognition/compare', {face_id1: Base[i].id, face_id2: nex[1]}, function(err, respo) {
          if(err) {
          return 'false';
          }
          // these lines of code just parse through the JSON document response to get the similarity value.
          var re = JSON.stringify(respo, null, 2);
          
          var sp = re.split("}");
   
	  var sim = sp[1].split(": ");
	
          console.log(sim[2]);
          if( sim[2] < 70 )
	    alert("access denied");
          else 
            alert("access granted");
          });
   });
}


// once the username and password are matched we can take the photo and load it to imgur, making sure to save the location of the matching account in our base array.
function loginload( i, func )
{
        var can = document.getElementById("canvas");
        var ctx = can.getContext("2d");
	ctx.drawImage(document.getElementById("video"), 0, 0, 300, 300);

        try {
	    	var img = document.getElementById("canvas").toDataURL('image/jpeg', 0.9).split(',')[1];
	    } catch(e) {
    	var img = document.getElementById("canvas").toDataURL().split(',')[1];
	    }

$.ajax({
    url: 'https://api.imgur.com/3/image',
    type: 'post',
    headers: {
        Authorization: 'Client-ID 6d4bef5b55dab45'
    },
    data: {
        image: img
    },
    dataType: 'json',
    success: function(response) {
        if(response.success) {
             func(response.data.link, i);
        }
    }  
});

}

// the first function called in the login process, we iterate the array of accounts until we find a matching username to what was inputted by the client.
// we then check it's password to make sure that is a match. If One of these doesn't ring true we alert the user that either the username or password didn't match and refresh the page.

function login()
{
  var match = 'false';
  var i = 0;
  for(i = 0; i < Base.length; i++)
  {
      console.log("testing for username: " + Base[i].userName)
      if( document.getElementById('user').value == Base[i].userName )
        {
          console.log("username matched");
          if( document.getElementById('password').value == Base[i].passWord )
            {
                console.log("password matched");
                match = 'true';
		loginload(i, recogtest);
            }
        }
  }
  if(match == 'false')
    {
    alert("username or password didn't match");
    window.location.href = "login.html";               
    }
}



//another test file for the sake of debugging early on.
function test_recognition()
{
        var api = new FacePP('dc33de5cf45a20090f8814cf0d09db74', 'Z4ggKeIGyayOjK1QWCZ8YmVW8JoSQ9h7', { apiURL: 'http://apius.faceplusplus.com/' });
	api.request('detection/detect', {url: 'http://i.imgur.com/BMhHpP1.jpg' } , function(err, result) {
        if (err) {
         return 'false';
        }
        var t = JSON.stringify(result, null, 2);
        var f = t.split(": ");
        var yay = f[14].split(",");
        var nex = yay[0].split('"');
        api.request('recognition/compare', {face_id1: 'bf0d9d5c42cb94645b96b8889a33b025', face_id2: nex[1]}, function(err, respo) {
          if(err) {
          return 'false';
          }
          var re = JSON.stringify(respo, null, 2);
          var sp = re.split("}");
	  var sim = sp[1].split(": ");
	  alert(sim[3]);
});
});
}    

function test_Base()
{
  for(i=0; i < Base.length; i++)
    {
       console.log(Base[i].userName);
       console.log(Base[i].passWord);
    }
}

//the class for accounts for now just accepts a username and password.
var Account = function(username, password, id){
   this.userName = username;
   this.passWord = password;
   this.id = id;
};

var Base = [];
Base[0] = new Account('danjou', 'password', 'afe215f5c638fc96696e753794fdf534');
var index = 1;