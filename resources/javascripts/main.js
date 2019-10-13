// Vue
var app = new Vue({
  el : "#mainData",
  data : {
    tableVisible : false,
    tableData : []
  },
  methods : {
    getHobbies : function(row, column, codeList, index){ // 從興趣代號列表對應到中文並串起來
      var result = codeList.filter(function(code){
        return hobbiesMap[code] !== undefined;
      }).map(function(code, index){
        return hobbiesMap[code];
      }).reduce(function(result, text){
        return result + ', ' + text;
      });
      return result;
    }
  }
});
var hobbiesMap = { // 興趣代碼與中文對應
  "0" : "唱歌",
  "1" : "追劇",
  "2" : "看書",
  "3" : "睡覺",
  "4" : "寫程式",
  "5" : "旅行"
};
// 因為一進來就會做會員資料查詢，故將loading block調為可見
document.querySelector('.block').style.visibility = 'visible';

// 檢查index頁有無帶入會員name進來，若沒有，要跳回index並要求要先登入
// 因為IE開本機HTML時無法使用localStorage，若localStorage不存在，暫時把這邊的功能拿掉
if(localStorage && !localStorage.getItem('name')){
  alert('請先登入');
  window.location.href = 'index.html';
}
// 成功取得index帶入的會員name，寫到畫面上
var sayHello = document.getElementById('sayHello');
sayHello.innerText = 'Hello, ' + (localStorage ? localStorage.getItem('name') : '');

// 點擊[登出]，清除index帶入的來源儲存體
var logoutButton = document.getElementById('logout');
logoutButton.addEventListener("click", function(){
  if(localStorage){
      localStorage.removeItem('name');
  }
  window.location.href = 'index.html';
});

// 取得會員資料寫入畫面
var mainData = document.getElementById('mainData');
$.ajax({
    url : 'https://f3newbie2019-cba43.firebaseapp.com/getMembers',
    method : 'POST'
  })
  .done(function(data) {
    if(!data || data.returnCode === '*'){
      alert(data.message);
      return;
    }
    app.tableData = data.result;
    app.tableVisible = true;
    document.querySelector('.block').style.visibility = 'hidden';
  })
  .fail(function() {

  })
  .always(function() {

  });

// 從興趣代號列表對應到中文並串起來
function getHobbies(codeList){
  var result = codeList.filter(function(code){
    return hobbiesMap[code] !== undefined;
  }).map(function(code, index){
    return hobbiesMap[code];
  }).reduce(function(result, text){
    return result + ', ' + text;
  });
  return result;
}
