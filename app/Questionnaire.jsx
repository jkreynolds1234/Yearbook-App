const React = require('react');
const ReactDOM = require('react-dom');
const Selector = require('./Selector');
const AnswerOption = require('./AnswerOption');

var handleChange = function(event){
    this.setState({html: event.target.value});
}.bind(this);

const Questionnaire = function(props) {
  const majorsMinors = JSON.parse(props.responseText);
  const userEmail = props.userEmail;
  const Minors = majorsMinors.filter(obj => {
    return obj.minor == 1;
  });
  
  Minors.sort(sortArrays);
  
  const Majors = majorsMinors.filter(obj => {
    return obj.major == 1;
  });
  
  Majors.sort(sortArrays);
  
  const Both = [{id: "major1", type: "Major 1:", val: Majors}, 
                {id: "major2", type: "Major 2:", val: Majors}, 
                {id: "minor1", type: "Minor 1:", val: Minors}, 
                {id: "minor2", type: "Minor 2:", val: Minors}, 
                {id: "gender", type: "Gender:", val: [{name: "Male"}, {name: "Female"}, {name: "Other"}]},
                {id: "transportation", type: "Transportation: ", val: [{name: "Bicycle"}, {name: "Car"}, {name: "Walking"}, {name: "Bus"}, {name: "Skateboarding"}, {name: "Unicycling"}, {name: "Other"}]}];

  return (
    <span>

      <form id="questionnaireForm" onSubmit={this.handleSubmit}>

        <div>
          <p id="questionnaireTitle">Profile Questionnaire</p>
        </div>

        <div className= "questionnaireQuestions">

          <div className="questionnaireLabelAndBox">
            <label htmlfor="firstName">First Name: </label>
            <input className="questionnaireBox" type="text" id="firstName" name="firstName"/>
          </div>

          <div className="questionnaireLabelAndBox">
            <label htmlfor="lastName">Last Name: </label>
            <input className="questionnaireBox" type="text" id="lastName" name="lastName"/>
          </div>
          
          {Both.map((category) => <div className="questionnaireLabelAndBox"><label>{category.type}   <Selector key = {category.toString()} value = {category.val} id = {category.id}/></label></div>)}


          <div className="questionnaireLabelAndBox">
            <label htmlfor="homeTown">Home Town/City and State: </label>
            <input className="questionnaireBox" type="text" id="homeTown" name="homeTown"/>
          </div>

          <div className="questionnaireLabelAndBox">
            <label htmlfor="bio">Bio: </label>
            <div contentEditable = "true" id="bio" name="bio" data-text="Write about yourself here"/>
          </div>

          <div className="questionnaireLabelAndBox">
            
            <label>Profile Picture: </label>
            <img id="cardImg" alt="user uploaded img"/>
            <input id="gradPic" type="file" class="filestyle" data-classButton="btn btn-primary" data-input="false" data-classIcon="icon-plus" data-buttonText="Choose Image" accept="image/*" onChange={imageStuff}/>
          </div>

        </div>

        <div className="inputCentered">
          <input id="submitButton" value="Save" onClick={() => {submitAnswers(userEmail)}} />
        </div>
      </form>
    </span>
  );
}

// old choose image <input id="gradPic" type="file" value= "Choose Image" accept="image/*" name="gradPic"/>  
const sortArrays = function(obj1, obj2) {
  if (obj1.name < obj2.name) {
    return -1;
  }
  else if (obj1.name == obj2.name) {
    return 0;
  }
  else {
    return 1;
  }
}

const submitAnswers = function(userEmail) {
  let firstName = document.getElementById('firstName').value;
  let lastName = document.getElementById('lastName').value;
  let major1 = document.getElementById('major1').value;
  let major2 = document.getElementById('major2').value;
  let minor1 = document.getElementById('minor1').value;
  let minor2 = document.getElementById('minor2').value;
  let gender = document.getElementById('gender').value;
  let homeTown = document.getElementById('homeTown').value;
  let transportation = document.getElementById('transportation').value;
  let bio = document.getElementById('bio').textContent;
  let gradPic = document.getElementById('gradPic').value.replace(/^.*[\\\/]/, '');
  console.log("Sending /saveProfile with parameters: " + firstName + lastName + major1 + major2 + minor1 + minor2 + gender + homeTown + transportation + bio);
  
  let xmlHttpSaveProfile = new XMLHttpRequest();  
  xmlHttpSaveProfile.open("POST", '/saveProfile');
  xmlHttpSaveProfile.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  
  // set HttpRequest Callback Function
  xmlHttpSaveProfile.onloadend = function(e) {
    console.log("successfully ran submitAnswers" + xmlHttpSaveProfile.responseText);
    
    window.location.href="/?verified=1&firstLogin=0&emp=1&em="+userEmail;
  }

  // Send HTTP Request with parameters
  xmlHttpSaveProfile.send("major1="+major1+"&major2="+major2+"&minor1="+minor1+"&minor2="+minor2+"&gender="+gender+"&firstName="+firstName+"&lastName="+lastName+"&homeTown="+homeTown+"&transportation="+transportation+"&bio="+bio+"&pic="+gradPic);
  
}

const imageStuff = function() {
  // get the file with the file dialog box
  const selectedFile = document.querySelector('#gradPic').files[0];
  // store it in a FormData object
  const formData = new FormData();
  formData.append('newImage',selectedFile, selectedFile.name);

  //let button = document.querySelector('.btn');

  // build an HTTP request data structure
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/upload", true);
  xhr.onloadend = function(e) {
      // Get the server's response to the upload
      console.log("Response from image upload: " + xhr.responseText);
      let newImage = document.querySelector("#cardImg");
      newImage.src = "https://vivid-rattle-epoch.glitch.me/images/"+selectedFile.name;
      newImage.style.display = 'block';
      //document.querySelector('.image').classList.remove('upload');
      //button.textContent = 'Replace Image';
  }  

  
  xhr.send(formData);}

module.exports = Questionnaire;
