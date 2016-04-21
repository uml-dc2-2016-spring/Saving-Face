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


var locat;

// Ajax related code acquired from http://stackoverflow.com/questions/17805456/upload-a-canvas-image-to-imgur-api-v3-with-javascript from user: TK123
function imload(func){
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
             func(response.data.link);
        }
    }
});

}

function Face( link )
{
	var api = new FacePP('dc33de5cf45a20090f8814cf0d09db74', 'Z4ggKeIGyayOjK1QWCZ8YmVW8JoSQ9h7', { apiURL: 'http://apius.faceplusplus.com/' });
	api.request('detection/detect', {url: link } , function(err, result) {
  if (err) {
    document.getElementById('resp').innerHTML = 'Load failed.';
    return;
  }
  //document.getElementById('resp').innerHTML= JSON.stringify(result, null, 2);
  var t = JSON.stringify(result, null, 2);
  var f = t.split(": ");
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

function testforjsonstuff()
{
	Face("http://i.imgur.com/BMhHpP1.jpg");
}

function recogtest( link, i )
{
  var api = new FacePP('dc33de5cf45a20090f8814cf0d09db74', 'Z4ggKeIGyayOjK1QWCZ8YmVW8JoSQ9h7', { apiURL: 'http://apius.faceplusplus.com/' });
  api.request('detection/detect', {url: link } , function(err, result) {
        if (err) {
         return 'false';
        }
  var t = JSON.stringify(result, null, 2);
  var f = t.split(": ");
  var yay = f[14].split(",");
  var nex = yay[0].split('"');
  
  api.request('recognition/compare', {face_id1: Base[i].id, face_id2: nex[1]}, function(err, respo) {
          if(err) {
          return 'false';
          }
          var re = JSON.stringify(respo, null, 2);
          //document.getElementById("resp").innerHTML = re;
          var sp = re.split("}");
          //document.getElementById("diecaf").innerHTML = sp;
	  var sim = sp[1].split(": ");
          //document.getElementById("diecaf").innerHTML = sim[2];
	  console.log(sim[2]);
          if( sim[2] < 70 )
	    alert("access denied");
          else 
            alert("access granted");
          });
   });
}



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
    }
}

function attempt()
{
   var result;
   login();
/*   if( result == 'true' )
	{
 	   alert("Login successful");

        }
   else   
        {
           alert("Login failed");
        }*/
}
//the class for accounts for now just accepts a username and password.
var Account = function(username, password, id){
   this.userName = username;
   this.passWord = password;
   this.id = id;
};

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
//will initially be 0 but will store account data.
var Base = [];
Base[0] = new Account('danjou', 'password', 'afe215f5c638fc96696e753794fdf534');
var index = 1;
