const React = require('react');
const ReactDOM = require('react-dom');
const SplashPage = require('./SplashPage');
const Questionnaire = require('./Questionnaire');
const UserHomePage = require('./UserHomePage');
const NavBar = require('./NavBar');
const Search = require('./Search');
const PhotoWall = require('./PhotoWall');

// Global Variables
/* Verification of email and handling the display after login */
let verified = false;
let firstLogin = false;
let userEmail = "";
let loginObject = {id: "login", onClick: GoogleLogin, displayText: "Login", ttText: "Must have a UC Davis email to sign up or login."};
let logoffObject = {id: "logoff", onClick: GoogleLogoff, displayText: "Logoff", ttText: ""};
let searchObject = {id: "search", onClick: ShowSearch, displayText: "Search"};
let editObject = {id: "editQuestionnaire", onClick: EditQuestionnaire, displayText: "Edit Profile"};

// Handles what to display
const handleDisplay = function() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  verified = (urlParams.get('verified') == '1');
  firstLogin = (urlParams.get('firstLogin') == '1');
  
  if (urlParams.get('search') == '1') {
    let reqParams = "firstName=" + urlParams.get('firstName') + "&lastName=" + urlParams.get('lastName') + "&major1=" + urlParams.get('major1') + "&major2=" + urlParams.get('major2') + "&minor1=" + urlParams.get('minor1') + "&minor2=" + urlParams.get('minor2');
    console.log(reqParams);
    let xmlHttpSearch = new XMLHttpRequest();
    xmlHttpSearch.open("POST", "/getAttributes");
    xmlHttpSearch.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttpSearch.onloadend = function(e) {
      console.log("Search response: " + xmlHttpSearch.responseText);
      ReactDOM.render(<PhotoWall allUsers={xmlHttpSearch.responseText}/>, document.getElementById('gradList'));
    }
    xmlHttpSearch.send(reqParams);
  }
  
  if (urlParams.get('emp') == '1') {
    userEmail = urlParams.get('em');
    console.log(userEmail);
  }
  
  if (verified) {
    if (firstLogin) {
      let majorsMinors = "";
      let xmlHttp = new XMLHttpRequest();  
      xmlHttp.open("GET", '/getAllMajorsMinors');
      xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      // set HttpRequest Callback Function
      xmlHttp.onloadend = function(e) {
        majorsMinors = xmlHttp.responseText;

        // Render Questionnaire and Appropriate NavBar
        ReactDOM.render(<Questionnaire responseText={majorsMinors} userEmail={userEmail}/>, document.getElementById('main'));
        ReactDOM.render(<NavBar btns={[searchObject]} loginoff={loginObject}/>, document.getElementById('nb'));
      }

      // Send HTTP Request
      xmlHttp.send();
    }
    else {
      // Render logged in homepage and appropriate NavBar
      getMe(userEmail);
    }
  }
  else {
    // Render unlogged in homepage and appropriate NavBar
    ReactDOM.render(<SplashPage/>, document.getElementById('main'));
    ReactDOM.render(<NavBar btns={[searchObject]} loginoff={loginObject}/>, document.getElementById('nb'));
    let xmlHttpSearch = new XMLHttpRequest();
    xmlHttpSearch.open("POST", "/getAttributes");
    xmlHttpSearch.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttpSearch.onloadend = function(e) {
      console.log("Search response: " + xmlHttpSearch.responseText);
      ReactDOM.render(<PhotoWall allUsers={xmlHttpSearch.responseText}/>, document.getElementById('gradList'));
    }
    xmlHttpSearch.send();
  }
  console.log
}

// Login function
function GoogleLogin() {
  window.location.href="/auth/google";
}
// Logoff function
function GoogleLogoff() {
  ReactDOM.render(
    // Render logged in homepage
    <SplashPage/>, 
    document.getElementById('main')
    )
    ReactDOM.render(<NavBar btns={[searchObject]} loginoff={loginObject}/>, document.getElementById('nb'));
    let xmlHttpSearch = new XMLHttpRequest();
    xmlHttpSearch.open("POST", "/getAttributes");
    xmlHttpSearch.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttpSearch.onloadend = function(e) {
      console.log("Search response: " + xmlHttpSearch.responseText);
      ReactDOM.render(<PhotoWall allUsers={xmlHttpSearch.responseText}/>, document.getElementById('gradList'));
    }
    xmlHttpSearch.send();
}

// Search function
function ShowSearch() {
  
  let majorsMinors = "";
  let xmlHttp = new XMLHttpRequest();  
  xmlHttp.open("GET", '/getAllMajorsMinors');
  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  // set HttpRequest Callback Function
  xmlHttp.onloadend = function(e) {
    majorsMinors = xmlHttp.responseText;

    ReactDOM.render(
      <Search responseText={majorsMinors} />,
      document.getElementById('middle')
    );
  }
  xmlHttp.send();
//  ReactDOM.render(<Search/>, document.getElementById('middle'));  
}

function EditQuestionnaire() {
  let majorsMinors = [];
  let userChoicesArray = [];
  let userEmail = "";
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.get('emp') == '1') {
    userEmail = urlParams.get('em');
  }
  
  let xmlHttpMajorsMinors = new XMLHttpRequest();  
  xmlHttpMajorsMinors.open("GET", '/getAllMajorsMinors');
  xmlHttpMajorsMinors.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlHttpMajorsMinors.onloadend = function(e) {
    majorsMinors = xmlHttpMajorsMinors.responseText;
    
    let xmlHttpUserChoices = new XMLHttpRequest();
    xmlHttpUserChoices.open("POST", "/getAttributes");
    xmlHttpUserChoices.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttpUserChoices.onloadend = function(e) {
      let userChoicesObject = JSON.parse(xmlHttpUserChoices.responseText)[0];
     
      ReactDOM.render(<Questionnaire responseText={majorsMinors} userEmail={userEmail}/>, document.getElementById('main'));
      ReactDOM.render(<NavBar btns={[searchObject]} loginoff={logoffObject}/>, document.getElementById('nb'));
      //addPicListener();
      document.getElementById('firstName').value = userChoicesObject.gradFirstName;
      document.getElementById('lastName').value = userChoicesObject.gradLastName;
      document.getElementById('major1').value = userChoicesObject.gradMajor1;
      document.getElementById('major2').value = userChoicesObject.gradMajor2;
      document.getElementById('minor1').value = userChoicesObject.gradMinor1;
      document.getElementById('minor2').value = userChoicesObject.gradMinor2;
      document.getElementById('gender').value = userChoicesObject.gradGender;
      document.getElementById('transportation').value = userChoicesObject.gradPreferredTransport;
      document.getElementById('homeTown').value = userChoicesObject.gradHomeTown;
      document.getElementById('bio').textContent = userChoicesObject.gradBio;
      document.getElementById('gradPic').value = userChoicesObject.gradPic;
    }
    xmlHttpUserChoices.send('email='+userEmail);
  }  
  xmlHttpMajorsMinors.send();
}

const getGrads = function() {
  let xmlHttpGetGrads = new XMLHttpRequest(); 
  xmlHttpGetGrads.open("POST", '/getAttributes');
  xmlHttpGetGrads.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlHttpGetGrads.onloadend = function() {
    console.log("Received response when retrieving graduates: " + xmlHttpGetGrads.responseText);
  }
  
  xmlHttpGetGrads.send();
}

const getMe = function(em) {
  let xmlHttpGetMe = new XMLHttpRequest();
  xmlHttpGetMe.open("POST", "/getAttributes");
  xmlHttpGetMe.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlHttpGetMe.onloadend = function() {
    let xmlHttpGetGrads = new XMLHttpRequest();
    xmlHttpGetGrads.open("POST", '/getAttributes');
    xmlHttpGetGrads.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttpGetGrads.onloadend = function() {     
      ReactDOM.render(<UserHomePage userEmail={xmlHttpGetMe.responseText}/>, document.getElementById('main'));
      ReactDOM.render(<NavBar btns={[searchObject, editObject]} loginoff={logoffObject}/>, document.getElementById('nb'));
      let xmlHttpSearch = new XMLHttpRequest();
      xmlHttpSearch.open("POST", "/getAttributes");
      xmlHttpSearch.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xmlHttpSearch.onloadend = function(e) {
        console.log("Search response: " + xmlHttpSearch.responseText);
        ReactDOM.render(<PhotoWall allUsers={xmlHttpSearch.responseText}/>, document.getElementById('gradList'));
      }
      xmlHttpSearch.send();
    }
    xmlHttpGetGrads.send();
  }
  
  xmlHttpGetMe.send("email="+em);
  
}

function addPicListener() {
  // UPLOAD IMAGE
document.querySelector('#imgUpload').addEventListener('change', () => {
  
    // get the file with the file dialog box
    const selectedFile = document.querySelector('#imgUpload').files[0];
    // store it in a FormData object
    const formData = new FormData();
    formData.append('newImage',selectedFile, selectedFile.name);
  
    let button = document.querySelector('.btn');

    // build an HTTP request data structure
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload", true);
    xhr.onloadend = function(e) {
        // Get the server's response to the upload
        console.log(xhr.responseText);
        let newImage = document.querySelector("#cardImg");
        newImage.src = "https://vivid-rattle-epoch.glitch.me/images/"+selectedFile.name;
        newImage.style.display = 'block';
        document.querySelector('.image').classList.remove('upload');
        button.textContent = 'Replace Image';
    }
  
    button.textContent = 'Uploading...';
    // actually send the request
    xhr.send(formData);
});
}
handleDisplay();
