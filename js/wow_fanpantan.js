var i = 0;
var cleararray = "";
var firebaseConfig, EidWOWScore, dateString;
var sUserSumTrue = 0;
var sUserSumFalse = 0;
var sUserSumQuiz = 0;
var sJoinTime = 0;
var sWOWGame2 = 0;
var sGroupQuiz = "WOW";
var dbCheck = "";
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var sGroupQuiz = "WOW";
var sBadgeEng = "Badge-WOW"; //ชื่อ badge


/*
var ImgName, ImgUrl, NubWOW, mission_wow;
var ImgName2, ImgUrl2, NubWOW2, ImgName3, ImgUrl3, ImgName4, ImgUrl4;
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var firebaseConfig, dbWOWScore, EidWOWScore, dateString;
var sWOWScore = 0;
var sWOWGame1 = 0;
var sWOWGame2 = 0;
var EidWOWScore = "";
var sShowWOW11, sShowIMG11, sShowWOW22, sShowIMG22, sShowWOW33, sShowIMG33, sShowWOW44, sShowIMG44, dateString;
*/


$(document).ready(function () {
  	$("#DisplayEmpName").html("<div class='font13-org'>ข้อมูลของคุณ "+sessionStorage.getItem("EmpName")+"</div>");	
	if(sessionStorage.getItem("LineID")==null) { location.href = "index.html"; }
	LoadFirebase();
	LoadProfile();
	CheckUserQuiz();
	CheckGetBadge();
	GetBadgeUser();
	//document.getElementById('id05').style.display='block';
});
 

var dbBadgeGame = "";
var dbBadgeUser = "";
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
	dbCheck = firebase.firestore().collection("QuizScore");
	dbBadgeGame = firebase.firestore().collection("BadgeGame");
	dbBadgeUser = firebase.firestore().collection("BadgeUser");
	//CheckGetBadge();
}


var sWOWScore = 0;
function LoadProfile() {
  //alert("Load --- "+sessionStorage.getItem("LineID"))
  dbWOWScore.where('LineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
		EidWOWScore = doc.id;
		sWOWGame2 = doc.data().WOWGame2;
		sWOWScore = doc.data().WOWScore;
		sUserSumTrue = doc.data().UserSumTrue;
		sUserSumFalse = doc.data().UserSumFalse;
		sUserSumQuiz = doc.data().UserSumQuiz;
		sJoinTime = doc.data().JoinTime;
		var sTrue = (parseFloat(sUserSumTrue)/parseFloat(sUserSumQuiz)) *100;
		var sFalse = (parseFloat(sUserSumFalse)/parseFloat(sUserSumQuiz))*100;
		if(sJoinTime==undefined) { sJoinTime = 0; }
		if(Number.isNaN(sTrue)) { sTrue = 0; }
		if(Number.isNaN(sFalse)) { sFalse = 0; }
		//alert(sUserSumTrue+="|||"+sUserSumFalse+"|||"+sUserSumQuiz);
	    $("#ShowJoinTime").html('<div class="box-wow-number2">'+sJoinTime+'</div>'); 
	    $("#ShowRatioTrue").html('<div class="box-wow-number2">'+sTrue.toFixed(2)+'</div>'); 
	    $("#ShowRatioFalse").html('<div class="box-wow-number2">'+sFalse.toFixed(2)+'</div>'); 
	    $("#ShowWOWGame2").html('<div class="box-wow-number2">'+sWOWGame2+'</div>'); 
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
      WOWScore : 0,
      WOWGame1 : 0,
      WOWGame1Check : 0,
      WOWGame2 : 0,
	  ShowWOW11 : sSpace,
	  ShowIMG11 : sSpace,
	  ShowWOW22 : sSpace,
	  ShowIMG22 : sSpace, 
	  ShowWOW33 : sSpace,
	  ShowIMG33 : sSpace,
	  ShowWOW44 : sSpace,
	  ShowIMG44 : sSpace,
	  UserSumTrue : 0,
	  UserSumFalse : 0,
	  UserSumQuiz : 0,
      JoinTime : 0,
	  TimeGetGame1 : 0,
	  TimeGetGame2 :0,
	  TimeDateGame1 : sSpace,
      StartDate : dateString
    });
    LoadProfile();
}


var CheckPass = 0;
var LastScore = 0;
function CheckUserQuiz() {
  //alert(today);
  $("#DisplayQuizDate").html("<div class='font15-blue'>คำถามประจำวันที่ : "+ today +"</div>");
  dbCheck.where('GroupQuiz','==',sGroupQuiz)
  .where('QuizDate','==',today)
  .where('LineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckPass = 1;
      Eid = doc.id;
      JoinTime = doc.data().JoinTime;
      LastScore = doc.data().PointIN;
      //alert(sGroupQuiz+"==="+today+"==="+sessionStorage.getItem("LineID")+"==="+LastScore);
  	  $("#DisplayQuizPoint").html("<div>วันนี้คุณทำได้ "+ LastScore +" WOW</div>");
      document.getElementById("View1").style.display = "none";
      document.getElementById("View2").style.display = "block";
      //if(CheckAddEdit!=2) {
      //  $("#DisplaySummary").html("<div class='txt-q'>คำถามประจำวันที่ : "+ today +"</div><div class='txt-qq'>คุณได้เข้าร่วมกิจกรรมนี้ไปแล้วในวันนี้<div>คุณทำคะแนนได้ : <span class='txt-qqq'>"+ parseFloat(doc.data().LastScore).toFixed(2) +"</span> คะแนน</div><div class='btn-t2' onclick='gotoweb()' style='margin-top;25px;'>พรุ่งนี้กลับมาเล่นกันใหม่น้า</div></div>");
      //}
    });
    if(CheckPass==0)  {
      document.getElementById("View1").style.display = "block";
      document.getElementById("View2").style.display = "none";
    }
    /*
    if(CheckPass==0) {
      document.getElementById("id04").style.display = "block";
      CheckAddEdit = 2; // รายการใหม่     
      AddNewUser();
      RandomQuestion();
    }
    */
  });

}


function ClickReady() {
     document.getElementById("id01").style.display = "block";
}



//var BadgeArr = [];
//var BadgeArr1 = [];

var sBadgeEnd = 0;
function GetBadgeUser() {
	var i = 0;
	var str = "";
  	dbBadgeUser.where('LineID','==',sessionStorage.getItem("LineID"))
  	.where('BadgeEng','==',sBadgeEng)
	.get().then((snapshot)=> {
		snapshot.forEach(doc=> {
			GetCount = doc.data().BadgeTime;
			//sBadgeEnd = doc.data().BadgeEnd;
	//alert(sBadgeEnd);
			//alert(GetCount);
		});
		//OpenTarget();
	});
}



function OpenTarget() {
	var i = 0;
	var sMin = GetCount;
	var sMax = sBadgeTarget;
	var str = "";
	var sText = "";
	if(sMin>=sMax) { sMin = sMax; }
	//sText += '<div style="width:260px;">';
    //sText += '<div style="font-size: 15px; color:#0056ff; font-weight: 600;">แฟนพันธุ์แท้ WOW</div>';
	for (let i = 0; i < sMax; i++) {
		if(i<sMin) {
		  	sText += '<div style="float: left;position: relative;margin-top:15px;">';
		  	sText += '<img src="./img/W-1.png" style="width:40px;padding:2px;">';
		  	sText += '<div class="bg-timetojointext">'+ (i+1) +'</div></div>';
		  } else {
		  	sText += '<div style="float: left;position: relative;margin-top:15px;">';
		  	sText += '<img src="./img/W-0.png" style="width:40px;padding:2px;">';
		  	sText += '<div class="bg-timetojointext1">'+ (i+1) +'</div></div>';
		  }
	}	
	var sNumber = (sMin/sMax)*100;
	//sText += '</div>';
	str += '<center><div style="width:100%;padding-top:0px;">';
	//str += '<div style="padding:40px 0 15px 0;"><img src="./img/head-2.png" style="height:45px;"></div>';
	str += '<div class="bg-timetojoin"><div style="width:100%;padding:10px 40px;">'+ sText +'</div>';
	str += '<div class="clr" style="height:20px;"></div><div class="bg-timetojointext2">สำเร็จแล้ว '+ sNumber.toFixed(2) +'%</div>';
	//str += '<div style="color:#fff;">แฟนพันธุ์แท้ WOW</div>';
	str += '</div></div></center>';
	$("#DisplayTimetoJoin").html(str);
	document.getElementById('id03').style.display='block';
}




//var sBadgeEng = "Badge-WOW";
function OpenMyScore() {
  var str = "";
  i = 0;
  str += '<div class="table-responsive" style="margin-top:20px;">';
  str += '<table class="table"><thead><tr><th scope="col" style="text-align: center;">#</th>';
  str += '<th scope="col" style="text-align: center;">วันที่</th><th scope="col" style="text-align: center;">ผลการตอบ</th>';
  str += '<th scope="col" style="text-align: center;">WOW</th>';
  str += '</tr></thead><tbody>';
  dbCheck.where('GroupQuiz','==',sGroupQuiz)
  .where('LineID','==',sessionStorage.getItem("LineID"))
  .orderBy('TimeStamp','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {

    	i = i+1;
		str += '<tr><th scope="row" style="text-align:center;width:50px;">'+i+'</th>';
		str += '<td>'+doc.data().QuizDate+'</td><td>'+doc.data().ResultQuiz+'</td>';
		str += '<td>'+doc.data().PointIN+'</td></tr>';
/*
		str += '<div class="box-5h1" onclick="LeaderBoard(\''+ doc.id +'\','+i+')">';
		str += '<div style="width:60px;text-align: center;float: left;">';
		str += '<img src="'+doc.data().LinePicture+'" class="imgprofile-ss"></div>';
		str += '<div class="box-5h-name1">'+doc.data().LineName+'<br>'+doc.data().EmpName+'</div>';
		str += '<div class="box-5h-number1"><img src="./img/rank-1.png" width="30">';
		str += '</div><div class="number5">'+(doc.data().RewardsXP).toFixed(2)+'p</div></div>';
*/
    });
	  str += '</tbody></table></div>';
	  $("#DisplayMyScore").html(str);
  });
  document.getElementById('id04').style.display='block';
}




var EidBadgeGame = "";
var EidBadgeGame = "";
var EidBadgeGameUser = "";
var sBadgeEnd = 0;
var sBadgeTarget = 0;
var sBadgeTime = 0;
var CheckBadge = 0;
var sBonusPoint = 0;
function CheckGetBadge() {
	NewDate();
	var TimeStampDate = Math.round(Date.now() / 1000);
    dbBadgeGame.where('BadgeEng','==',sBadgeEng)
	    .get().then((snapshot)=> {
	    snapshot.forEach(doc=> {
	      EidBadgeGame = doc.id;
	      sBadgeTarget = doc.data().BadgeTarget;
	      sBonusPoint = doc.data().BonusPoint;
	    });
  	}); 


  	var sGet = 0;     
    dbBadgeUser.where('LineID','==',sessionStorage.getItem("LineID"))
    .where('BadgeEng','==',sBadgeEng)
    .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
	      EidBadgeGameUser = doc.id;
	      sBadgeTime = doc.data().BadgeTime;
	      sBadgeEnd = doc.data().BadgeEnd;
	    });
    	//SumGetBadgeEnd


	    if(sBadgeEnd==0) {
	    	//alert("(3) Line 306 === "+sBadgeEnd);
	      if(sBadgeTime>=sBadgeTarget) {
	      	//alert(sBadgeTarget+"==(4)=="+sBadgeTime);
	        dbBadgeUser.doc(EidBadgeGameUser).update({
	            BadgeEnd : 1,
	            BadgeGetDate : today
	        });

	        //alert(EidWOWScore);
			dbWOWScore.doc(EidWOWScore).update({
				WOWGame2 : parseFloat(sWOWGame2)+parseFloat(sBonusPoint),
				WOWScore : parseFloat(sWOWScore)+parseFloat(sBonusPoint),
				TimeGetGame2 : TimeStampDate
			});

			dbCheck.add({
				GroupQuiz : sGroupQuiz,
				LineID : sessionStorage.getItem("LineID"),
				LineName : sessionStorage.getItem("LineName"),
				LinePicture : sessionStorage.getItem("LinePicture"),
				EmpID : sessionStorage.getItem("EmpID"),
				EmpName : sessionStorage.getItem("EmpName"),
				QuizDate : today,
				LastScore : sWOWScore,
				PointIN : parseFloat(sBonusPoint),
				ResultQuiz : "Bouns",
				TimeStamp : TimeStampDate
				//DateRegister : dateString,
				//TimeGetGame2 : TimeStampDate
				/*
				*/
			});
			//alert("Add dbCheck === QuizScore");
			LoadProfile();
	        document.getElementById("id05").style.display = "block";
	      }
	    }

  	});
}


function AddBadgeUser() {
	if(CheckBadge==0) {
	    dbBadgeUser.add({
			LineID : sessionStorage.getItem("LineID"),
			linename : sessionStorage.getItem("LineName"),
			empPicture : sessionStorage.getItem("LinePicture"),
      		EmpID : sessionStorage.getItem("EmpID"),
      		EmpName : sessionStorage.getItem("EmpName"),
			BadgeEng : sBadgeEng,
			BadgeTime : 0,
			BadgeTrue : 0,
			BadgeFalse : 0,
			BadgeEnd : 0,
			BadgeFalse : 0,
			BadgeTrue : 0,
			BadgeTime : 0,
			SumGetBadge : 0,
			BadgeDate : today
	    });
		//alert("Add New Badge");
	}
}


function Howtoplay() {
	var str = "";
	str += '<div>';
	str += '<div style="width:100%; text-align:center;"><img src="./img/rule.png" width="150px"></div>';
	str += '<div class="headwow">กติกาและเงื่อนไข<br>ภารกิจแฟนพันธุ์แท้</div>';
	str += '<div><ul style="text-align:left;">';
	str += '<li>ผู้เข้าร่วมกิจกรรมจะต้องเป็นพนักงานของสายงาน CRBO</li>';
	str += '<li>กิจกรรมจะเริ่มเก็บสะสม WOW ตั้งแต่วันที่ 1-30 ธ.ค. 64 </li>';
	str += '<li>ภารกิจแฟนพันธุ์แท้ WOW จะมีการแข่งขันเก็บสะสม WOW ทุกวัน ผู้ที่ตอบคำถามได้ถูกต้องรับ WOW สะสมครั้งละ 10 WOW</li>';
	str += '<li>เมื่อผู้แข่งขันเข้าทำการแข่งขันครบ 20 ครั้งรับโบนัส 50 WOW</li>';
	str += '<li>ทุก ๆ WOW ที่สะสมจะถูกจัดอันดับเพื่อหาผู้ที่ทำคะแนนสูงสุด 10 อันดับแรก รับ WOW พิเศษเมื่อจบการแข่งขันอีก 100 WOW</li>';
	str += '<li>กรณีที่ผู้ทำการแข่งขันทำคะแนนได้เท่ากัน ระบบจะคัดเลือกผู้ที่ได้เข้าทำการแข่งขันก่อน</li>';
	str += '<li>กรณีพบปัญหาการใช้งานแจ้งผู้ดูแลระบบดำเนินการแก้ไข</li>';
	str += '<li>ผู้ที่มีสิทธิจะได้รับรางวัลจะต้องเป็นพนักงานของ ttb ในวันที่ทำการโอนคะแนน WOW ให้พนักงาน</li>';
	str += '<li>การเปลี่ยนแปลงเงื่อนไขของกิจกรรมสามารถทำได้ตามความเหมาะสม</li>';
	str += '<li>การโอน WOW ให้กับพนักงานจะแจ้งให้ทราบล่วงหน้าอีกครั้ง</li>';
	str += '<li>การตัดสินของผู้จัดทำถือเป็นที่สิ้นสุด</li>';
	str += '</ul></div>';

	str += '</div>';
	$("#DisplayHowto").html(str); 
  	document.getElementById('id02').style.display='block';
}


function CloseAll() {
  	document.getElementById('id01').style.display='none';
  	document.getElementById('id02').style.display='none';
  	document.getElementById('id03').style.display='none';
  	document.getElementById('id04').style.display='none';
  	document.getElementById('id05').style.display='none';
}



function CallTimeStamp() {
    DateTimeStamp = Math.round(Date.now() / 1000);
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
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}