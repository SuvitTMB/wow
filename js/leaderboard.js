var i = 0;
var cleararray = "";
var dbScorePoint = "";
var dbWOWScore = "";
var dbCheck = "";
//var dbBadgeGame = "";
//var dbBadgeUser = "";
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
//var BadgeArr = [];
//var BadgeArr1 = [];
//var UserBadgeArr = [];
//var UserBadgeArr1 = [];
var sGroupQuiz = "WOW";
var sBadgeEng = "Badge-WOW"; //ชื่อ badge


$(document).ready(function () {
  Connect_DB();
  DisplayLeaderBoard();
  //GetBadgeUser();
  //AllBadge();
});
 

function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);
  dbScorePoint = firebase.firestore().collection("GameScorePoint");
  dbCheck = firebase.firestore().collection("QuizScore");
  dbWOWScore = firebase.firestore().collection("WOWScore");
  //dbBadgeGame = firebase.firestore().collection("BadgeGame");
  //dbBadgeUser = firebase.firestore().collection("BadgeUser");
}


function DisplayLeaderBoard() {
  var str = "";
  //dbScorePoint.orderBy('RewardsXP','desc')
  dbWOWScore
  //.orderBy("WOWGame2", "Desc").orderBy("TimeGetGame2", "Desc")
  .orderBy('WOWGame2','desc')
  .orderBy('TimeGetGame2','asc')
  .limit(70).get().then((snapshot)=> {
    snapshot.forEach(doc=> {
    	//console.log(doc.data());
    	i = i+1;
      	if(doc.data().LineID==sessionStorage.getItem("LineID")) {
			str += '<div class="box-5h4" onclick="LeaderBoard(\''+ doc.data().LineID +'\','+i+')">';
			str += '<div style="width:60px;text-align: center;float: left;">';
			str += '<img src="'+doc.data().LinePicture+'" class="imgprofile-ss" style="width:50px;"></div>';
			str += '<div class="box-5h-name1">'+doc.data().LineName+'<br>'+doc.data().EmpName+'</div>';
			str += '<div class="number5">'+(doc.data().WOWGame2).toFixed(0)+'<div class="font9-w">WOW</div></div>';
			str += '<div class="box-5h-number1"><img src="./img/w-wow2.png" width="40">';
			str += '<div class="number4">'+i+'</div></div>';
			str += '</div>';
      	} else if(i >= 1 && i <= 10) {
			str += '<div class="box-5h1" onclick="LeaderBoard(\''+ doc.data().LineID +'\','+i+')">';
			str += '<div style="width:60px;text-align: center;float: left;">';
			str += '<img src="'+doc.data().LinePicture+'" class="imgprofile-ss"></div>';
			str += '<div class="box-5h-name1">'+doc.data().LineName+'<br>'+doc.data().EmpName+'</div>';
			str += '<div class="number5">'+(doc.data().WOWGame2).toFixed(0)+'<div class="font9-w">WOW</div></div>';
			str += '<div class="box-5h-number1"><img src="./img/w-wow2.png" width="40">';
			str += '<div class="number4">'+i+'</div></div>';
			str += '</div>';
      	} else if(i >= 11 && i <= 30) {
			str += '<div class="box-5h2" onclick="LeaderBoard(\''+ doc.data().LineID +'\','+i+')">';
			str += '<div style="width:60px;text-align: center;float: left;">';
			str += '<img src="'+doc.data().LinePicture+'" class="imgprofile-ss"></div>';
			str += '<div class="box-5h-name1">'+doc.data().LineName+'<br>'+doc.data().EmpName+'</div>';
			str += '<div class="number5">'+(doc.data().WOWGame2).toFixed(0)+'<div class="font9-w">WOW</div></div>';
			str += '<div class="box-5h-number1"><img src="./img/w-wow2.png" width="40">';
			str += '<div class="number4">'+i+'</div></div>';
			str += '</div>';
      	} else if(i >= 31 && i <= 50) {
			str += '<div class="box-5h3" onclick="LeaderBoard(\''+ doc.data().LineID +'\','+i+')">';
			str += '<div style="width:60px;text-align: center;float: left;">';
			str += '<img src="'+doc.data().LinePicture+'" class="imgprofile-ss" style="width:50px;"></div>';
			str += '<div class="box-5h-name1">'+doc.data().LineName+'<br>'+doc.data().EmpName+'</div>';
			str += '<div class="number5">'+(doc.data().WOWGame2).toFixed(0)+'<div class="font9-w">WOW</div></div>';
			str += '<div class="box-5h-number1"><img src="./img/w-wow2.png" width="40">';
			str += '<div class="number4">'+i+'</div></div>';
			str += '</div>';
      	} else {
			str += '<div class="box-5h" onclick="LeaderBoard(\''+ doc.data().LineID +'\','+i+')">';
			str += '<div style="width:60px;text-align: center;float: left;">';
			str += '<img src="'+doc.data().LinePicture+'" class="imgprofile-ss" style="width:50px;"></div>';
			str += '<div class="box-5h-name1">'+doc.data().LineName+'<br>'+doc.data().EmpName+'</div>';
			str += '<div class="number5">'+(doc.data().WOWGame2).toFixed(0)+'<div class="font9-w">WOW</div></div>';
			str += '<div class="box-5h-number1"><img src="./img/w-wow2.png" width="40">';
			str += '<div class="number4">'+i+'</div></div>';
			str += '</div>';
      	}
		$("#DisplayBoard").html(str);
    });
  });
}


/*
const loadmore = document.querySelector('#loadmore');
let currentItems = 8;
loadmore.addEventListener('click', (e) => {
    const elementList = [...document.querySelectorAll('.list .list-element')];
    for (let i = currentItems; i < currentItems + 8; i++) {
        if (elementList[i]) {
            elementList[i].style.display = 'block';
        }
    }
    currentItems += 8;
    // Load more button will be hidden after list fully loaded
    if (currentItems >= elementList.length) {
        event.target.style.display = 'none';
    }
})
*/

function LeaderBoard(x,y) {
	//alert(x);
	var str = "";
  	$("#UserScore").html(cleararray); 
	//dbCheck.where(firebase.firestore.FieldPath.documentId(), "==", x)
	dbCheck.where('LineID','==',x)
  	.limit(1).get().then((snapshot)=> {
	//.get().then((snapshot)=> {
		snapshot.forEach(doc=> {
			OpenYoueScore(doc.data().LineID);
			CheckYourScore(doc.data().LineID);
			//OpenYoueScore(doc.data().LineID);
			str += '<div class="profile-user"><div style="margin-top:15px;"><img src="'+ doc.data().LinePicture +'" class="imgprofile-leader"></div>';
			str += '<div class="profile-level"><div class="profile-numberlevel">'+ y +'</div>';
			str += '<div class="profile-textlevel">Rank</div></div>';
			str += '</div><div class="clr" style="height:10px;"></div>';
			str += '<div class="NameLine">'+ doc.data().LineName+'</div>';
			str += '<div class="game-txt">'+ doc.data().EmpName+'</div>';
			str += '<div class="clr"></div>';
		});
		$("#UserScore").html(str);  
	});
	document.getElementById("id01").style.display = "block";
}



function CheckYourScore(x) {
  dbWOWScore.where('LineID','==',x)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
		EidWOWScore = doc.id;
		sWOWGame2 = doc.data().WOWGame2;
		sUserSumTrue = doc.data().UserSumTrue;
		sUserSumFalse = doc.data().UserSumFalse;
		sUserSumQuiz = doc.data().UserSumQuiz;
		sJoinTime = doc.data().JoinTime;
		//alert(sUserSumTrue+="|||"+sUserSumFalse+"|||"+sUserSumQuiz);
		var sTrue = (parseFloat(sUserSumTrue)/parseFloat(sUserSumQuiz)) *100;
		var sFalse = (parseFloat(sUserSumFalse)/parseFloat(sUserSumQuiz))*100;
	    $("#ShowJoinTime").html('<div class="box-wow-number2">'+sJoinTime+'</div>'); 
	    $("#ShowRatioTrue").html('<div class="box-wow-number2">'+sTrue.toFixed(2)+'</div>'); 
	    $("#ShowRatioFalse").html('<div class="box-wow-number2">'+sFalse.toFixed(2)+'</div>'); 
	    $("#ShowWOWGame2").html('<div class="box-wow-number2">'+sWOWGame2+'</div>'); 
    });
  });
}


function OpenYoueScore(x) {
  $("#DisplayYourScore").html(cleararray); 
  var str = "";
  i = 0;
  str += '<div class="table-responsive" style="margin-top:20px;">';
  str += '<table class="table"><thead><tr><th scope="col" style="text-align: center;">#</th>';
  str += '<th scope="col" style="text-align: center;">วันที่</th><th scope="col" style="text-align: center;">ผลการตอบ</th>';
  str += '<th scope="col" style="text-align: center;">WOW</th>';
  str += '</tr></thead><tbody>';
  dbCheck.where('GroupQuiz','==',sGroupQuiz)
  .where('LineID','==',x)
  .orderBy('TimeStamp','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
    	i = i+1;
		str += '<tr><th scope="row" style="text-align:center;width:50px;">'+i+'</th>';
		str += '<td>'+doc.data().QuizDate+'</td><td>'+doc.data().ResultQuiz+'</td>';
		str += '<td>'+doc.data().PointIN+'</td></tr>';
    });
	  str += '</tbody></table></div>';
	  $("#DisplayYourScore").html(str);
  });
}



/*
function GetBadgeUser(x) {
	var i = 0;
	var str = "";
	UserBadgeArr = [];
	UserBadgeArr1 = [];
  	dbBadgeUser.where('LineID','==',x)
	.get().then((snapshot)=> {
		snapshot.forEach(doc=> {
			if(doc.data().BadgeEnd=1) {
				UserBadgeArr1.push(doc.data().BadgeEng);
			}
			UserBadgeArr.push([doc.data().BadgeEng, doc.id, doc.data().BadgeTime, doc.data().BadgeEnd]);
		});
		AllBadge();
	});
}



var calbar = 0;
var sBadge = "";
function AllBadge() {
	$("#DisplayRatio").html(cleararray);
	var i = 0;
	var str = "";
  	dbBadgeGame.orderBy('BadgeNo','asc')
	.get().then((snapshot)=> {
		snapshot.forEach(doc=> {
			BadgeArr1.push(doc.data().BadgeEng);
			BadgeArr.push([doc.data().BadgeEng, doc.id, doc.data().BadgeTh, doc.data().BadgeImg, doc.data().BadgeDetail, doc.data().BadgeTarget, doc.data().memo, doc.data().BadgePoint, doc.data().BonusPoint]);

			if(UserBadgeArr1.indexOf(doc.data().BadgeEng)>=0) {
				calbar = (UserBadgeArr[UserBadgeArr1.indexOf(doc.data().BadgeEng)][2]/doc.data().BadgeTarget)*100;
				if(calbar>100) { calbar = 100; }
				if(UserBadgeArr[UserBadgeArr1.indexOf(doc.data().BadgeEng)][3]==1) {
					sBadge += '<div class="box-listuser">';
					sBadge += '<div style="width:15%;float:left;text-align:center;padding-top:3px;"><img src="'+ doc.data().BadgeImg +'" width="40px;"></div>';
					sBadge += '<div style="width:80%;padding:4px;float:left;"><div class="box-listtext" style="padding-left:6px;">'+ doc.data().BadgeTh +'</div>';
					sBadge += '<div class="progress-bar">';
					sBadge += '<div class="progress" data-percent="70" data-color="green" style="width:'+calbar+'%;background:#0056ff;"><span>'+calbar+'%</span></div>';
					sBadge += '</div></div></div>';
				} else {
					sBadge += '<div class="box-listuser">';
					sBadge += '<div style="width:15%;float:left;text-align:center;"><img src="'+ doc.data().BadgeImg +'" width="40px;"></div>';
					sBadge += '<div style="width:80%;padding:4px;float:left;"><div class="box-listtext" style="padding-left:6px;">'+ doc.data().BadgeTh +'</div>';
					sBadge += '<div class="progress-bar">';
					sBadge += '<div class="progress" data-percent="70" data-color="green" style="width:'+calbar+'%;background:#f68b1f;"><span>'+calbar+'%</span></div>';
					sBadge += '</div></div></div>';
				}
			}
			i = i+1;
		});
		$("#DisplayRatio").html('<div style="width:95%;margin:10px auto;">'+sBadge+'</div>'); 
		sBadge = "";
	});
}
*/




function CloseAll() {
	$("#DisplayRatio").val(cleararray);
	$("#DisplayRatio").html(cleararray); 
  	document.getElementById('id01').style.display='none';
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
