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
    mainData.innerHTML = getTableHTML(data.result);
    document.querySelector('.block').style.visibility = 'hidden';
  })
  .fail(function() {

  })
  .always(function() {

  });

// 將會員資料組成HTML
function getTableHTML(dataList){
  var header = '<tr><th>帳號</th><th>名稱</th><th>生日</th><th>興趣</th></tr>';
  var list = '';
  if(dataList.length === 0){
    list = '<td colspan="4">查無資料</th>';
  } else{
    dataList.forEach(function(element){
      list += ('<tr><td>' + element.id + '</td>' + '<td>' + element.name + '</td>'
              + '<td>' + element.birthday + '</td>' + '<td>' + getHobbies(element.hobbies) + '</td></tr>');
    });
  }
  return '<table class="table table-striped"><thead>' + header + '</thead><tbody>' + list + '</tbody></table>';
}

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
