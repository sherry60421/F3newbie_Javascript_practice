var loginButton = document.getElementById('login');
// 監聽按鈕[登入]的click
loginButton.addEventListener("click", function(){
  // id/password必填之驗證
  var id = document.getElementById('inputID').value;
  var password = document.getElementById('inputPassword').value;
  if(!id || !password){
    alert('請輸入帳號與密碼');
    return;
  }
  // 取得 是否勾選[記得我]
  var isRemember = document.querySelector('[name="remember-me"]').checked;
  login(id, password, isRemember);
});

// 登入
function login(id, password, isRemember){
  // 呼叫遠端檢查會員資料
  $.ajax({
      url : 'https://f3newbie2019-cba43.firebaseapp.com/checkMember',
      data : { 'id' : id, 'password': password },
      method : 'POST',
      beforeSend : function(){
        // loading block調成可見
        document.querySelector('.block').style.visibility = 'visible';
      }
    })
    .done(function(data) {
      if(!data || data.returnCode === '*'){ // 登入時有非預期異常
        alert(data.message);
        return;
      }
      if(data.isMember){ // 是會員且密碼正確
        if(localStorage){
          // 下一個頁面的name可以帶出登入者名稱
          localStorage.setItem('name', data.name);
        }
        window.location.href = 'main.html';
      } else { // 非會員或密碼錯誤
        alert(data.message);
      }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      alert(errorThrown);
    })
    .always(function() {
      document.querySelector('.block').style.visibility = 'hidden';// 結束呼叫後loading block調成不可見
    });
}
