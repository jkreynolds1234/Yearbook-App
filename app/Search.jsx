const React = require('react');
const ReactDOM = require('react-dom');
const Selector = require('./Selector');
const PhotoWall = require('./PhotoWall');
// Login function
function GoogleLogin() {
  window.location.href="/auth/google";
}


const Search = function(props) {
  const majorsMinors = JSON.parse(props.responseText);
  
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
                {id: "minor2", type: "Minor 2:", val: Minors}];

  return (
    <div>   
      <div className="picContainer"><img src="https://cdn.glitch.com/b45b4130-9e0e-42e8-8801-1a33b6ff1741%2Fgraduation-3649717.jpg?v=1591497752866" alt="graduation"></img></div>
      
      <div id="searchContainer">
        <form id="searchForm">
          <div>
            <p id="searchTitle">Search For a Graduate</p>
            <p id="searchDescription">(By filling one or more boxes)</p>
          </div>

          <div id="searchQuestions">
            <div className="searchLabelAndBox">
              <label>First Name: </label>
              <input className="searchBox" type="text" id="fname" name="fname"/>
            </div>
            <div className="searchLabelAndBox">
              <label>Last Name: </label>
              <input className="searchBox" type="text" id="lname" name="lname"/>
            </div>

            {Both.map((category) => <div className="searchLabelAndBox"><label>{category.type}</label><Selector class = "searchBox" key = {category.toString()} value = {category.val} id = {category.id}/></div>)}
          </div>
          
          <div className="inputCentered">
            <input id="submitButton" value="Search" onClick={() => {submitSearch()}}/>
          </div>
        </form>
      </div>
    </div>
  );
}

const submitSearch = function() {
  let firstName = document.getElementById("fname").value;
  let lastName  = document.getElementById("lname").value;
  let major1     = document.getElementById("major1").value;
  let major2     = document.getElementById("major2").value;
  let minor1     = document.getElementById("minor1").value;
  let minor2     = document.getElementById("minor2").value;
  
  let hrefString = "/?search=1";
  if (firstName != "") hrefString += "&firstName="+firstName;
  if (lastName != "") hrefString += "&lastName=" + lastName;
  if (major1 != "") hrefString += "&major1=" + major1;
  if (major2 != "") hrefString += "&major2=" + major2;
  if (minor1 != "") hrefString += "&minor1=" + minor1;
  if (minor2 != "") hrefString += "&minor2=" + minor2;
  
  window.location.href= hrefString;
  /*
  console.log(firstName, lastName, major1, major2, minor1, minor2);
  
  let xmlHttp = new XMLHttpRequest();  
  xmlHttp.open("POST", '/getAttributes');
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  // set HttpRequest Callback Function
  xmlHttp.onloadend = function(e) {
    console.log("successfully ran submitAnswers" + xmlHttp.responseText);
    ReactDOM.render(<PhotoWall />, document.getElementById('main'));
  }

  // Send HTTP Request with parameters
  xmlHttp.send("firstName="+firstName+"&lastName="+lastName+"&major1="+major1+"&major12="+major2+"&minor1="+minor1+"&minor2="+minor2);
  */
}

module.exports = Search;

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
