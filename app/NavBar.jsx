const React = require('react');
const ReactDOM = require('react-dom');
const Search = require('./Search');

const NavBar = function(props) {
  for (let i = 0; i < props.btns.length; i++) {
    console.log(props.btns[i].id);
  }
  // <span className="button" id="search" onClick={ShowSearch}>Search</span>
  return (
    <div>
      <header>
        <div className="logoContainer"><img src="https://cdn.glitch.com/f84da1ef-a648-4233-af6d-f359389b0bf8%2Fucdavis_logo_white.png?v=1619565941391" alt="UC Davis"></img></div>
        <h1 id="classHead">Class of 2020</h1>
        <div id="buttonContainer">
          {props.btns.map((button) => <span className="button" id={button.id} onClick={button.onClick}>{button.displayText}</span>)}
          <span onMouseOver={handleMouseIn} onMouseOut={handleMouseOut} className="button" id={props.loginoff.id} onClick={props.loginoff.onClick}>{props.loginoff.displayText}<span id ="tt" style={{display: 'none'}}>{props.loginoff.ttText}</span></span>
        </div>
      </header>
    </div>
  )
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
      document.getElementById('top')
    );
  }
  xmlHttp.send();
//  ReactDOM.render(<Search/>, document.getElementById('middle'));  
}

// Login function
function GoogleLogin() {
  window.location.href="/auth/google";
}
function handleMouseIn() {
  document.getElementById('tt').style.display = 'block';
}

function handleMouseOut() {
  document.getElementById('tt').style.display = 'none';
}

module.exports = NavBar;
