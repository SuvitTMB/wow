var i = 0;
var cleararray = "";
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
var sGroupQuiz = "WOW-Share";
var sBadgeEng = "Badge-WOWShare"; //ชื่อ badge
var EidBadgeGameUser = "";


$(document).ready(function () {
	if(sessionStorage.getItem("LineID")==null) { location.href = "index.html"; }
	LoadFirebase();
	LoadProfile();
	CheckGetBadge();
	CheckGetBadgeUser();
});
 

function LoadFirebase() {
	firebaseConfig = {
		apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
		authDomain: "retailproject-6f4fc.firebaseapp.com",
		databaseURL: "https://retailproject-6f4fc-default-rtdb.firebaseio.com",
		projectId: "retailproject-6f4fc",
		storageBucket: "retailproject-6f4fc.appspot.com",
		messagingSenderId: "653667385625",
		appId: "1:653667385625:web:a5aed08500de80839f0588",
		measurementId: "G-9SKTRHHSW9"
	};
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
	dbWOWScore = firebase.firestore().collection("WOWScore");
	dbBadgeGame = firebase.firestore().collection("BadgeGame");
	dbBadgeUser = firebase.firestore().collection("BadgeUser");
}

var sWOWGame1Check = 0;
var CheckPoint = 0;
var WOWPoint = 200;
function LoadProfile() {
  //alert(sessionStorage.getItem("LineID"));
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
		sWOWGame1Check = doc.data().WOWGame1Check;

		CheckPoint = 0;
		if(sShowIMG11 != "") {
			CheckPoint = CheckPoint+25;
			$("#WOW1").html('<div style="padding-top:4px;"><img src="./img/true.png" width="40%"></div>'); 
			document.getElementById("View2").style.display = "block";
		} else {
			$("#WOW1").html('<div style="padding-top:4px;"><img src="./img/false.png" width="40%"></div>'); 
			document.getElementById("View1").style.display = "block";
		}
		if(sShowIMG22 != "") {
			CheckPoint = CheckPoint+25;
			$("#WOW2").html('<div style="padding-top:4px;"><img src="./img/true.png" width="40%"></div>'); 
			document.getElementById("View4").style.display = "block";
		} else {
			$("#WOW2").html('<div style="padding-top:4px;"><img src="./img/false.png" width="40%"></div>'); 
			document.getElementById("View3").style.display = "block";
		}
		if(sShowIMG33 != "") {
			CheckPoint = CheckPoint+25;
			$("#WOW3").html('<div style="padding-top:4px;"><img src="./img/true.png" width="40%"></div>'); 
			document.getElementById("View6").style.display = "block";
		} else {
			$("#WOW3").html('<div style="padding-top:4px;"><img src="./img/false.png" width="40%"></div>'); 
			document.getElementById("View5").style.display = "block";
		}
		if(sShowIMG44 != "") {
			CheckPoint = CheckPoint+25;
			$("#WOW4").html('<div style="padding-top:4px;"><img src="./img/true.png" width="40%"></div>'); 
			document.getElementById("View8").style.display = "block";
		} else {
			$("#WOW4").html('<div style="padding-top:4px;"><img src="./img/false.png" width="40%"></div>'); 
			document.getElementById("View7").style.display = "block";
		}

		if(CheckPoint==100) {
			/*
			if(sWOWScore==0) {
				NewDate();
				var TimeStampDate = Math.round(Date.now() / 1000);
				dbWOWScore.doc(EidWOWScore).update({
					TimeGetGame1 : TimeStampDate,
					TimeDateGame1 : dateString,
					WOWGame1 : parseFloat(WOWPoint),
					WOWScore : sWOWScore+parseFloat(WOWPoint)
				});
			}
			*/
			if(sWOWGame1Check==1) {
				$("#CheckConfirmMission").html('<div class="btn-t4">สถานะ : ผ่านการตรวจสอบแล้ว</div>'); 
			} else {
				$("#CheckConfirmMission").html('<div class="btn-t5">สถานะ : อยู่ระหว่างการตรวจสอบข้อมูล</div>'); 
			}

			$("#WOW5").html('<div class="box-wow-number">'+WOWPoint+'</div>'); 


		} else {
			$("#WOW5").html('<div class="box-wow-number1">'+WOWPoint+'</div>'); 
		}
    });
    if(EidWOWScore=="") {
    	//alert("Add New");
      	AddNewWOWPoint();
    }
  });
}



var sAllTrue = 0;
var sAllFalse = 0;
var sAllSum = 0;
var sBadgeTarget = 0;
var EidBadgeGame = "";
function CheckGetBadge() {
    dbBadgeGame.where('BadgeEng','==',sBadgeEng)
    .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidBadgeGame = doc.id;
      sBadgeImg = doc.data().BadgeImg;
      sBadgeTh = doc.data().BadgeTh;
      sBadgeTarget = doc.data().BadgeTarget;
      sBadgePoint = doc.data().BadgePoint;
      sBonusPoint = doc.data().BonusPoint;
      sSumGetBadge = doc.data().SumGetBadge;
      sSumGetBadgeEnd = doc.data().SumGetBadgeEnd;
      sAllTrue = doc.data().AllTrue;
      sAllFalse = doc.data().AllFalse;
      sAllSum = doc.data().AllSum;
    });
    //alert("Badge="+sBadgeEng+" Target="+sBadgeTarget+", BadgePoint="+sBadgePoint+" BounsPoint="+sBonusPoint);
  }); 
}

var CheckBadge = 0;
var sBadgeTime = 0;
var sBadgeTrue = 0;
var sBadgeFalse = 0;
var sBadgeEnd = 0;
var EidBadgeGameUser = "";
var dateString = "";
function CheckGetBadgeUser() {
	NewDate();
	var TimeStampDate = Math.round(Date.now() / 1000);
	//alert("CheckGetBadgeUser");
    var sGet = 0; 
    dbBadgeUser.where('LineID','==',sessionStorage.getItem("LineID"))
    .where('BadgeEng','==',sBadgeEng)
    .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckBadge = 1;
      EidBadgeGameUser = doc.id;
      sBadgeTime = doc.data().BadgeTime;
      sBadgeEnd = doc.data().BadgeEnd;
    });
      //alert("BadgeTime="+sBadgeTime+" ||| BadgeTarget="+sBadgeTarget);

    if(sBadgeEnd==0) {
    	//alert("BadgeEnd="+sBadgeEnd);
      if(sBadgeTime>=sBadgeTarget) {
        //alert("EidWOWScore="+EidWOWScore);
		dbWOWScore.doc(EidWOWScore).update({
			WOWGame1 : parseFloat(sBonusPoint),
			WOWScore : sWOWScore+parseFloat(sBonusPoint),
			TimeGetGame1 : TimeStampDate,
			TimeDateGame1 : dateString
			//WOWGame1 : parseFloat(sBonusPoint),
			//WOWScore : parseFloat(sWOWScore)+parseFloat(sBonusPoint),
			//TimeDateGame1 : today
		});
        dbBadgeUser.doc(EidBadgeGameUser).update({
            BadgeEnd : 1,
            BadgeGetDate : today
        });
        dbBadgeGame.doc(EidBadgeGame).update({
            SumGetBadgeEnd : sSumGetBadgeEnd+1
        });


        //AddNewPoint();
        var str="";
        str += '<div style="font-size: 12px;color:#f68b1f;padding-top:10px;line-height: 1.4;font-weight: 600;">';
        str += 'คุณสามารถทำภารกิจการ โชว์ - ใช้ - โพส - แชร์<br>ครบทั้ง '+sBadgeTarget+' รายการแล้ว</div>';
        str += '<div class="font15-blue">รับ WOW พิเศษ '+sBonusPoint+' WOW</div>';
        str += '<div class="font15-blue" style="color:#ff0000;font-size:12px;">หมายเหตุ : หากข้อมูลของคุณไม่ถูกต้องเราจะขอ WOW คืน</div>';
        $("#DisplayBonusPoint").html(str);
        document.getElementById("id08").style.display = "block";
      }
    }
    if(CheckBadge==0) {
      AddBadgeUser();
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
      SumGetBadge : sSumGetBadge,
      BadgeDate : today
    });
    dbBadgeGame.doc(EidBadgeGame).update({
        SumGetBadge : sSumGetBadge+1
    });
    //alert("Add New Badge WOW");
  }
  CheckGetBadgeUser();
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
	  UserSumTrue : 0,
	  UserSumFalse : 0,
	  UserSumQuiz : 0,
      UserCountQuiz : 0,
	  TimeGetGame1 : 0,
	  TimeGetGame2 : 0,
	  TimeDateGame1 : sSpace,
      StartDate : dateString
    });
    LoadProfile();
    //alert("Add New Record");
}



function Upload1() {
	document.getElementById("SelectWOW1").onclick = function(e){
		var input = document.createElement('input');
		input.type = 'file';
		input.onchange = e=> {
			files = e.target.files;
			reader = new FileReader();
			reader.onload = function() {
				document.getElementById("PicWOW1").src = reader.result;
			}
			reader.readAsDataURL(files[0]);
			}
		input.click();
	}
	document.getElementById('Upload1').onclick = function(){
		CallTimeStamp();
		ImgName = sessionStorage.getItem("EmpID")+"-01-"+DateTimeStamp;
		NubWOW = document.getElementById('nubwow').value;
		if(NubWOW=="") {
			alert("กรุณาใส่จำนวน WOW ของคุณก่อนทำรายการต่อไป");
			exit();
		}
		if(document.getElementById("PicWOW1").src=="") {
			alert("Upload ภาพที่ได้ทำการแคปหน้าจอไว้");
			exit();
		}
		var uploadTask = firebase.storage().ref('wow/'+ImgName+".jpg").put(files[0]);
		uploadTask.on('state_changed', function(snapshot){
			var progress = (snapshot.bytesTranferred / snapshot.totalBytes) * 100;
			mission_wow = "<div class='headwow'><u>กิจกรรมที่ 1</u> :  โชว์คะแนน WOW ของคุณ</div>";
			$("#DisplayHeader").html(mission_wow);
			document.getElementById("id01").style.display = "none";
			document.getElementById("id05").style.display = "block";
		},
		function(error) {
			alert('error in save the image');
		},
		function() {
			uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
				dbWOWScore.doc(EidWOWScore).update({
					ShowWOW11 : parseFloat(NubWOW),
					ShowIMG11 : url
				});
				document.getElementById("View1").style.display = "none";
				BadgeUpDate();
				CheckDatabase();
			}
		);
	});
	}
}



function Upload2() {
	document.getElementById("SelectWOW2").onclick = function(e){
		var input = document.createElement('input');
		input.type = 'file';
		input.onchange = e=> {
			files = e.target.files;
			reader = new FileReader();
			reader.onload = function() {
				document.getElementById("PicWOW2").src = reader.result;
			}
			reader.readAsDataURL(files[0]);
		}
		input.click();
	}
	document.getElementById('Upload2').onclick = function(){
		CallTimeStamp();
		ImgName2 = sessionStorage.getItem("EmpID")+"-02-"+DateTimeStamp;
		var CheckWOWexp = $('input[name="WOWexp"]:checked').val();
		if(CheckWOWexp==undefined) {
			alert("คุณต้องตอบคำถาม : คุณเคยมีประสบการณ์แลก WOW มาก่อนหรือไม่");
			exit();
		}
		if(document.getElementById("PicWOW2").src=="") {
			alert("คุณต้อง Upload ภาพที่ได้ทำการแคปหน้าจอไว้");
			exit();
		}
		var uploadTask = firebase.storage().ref('wow/'+ImgName2+".jpg").put(files[0]);
		uploadTask.on('state_changed', function(snapshot){
			var progress = (snapshot.bytesTranferred / snapshot.totalBytes) * 100;
			mission_wow = "<div class='headwow'><u>กิจกรรมที่ 2</u> :  ใช้ WOW ไปแลกของรางวัล</div>";
			$("#DisplayHeader").html(mission_wow);
			document.getElementById("id02").style.display = "none";
			document.getElementById("id05").style.display = "block";
		},
		function(error) {
			alert('error in save the image');
		},
		function() {
			uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
				//ImgUrl2 = url;
				dbWOWScore.doc(EidWOWScore).update({
					ShowWOW22 : parseFloat(CheckWOWexp),
					ShowIMG22 : url
				});
				document.getElementById("View3").style.display = "none";
				BadgeUpDate();
				CheckDatabase();
			}
		);
	});
	}
}


function Upload3() {
	document.getElementById("SelectWOW3").onclick = function(e){
		var input = document.createElement('input');
		input.type = 'file';
		input.onchange = e=> {
			files = e.target.files;
			reader = new FileReader();
			reader.onload = function() {
				document.getElementById("PicWOW3").src = reader.result;
			}
			reader.readAsDataURL(files[0]);
		}
		input.click();
	}
	document.getElementById('Upload3').onclick = function(){
		CallTimeStamp();
		ImgName3 = sessionStorage.getItem("EmpID")+"-03-"+DateTimeStamp;
		var CheckWOWfb = $('input[name="WOWfb"]:checked').val();
		if(CheckWOWfb==undefined) {
			alert("1. คุณเคยแชร์ประสบการณ์แลก WOW ของคุณบน Facebook มาก่อนหรือไม่");
			exit();
		}
		if(document.getElementById("PicWOW3").src=="") {
			alert("2. คุณต้อง Upload ภาพที่ได้ทำการแคปหน้าจอไว้");
			exit();
		}
		var uploadTask = firebase.storage().ref('wow/'+ImgName3+".jpg").put(files[0]);
		uploadTask.on('state_changed', function(snapshot){
			var progress = (snapshot.bytesTranferred / snapshot.totalBytes) * 100;
			mission_wow = "<div class='headwow'><u>กิจกรรมที่ 3</u> :  โพสประสบการณ์ WOW บน FB</div>";
			$("#DisplayHeader").html(mission_wow);
			document.getElementById("id03").style.display = "none";
			document.getElementById("id05").style.display = "block";
		},
		function(error) {
			alert('error in save the image');
		},
		function() {
			document.getElementById("id05").style.display = "block";
			uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
				//ImgUrl3 = url;
				dbWOWScore.doc(EidWOWScore).update({
					ShowWOW33 : parseFloat(CheckWOWfb),
					ShowIMG33 : url
				});
				document.getElementById("View5").style.display = "none";
				BadgeUpDate();
				CheckDatabase();
			}
		);
	});
	}
}


function Upload4() {
	document.getElementById("SelectWOW4").onclick = function(e){
		var input = document.createElement('input');
		input.type = 'file';
		input.onchange = e=> {
			files = e.target.files;
			reader = new FileReader();
			reader.onload = function() {
				document.getElementById("PicWOW4").src = reader.result;
			}
			reader.readAsDataURL(files[0]);
		}
		input.click();
	}
	document.getElementById('Upload4').onclick = function(){
		CallTimeStamp();
		ImgName4 = sessionStorage.getItem("EmpID")+"-04-"+DateTimeStamp;
		var CheckWOWfb = $('input[name="fbshare"]:checked').val();
		if(CheckWOWfb==undefined) {
			alert("1. คุณเคยแชร์เรื่องราวของ ttb บน Facebook มาก่อนหรือไม่");
			exit();
		}
		if(document.getElementById("PicWOW4").src=="") {
			alert("3. คุณต้อง Upload ภาพที่ได้ทำการแคปหน้าจอไว้");
			exit();
		}
		var uploadTask = firebase.storage().ref('wow/'+ImgName4+".jpg").put(files[0]);
		uploadTask.on('state_changed', function(snapshot){
			var progress = (snapshot.bytesTranferred / snapshot.totalBytes) * 100;
			mission_wow = "<div class='headwow'><u>กิจกรรมที่ 4</u> : แชร์/แนะนำ ttb WOW บน FB</div>";
			$("#DisplayHeader").html(mission_wow);
			document.getElementById("id04").style.display = "none";
			document.getElementById("id05").style.display = "block";
		},
		function(error) {
			alert('error in save the image');
		},
		function() {
			uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
				dbWOWScore.doc(EidWOWScore).update({
					ShowWOW44 : parseFloat(CheckWOWfb),
					ShowIMG44 : url
				});
				document.getElementById("View7").style.display = "none";
				BadgeUpDate();
				CheckDatabase();
			}
		);
	});
	}
}



function BadgeUpDate() {
    //alert("BadgeTime="+sBadgeTime);
	sBadgeTime = parseFloat(sBadgeTime) + 1;
	sAllSum = parseFloat(sAllSum) + 1;
	dbBadgeUser.doc(EidBadgeGameUser).update({
		BadgeTime : parseFloat(sBadgeTime)
	});
  	dbBadgeGame.doc(EidBadgeGame).update({
    	AllSum : parseFloat(sAllSum)
  	});
	//alert("BadgeTime = "+sBadgeTime+" ||| AllSum = "+sAllSum);
	CheckGetBadgeUser();
}


function CheckDatabase() {
	LoadProfile();
	CloseAll();
}


function Click1() {
	document.getElementById('ShowUpload1').style.display='block';
	document.getElementById('Upload1').style.display='block';
}

function Click2() {
	document.getElementById('ShowUpload2').style.display='block';
	document.getElementById('Upload2').style.display='block';
}

function Click3() {
	document.getElementById('ShowUpload3').style.display='block';
	document.getElementById('Upload3').style.display='block';
}

function Click4() {
	document.getElementById('ShowUpload4').style.display='block';
	document.getElementById('Upload4').style.display='block';
}


function ClickSend(x) {
	if(x==1) {
		Upload1();
		document.getElementById("id01").style.display = "block";
	} else if(x==2) {
		Upload2();
		document.getElementById("id02").style.display = "block";
	} else if(x==3) {
		Upload3();
		document.getElementById("id03").style.display = "block";
	} else if(x==4) {
		Upload4();
		document.getElementById("id04").style.display = "block";
	}
}



function ClickView(x) {
	var str = "";
	$("#DisplayContent").html(cleararray); 

	if(x==1) {
		str += '<div>';
		str += '<div class="headwow"><u>กิจกรรมที่ 1</u> : โชว์คะแนน WOW ของคุณ</div>';
		str += '<div class="font-black">1. บอกเราหน่อยว่าคุณมีจำนวน WOW เท่าไร</div>';
		str += '<div class="btn-t5">'+sShowWOW11+' WOW</div>';
		str += '<div class="font-black">2. แคปหน้าจอมาให้เราดู (โหลดภาพ)</div>';
		str += '<div style="max-width:390px;"><img src='+sShowIMG11+' width="90%"></div>';
		str += '</div>';
		$("#DisplayContent").html(str); 
		//document.getElementById("id01").style.display = "block";
	} else if(x==2) {
		str += '<div>';
		str += '<div class="headwow"><u>กิจกรรมที่ 2</u> : ใช้ WOW ไปแลกของรางวัล</div>';
		str += '<div class="font-black">1. คุณเคยมีประสบการณ์แลก WOW มาก่อนหรือไม่</div>';
		if(sShowWOW22==1) { 
			str += '<div class="btn-t5">เคยแลกมาแล้ว</div>';
		} else {
			str += '<div class="btn-t5">ยังไม่เคยแลกนะ</div>';
		}
		str += '<div class="font-black">2. แคปหน้าจอมาให้เราดู (โหลดภาพ)</div>';
		str += '<div style="max-width:390px;"><img src='+sShowIMG22+' width="90%"></div>';
		str += '</div>';
		$("#DisplayContent").html(str); 
		//document.getElementById("id02").style.display = "block";
	} else if(x==3) {
		str += '<div>';
		str += '<div class="headwow"><u>กิจกรรมที่ 3</u> : โพสประสบการณ์ WOW บน FB</div>';
		str += '<div class="font-black">1. คุณเคยแชร์ประสบการณ์แลก WOW ของคุณ<br>บน Facebook มาก่อนหรือไม่</div>';
		if(sShowWOW33==1) { 
			str += '<div class="btn-t5">เคยแชร์มาแล้ว</div>';
		} else {
			str += '<div class="btn-t5">ยังไม่เคยแชร์นะ</div>';
		}
		str += '<div class="font-black">2. แคปหน้าจอมาให้เราดู (โหลดภาพ)</div>';
		str += '<div style="max-width:390px;"><img src='+sShowIMG33+' width="90%"></div>';
		str += '</div>';
		$("#DisplayContent").html(str); 
		//document.getElementById("id03").style.display = "block";
	} else if(x==4) {
		str += '<div>';
		str += '<div class="headwow"><u>กิจกรรมที่ 4</u> : แชร์/แนะนำ ttb WOW บน FB</div>';
		str += '<div class="font-black">1. คุณเคยแชร์เรื่องราวของ ttb<br>บน Facebook มาก่อนหรือไม่</div>';
		if(sShowWOW44==1) { 
			str += '<div class="btn-t5">เคยแชร์มาแล้ว</div>';
		} else {
			str += '<div class="btn-t5">ยังไม่เคยแชร์นะ</div>';
		}
		str += '<div class="font-black">2. แคปหน้าจอมาให้เราดู (โหลดภาพ)</div>';
		str += '<div style="max-width:390px;"><img src='+sShowIMG44+' width="90%"></div>';
		str += '</div>';
		$("#DisplayContent").html(str); 
		//document.getElementById("id04").style.display = "block";
	}
  	//if(CheckPoint==1) {
  		document.getElementById('id06').style.display='block';
  	//}
}



function exit() {
	Upload1();
}


function Howtoplay() {
	var str = "";
	str += '<div>';
	str += '<div style="width:100%; text-align:center;"><img src="./img/rule.png" width="150px"></div>';
	str += '<div class="headwow">กติกาและเงื่อนไข<br>ภารกิจพิชิต WOW</div>';
	str += '<div><ul style="text-align:left;">';
	str += '<li>ผู้เข้าร่วมกิจกรรมจะต้องเป็นพนักงานของสายงาน CRBO</li>';
	str += '<li>กิจกรรมจะเริ่มเก็บสะสม WOW ตั้งแต่วันที่ 1-30 ธ.ค. 64 </li>';
	str += '<li>ผู้เข้าร่วมการแข่งขันในภารกิจพิชิต WOW จะต้องทำกิจกรรม 4 กิจกรรมถึงจะได้รับรางวัล 200 WOW</li>';
	str += '<li>ก่อนทำการภารกิจผู้เข้าร่วมการแข่งขันจะต้องทำการแคปหน้าจอตามภารกิจต่าง ๆ ให้ครบก่อนที่จะเข้ามาทำการโหลดรูปภาพลงไปในระบบ</li>';
	str += '<li>ในแต่ละกิจกรรมผู้เข้าทำการแข่งขันจะทำการโหลดรูปภาพได้เพียงครั้งเดียว</li>';
	str += '<li>เมื่อทำรายการครบทุกกิจกรรมแล้ว ผู้เข้าร่วมการแข่งขันจะได้รับ 200 WOW</li>';
	str += '<li>กรณีที่ผู้เข้าร่วมกิจกรรมทำผิดเงื่อนไข จะทำการเรียกคืน WOW จากผู้เข้าร่วมกิจกรรม</li>';
	str += '<li>การเปลี่ยนแปลงเงื่อนไขของกิจกรรมสามารถทำได้ตามความเหมาะสม</li>';
	str += '<li>การโอน WOW ให้กับพนักงานจะแจ้งให้ทราบล่วงหน้าอีกครั้ง</li>';
	str += '<li>การตัดสินของผู้จัดทำถือเป็นที่สิ้นสุด</li>';
	str += '</ul></div>';
	str += '</div>';
	$("#DisplayHowto").html(str); 
  	document.getElementById('id07').style.display='block';
}


function Email() {
	//var str = "";
	//$("#DisplayEmail").html(str); 
  	document.getElementById('Email').style.display='block';
}


function CloseAll() {
  	document.getElementById('id01').style.display='none';
  	document.getElementById('id02').style.display='none';
  	document.getElementById('id03').style.display='none';
  	document.getElementById('id04').style.display='none';
  	document.getElementById('id05').style.display='none';
  	document.getElementById('id06').style.display='none';
  	document.getElementById('id07').style.display='none';
  	document.getElementById('id08').style.display='none';
  	document.getElementById('Email').style.display='none';
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