# Saving-Face
  
# Contributors
 Daniel D'Anjou
  
# Project Description
Using OpenCV, create additional account security that goes beyond username and password that will also compare images of the account owner with image of the person currently trying to access account.
  
# Progress (Week 03/29)
I have made some early test files for both the server that's using node.js code, and made html file that can actually access the camera  of the user along with taking a picture. During the latter's test I learned that on chrome one needs a special certificate for security reasons in order to access the functions that use the camera. Luckily Mozilla Firefox's browser does not require such a feature. This project for the sake of completion will be mostly done via testing on Mozilla as a result, though the code should work on most web browers given the correct credentials. Mostly finished the tutorials on node.js to dive into setting up server, example server code uploaded into a branch for test code.
 
 Have also begun working on getting all html pages to operate together on the same server.js file and plan to work on the class for "user accounts".

# Progress (Week 04/05)
 Worked on learning how to use face++ API. On testing the code I'm having trouble getting images taken from the web cam to load correctly into the detect faces function that the API offers, have been trying to fix this bug since, it works if I paste into my code the url of some other image online but even when I acquire URL of the canvas image through script code it keeps returning an error. Will be working on it continuously, update pending.
 
# Progress (Week 4/12)
I've gotten stuck on this error with using the face++ API, have spent many hours researching solutions making constant changes to camera html file. Also have spent time looking into going back to opencv through a node js module. Through more searching found a method to get opencv to work with node js on my computer's operating system and now am working on integrating opencv as the api to compare images.  

# Progress (Week 04/19)
After weeks of tweaking and searching I have finally fixed that stupid bug in my code regarding loading images to the Face++ API. I spent a decent amount of time trying to use npm from node.js to load the node-opencv package after feeling that the Face++ api wasn't going to work. I then recently decided to look into using a seperate API to resolve the issue with face++. I Now am using Imgur's API to upload and store the initial image, from there taking the link from the response JSON I pass it into the Face++ API's detect function to now give it it's own face ID and it now processes that image from Imgur. With this bug finally hurdled, the rest of the project should go much smoother since the Face++ API gives me all the tools I need, I may even get much more code up in the coming week that would resemble the final result.
