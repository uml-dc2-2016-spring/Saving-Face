# Project Goal

# Project Design
 See the file "Flow Diagram for Login.html" this holds a chart similar to those in the book that follows the entire process that the code goes through for the login function.

# File Structure
 # Files

 A list of all important files and their purposes:

  camera.js:
   effectively the main file of all the Web camera related functions. This is what allows access to the webcam for the program's usage.
   
  register.js:
   This holds all the functions that are used to register an account on the server. Here is where the imgur api and face++ api's are called.
 
  login_check.js:
  All of the login functions are stored here. Once again this is where the imgur api and face++ api are called in relation to the login process.
  
  server.js:
  This is where the server is run and what needs to be called through the node.js command prompt in order for the rest of the code to run smoothly. It creates the local site that can be accessed from the computer.

  home.html:
  This serves as the home page of an arbitrary website that would have it's user login or register before showing information.
 
  account.html:
  directly accessing it will result in a page that tells you you need to sign in to view account related details. Meant to be a sort of general page for where the user's information that would be stored on the site would be. If login process is followed then there should mildly personalized text referring to that specific user.
  
  registration.html: 
  Serves as the page where one can register their account for a site using a username, password and picture taken via webcam.
  
  login.html:
  Serves as the login page of the site where the user logs in with their username, password and they then submit a picture that'll be compared to what the system has stored for that user. All html pages are very basic in design.
