const React = require('react');
const ReactDOM = require('react-dom');

/* the main page for the index route of this app */
const SplashPage = function () {
  return(
    <div id="homePage">
      
      <span id="top">
        <div>
          <span id ="tt" style={{display: 'none'}}>Must have a UC Davis email address to sign-up or login</span>
        </div>
        <div id="middle">
          <div className="picContainer"><img src="https://cdn.glitch.com/f84da1ef-a648-4233-af6d-f359389b0bf8%2Fgraduation-3649717.jpg?v=1619565893250" alt="graduation"></img></div>
        </div>
      </span>

      <div id="gradList">
        <p id="congrats">Congrats 2020 Grads!</p>
      </div>
    </div>
  );
}

module.exports = SplashPage;
