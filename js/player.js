var dTable = "";
var dataSet = "";
var dataSrc = [];
var count = 0;
var sStatusOrder = 0;
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var _0x2223a8=_0x4a06;function _0x4a06(_0x58d05f,_0x37522b){var _0x51897b=_0x5189();return _0x4a06=function(_0x4a065c,_0x574a38){_0x4a065c=_0x4a065c-0xa6;var _0x5ad908=_0x51897b[_0x4a065c];return _0x5ad908;},_0x4a06(_0x58d05f,_0x37522b);}function _0x5189(){var _0x4c9d9a=['1193208OLbmRR','retailproject-6f4fc.firebaseapp.com','793537bcfEnc','1029280khHJRm','AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE','3048VLbdVv','retailproject-6f4fc','653667385625','15090327YLbHCA','3241BeunWp','20392sIqUAD','retailproject-6f4fc.appspot.com','380qTLowL','1133772GbhIaw','G-9SKTRHHSW9'];_0x5189=function(){return _0x4c9d9a;};return _0x5189();}(function(_0xd95154,_0xe1abc4){var _0xb84bf7=_0x4a06,_0x110b75=_0xd95154();while(!![]){try{var _0x27bd57=-parseInt(_0xb84bf7(0xab))/0x1+-parseInt(_0xb84bf7(0xa9))/0x2+-parseInt(_0xb84bf7(0xa7))/0x3+-parseInt(_0xb84bf7(0xb3))/0x4*(-parseInt(_0xb84bf7(0xa6))/0x5)+parseInt(_0xb84bf7(0xae))/0x6*(parseInt(_0xb84bf7(0xb2))/0x7)+-parseInt(_0xb84bf7(0xac))/0x8+parseInt(_0xb84bf7(0xb1))/0x9;if(_0x27bd57===_0xe1abc4)break;else _0x110b75['push'](_0x110b75['shift']());}catch(_0x436a60){_0x110b75['push'](_0x110b75['shift']());}}}(_0x5189,0x624c6));var firebaseConfig={'apiKey':_0x2223a8(0xad),'authDomain':_0x2223a8(0xaa),'projectId':_0x2223a8(0xaf),'storageBucket':_0x2223a8(0xb4),'messagingSenderId':_0x2223a8(0xb0),'appId':'1:653667385625:web:a5aed08500de80839f0588','measurementId':_0x2223a8(0xa8)};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore().collection("WOWScore");
var dateString="";


//SelectMeunu();
loadData();

//function SelectMeunu() {
//  var x = document.getElementById("ClickMenu").value;
//  loadData(x);
//}


function loadData(){
  //alert(x);
  var i = 0;
  count = 0;
  dataSet = "";
  dataSrc = [];

  db.orderBy('EmpID','asc')
  //.limit(20)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = (i+1);
      var sImg = "";
      var RatioQuiz = (((doc.data().UserSumTrue/(doc.data().UserSumTrue+doc.data().UserSumFalse))*100).toFixed(2))+"%";
      if(doc.data().LinePicture !== null) {
        sImg = '<img src="'+ doc.data().LinePicture +'" class="imgprofile-sss">';
      }
      var dataSet = [sImg, doc.data().LineName, doc.data().WOWGame1, doc.data().WOWGame2, doc.data().WOWScore, RatioQuiz , "<div class='btn-t1 btn-add' id="+i+">คลิก</div>" , doc.id, i];
      dataSrc.push(dataSet);
      count++;
    }); 
    //alert(count);
    //console.log("Select : "+ sStatusOrder +" | จำนวน "+ count + " ข้อมูล");
    document.getElementById('loading').style.display = 'none';
    //document.getElementById('OpenData').style.display = 'block';

    dTable=$('#ex-table').DataTable({

      "bDestroy": true,    
      data: dataSrc,
      columns: [
        { title: "รูป", className: "txt-center" },
        { title: "Line Name" },
        { title: "พิชิต WOW", className: "txt-center" },
        { title: "แฟนพันธุ์แท้", className: "txt-center" },
        { title: "คะแนนรวม", className: "txt-center" },
        { title: "%ตอบถูก", className: "txt-center" }
        ],
/*
        dom: 'lfrtipB',
        buttons: [
            'copy', 'excelFlash', 'excel', 'pdf', 'print'
        ],
*/
          lengthMenu: [[30, 50, 100, -1], [30, 50, 100, "All"]],

          columnDefs: [ { type: 'number', 'targets': [4] } ],
          order: [[ 4, 'desc' ]]
        //dom: 'Bfrtip', buttons: [ 'copy', 'csv', 'excel', 'pdf', 'print' ]
      });   
      $('#ex-table tbody').on( 'click', 'tr', function () {
        var data = dTable.row( $(this).parents('tr') ).data();
        if(count!=0) {
            //ClickID(dTable.row( this ).data()[7],dTable.row( this ).data()[8]);
        }
        //console.log(dTable.row( this ).data()[6]);
      });
  });
  $('#ex-table').DataTable().destroy();
  $("#ex-table tbody").remove();
}


var Eid = "";
function ClickID(x,id) {
  var sid = id;
  //alert(x+"==="+id);
  var str = "";
  db.where(firebase.firestore.FieldPath.documentId(), "==", x)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      Eid = doc.id;
      str += '<div><div style="padding:10px;color:#000000;font-size:14px;font-weight:600;">ขอสิทธิ์เข้าใช้ระบบงาน</div>';
      str += '<div><img src="'+ doc.data().LinePicture +'" style="max-width:120px;"></div>';
      str += '<div style="padding:8px; font-weight: 600; color:#0056ff;">'+ doc.data().empID +'<br>'+ doc.data().empName +'<br>'+ doc.data().empRH +' / '+ doc.data().empBr +'</div>';
      if(doc.data().statusconfirm==1) {
        str += '<div style="color:#000000;font-weight:600;font-size:14px;">คุณได้รับอนุมัติแล้ว</div><div class="clr"></div>';
        str += '<div class="btn-t3" onclick="CancelRead(\''+ sid +'\')" style="width:140px;">ยกเลิกสิทธืิ์</div>';
        str += '<div class="btn-t4" onclick="DeleteRead(\''+ sid +'\')" style="width:140px;">ลบรายการ</div><div class="clr"></div>';
        str += '<div class="btn-t2" onclick="CloseAll()" style="width:140px;">ปิดหน้าต่าง</div>';
      } else if(doc.data().statusconfirm==9) {
        str += '<div style="color:#ff0000;font-weight:600;font-size:14px;">คุณไม่ได้รับอนุมัติ</div><div class="clr"></div>';
        str += '<div class="btn-t1" onclick="ConfirmRead(\''+ sid +'\')" style="width:140px;">อนุมัติสิทธิ์</div><div class="clr"></div>';
        str += '<div class="btn-t2" onclick="CloseAll()" style="width:140px;">ปิดหน้าต่าง</div>';
      } else if(doc.data().statusconfirm==2) {
        str += '<div style="color:#f68b1f;font-weight:600;font-size:14px;">รอการอนุมัติ</div><div class="clr"></div>';
        str += '<div class="btn-t1" onclick="ConfirmRead(\''+ sid +'\')" style="width:140px;">อนุมัติ</div>';
        str += '<div class="btn-t3" onclick="CancelRead(\''+ sid +'\')" style="width:140px;">ไม่อนุมัติ</div><div class="clr"></div>';
        str += '<div class="btn-t4" onclick="DeleteRead(\''+ sid +'\')" style="width:140px;">ลบรายการ</div>';
        str += '<div class="btn-t2" onclick="CloseAll()" style="width:140px;">ปิดหน้าต่าง</div>';
      }
      str += '</div><dic class="clr" style="height:30px;"></div>';
    });
      $("#DisplayByItem").html(str);
      str = "";
      document.getElementById("id01").style.display = "block";
  });
}


function ConfirmRead(id) {
  document.getElementById(id).style.display = "none";
  var a1 = 1;
  db.doc(Eid).update({
      statusconfirm : parseInt(a1)
  });
  Eid = "";
  document.getElementById("id01").style.display = "none";
}


function CancelRead(id) {
  document.getElementById(id).style.display = "none";
  //alert("Cancel "+id);
  var a1 = 9;
  db.doc(Eid).update({
      statusconfirm : parseInt(a1)
  });
  Eid = "";
  document.getElementById("id01").style.display = "none";
}


function DeleteRead(id) {
  document.getElementById(id).style.display = "none";
  //alert("Cancel "+id);
  db.doc(Eid).delete();
  Eid = "";
  document.getElementById("id01").style.display = "none";
}


/*
function SendGift(x,id) {
  document.getElementById(id).style.display = "none";
	//alert(x+"==="+EidStockList);
  dbStockList.doc(EidStockList).update({
    StatusOrder : 1,
    DateSend : dateString
  });
}
*/

function CloseAll() {
  document.getElementById('id01').style.display='none';
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
  //alert(GetNewDate);
  //console.log(day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm);
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}

