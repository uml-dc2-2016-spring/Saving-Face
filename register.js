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

// function that detects the face in image taken, it then passes the image's face id into a creation function that creates the account.
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
  var t = JSON.stringify(result, null, 2);
  var f = t.split(": ");
  
  // error checker to make sure a face was actually detected, if not it refreshes the page. 
 
  if( f.length < 14 )
  {
   alert("No face was detected try again"); 
   window.location.href = "registration.html";
  }
  var yay = f[14].split(",");
  var nex = yay[0].split('"');
  
  //var n = document.getElementById('user').value;
  //var p = document.getElementById('password').value;
  var n = "Bill";
  var p = "Gates";
  creation( api, n, p, nex[1] );
  //window.location.href = "home.html"    
});

}

//this function saves the face id onto the face++ cloud so it doesn't expire. it also officially creates the account.
function creation( api, name, passw, ident )
{
  //var ident = document.getElementById('diecaf').innerHTML
  api.request('person/create', {person_name: name, face_id: ident} );
  var user = {};
  user.password = passw;
  user.face = ident;

  //saves the above user data into local storage. I wanted to use a database type of way to store it but it wasn't reasonably doable on time constraints after all the other bugs were resolved.
  localStorage.setItem(name, JSON.stringify(user));
  
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
