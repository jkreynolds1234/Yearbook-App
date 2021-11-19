const React = require('react');
const ReactDOM = require('react-dom');
const UnorderedList = require('./UnorderedList');

/* the main page for the index route of this app */
const UserHomePage = function (props) {
  let userEmail = props.userEmail;
  let userObject = JSON.parse(userEmail)[0];
  let usersList = props.allUsers;
  let gradPhoto = userObject.gradPic;
  if (gradPhoto = null) {
    gradPhoto = <img src= ""></img>;
  }
  //console.log(usersList);
  return(
    <div id="userHomePage">
      
      <span id="top">
        <div id="middle">
          <p id="welcomeHome">{"Welcome Home, " + userObject.gradFirstName + "!"}</p>
          <div class="profilePicContainer">
                <img class="profilePic" src={"./images/" + gradPhoto}></img>
          </div>
        </div>
        <div id="gradList" class="gradListUserHome">
          <p id="congrats">Congrats 2020 Grads!</p>
          <div>
        </div>
        </div>
      </span>
    </div>
  );
}

module.exports = UserHomePage;
