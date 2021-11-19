const React = require('react');
const ReactDOM = require('react-dom');
// <div onMouseOver={(handleMouseIn)} onMouseOut={handleMouseOut} className="searchPicContainer"><img class="searchPic" src={"./images/"+graduate.gradPic} alt="No picture" /><div class="searchName">{graduate.gradFirstName + ' ' + graduate.gradLastName}</div></div>
const PhotoWall = function(props) { 
  let usersList = JSON.parse(props.allUsers);
 
  for (let i = 0; i < usersList.length; i++) {
    console.log("Original grad pic file name: " + usersList[i].gradPic)
    if (usersList[i].gradPic == '') {
      usersList[i].gradPic = 'contacts.png';
    }
  }
  
  return <div>
        <p id="congrats">Congrats 2020 Grads!</p>
  
        <div className="photoGrid">
          {usersList.map((graduate) => 
                         <div>
                           
                           <div onMouseOver={() => {document.getElementById(graduate.rowIdNum).style.display = 'block'; }} onMouseOut={() => {document.getElementById(graduate.rowIdNum).style.display = 'none'; }} className="searchPicContainer"><div className="searchNameContainer"><div className="searchName" id={graduate.rowIdNum}>{graduate.gradFirstName + ' ' + graduate.gradLastName}</div></div><img className="searchPic" src={"./images/"+graduate.gradPic} alt="No picture" /></div>
                         </div>)}
         </div>
  </div>
}

/*
function handleMouseIn() {
  document.getElementByClass('searchName').style.display = 'block';
}

function handleMouseOut() {
  document.getElementByClass('searchName').style.display = 'none';
}
*/

module.exports = PhotoWall;
