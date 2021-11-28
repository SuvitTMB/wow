var firebaseConfig, dateString;
var EidWOWScore = "";


$(document).ready(function () {
  if(sessionStorage.getItem("LineID")==null) { location.href = "index.html"; }
  LoadFirebase();
  LoadProfile();
});
 

function LoadFirebase() {
  firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);
  dbWOWScore = firebase.firestore().collection("WOWScore");
  document.getElementById("pictureUrl").src = sessionStorage.getItem("LinePicture");
  document.getElementById("displayName").append(sessionStorage.getItem("LineName"));
}


function LoadProfile() {
  dbWOWScore.where('LineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidWOWScore = doc.id;
      sWOWScore = doc.data().WOWScore;
      sWOWGame1 = doc.data().WOWGame1;
      sWOWGame2 = doc.data().WOWGame2;
      sShowWOW11 = doc.data().ShowWOW11; 
      sShowIMG11 = doc.data().ShowIMG11; 
      sShowWOW22 = doc.data().ShowWOW22; 
      sShowIMG22 = doc.data().ShowIMG22; 
      sShowWOW33 = doc.data().ShowWOW33; 
      sShowIMG33 = doc.data().ShowIMG33; 
      sShowWOW44 = doc.data().ShowWOW44; 
      sShowIMG44 = doc.data().ShowIMG44; 
      $("#ShowWOWGame1").html('<div class="box-wow-number2">'+sWOWGame1+'</div>'); 
      $("#ShowWOWGame2").html('<div class="box-wow-number2">'+sWOWGame2+'</div>'); 
      $("#ShowWOWScore").html('<div class="box-wow-number2">'+sWOWScore+'</div>'); 
    });
    if(EidWOWScore=="") {
        AddNewWOWPoint();
    }
  });
}



function AddNewWOWPoint() {
  NewDate();
  var sSpace = "";
    dbWOWScore.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID"),
    EmpName : sessionStorage.getItem("EmpName"),
    JoinTime : 0,
    WOWScore : 0,
    WOWGame1 : 0,
    WOWGame2 : 0,
    ShowWOW11 : sSpace,
    ShowIMG11 : sSpace,
    ShowWOW22 : sSpace,
    ShowIMG22 : sSpace, 
    ShowWOW33 : sSpace,
    ShowIMG33 : sSpace,
    ShowWOW44 : sSpace,
    ShowIMG44 : sSpace,
    WOWGame1Check : 0,
    UserSumTrue : 0,
    UserSumFalse : 0,
    UserSumQuiz : 0,
    UserCountQuiz : 0,
    TimeGetGame1 : 0,
    TimeGetGame2 :0,
    TimeDateGame1 : sSpace,
    StartDate : dateString
    });
    LoadProfile();
}


function NewDate() {
  var today = new Date();
  var day = today.getDate() + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';

  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);

  dateString = day + "/" + month + "/" + (parseInt(year)+543) + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
}

function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}