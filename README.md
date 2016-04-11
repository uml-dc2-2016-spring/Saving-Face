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
