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

  var comp = JSON.parse(localStorage.getItem( localStorage.key(i) )).face;
  //with the face id attached to the account being logged into, and the id of the newly acquired image we now ccompare the two.
  //we want the value of the similarities between the account's saved face and our attempted login's saved face.
  // If the value of the similarities is greater than 70% then it's safe to assume it's the right person.

  api.request('recognition/compare', {face_id1: comp, face_id2: nex[1]}, function(err, respo) {
          if(err) {
          return 'false';
          }
          // these lines of code just parse through the JSON document response to get the similarity value.
          var re = JSON.stringify(respo, null, 2);
          
          var sp = re.split("}");
   
	  var sim = sp[1].split(": ");
	
          console.log(sim[2]);
          if( sim[2] < 70 )
	    {
	      alert("access denied");
              window.location.href="login.html";
            }
          else
            { 
              alert("access granted");
            }
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
  for(i = 0; i < localStorage.length; i++)
  {
      console.log("testing for username: " + localStorage.key(i))
      if( document.getElementById('user').value == localStorage.key(i) )
        {
          console.log("username matched");
          if( document.getElementById('password').value == JSON.parse(localStorage.getItem( localStorage.key(i) )).password)
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


