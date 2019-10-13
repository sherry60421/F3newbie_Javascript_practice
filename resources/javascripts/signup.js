//取得[送出]按鈕
var submitButton = document.getElementsByName('submit')[0];
//添加click事件的handler
submitButton.addEventListener("click", function(){
  var form = document.getElementById('form');
  var data;
  try{
     data = validateAndGetData(form);
  } catch(e){
    alert(e);
    return;
  }
  // 進行遠端呼叫來新增註冊會員資料
  $.ajax({
      url : 'https://f3newbie2019-cba43.firebaseapp.com/addMember',
      data : data,
      method : 'POST',
      beforeSend : function(){
        // loading block調成可見
        document.querySelector('.block').style.visibility = 'visible';
      }
    })
    .done(function(data) {
      if(!data || data.returnCode === '*'){ // 回傳異常
        alert(data.message);
        return;
      } else{ // 回傳正常
        alert(data.message);
        window.location.href = 'index.html';
      }
    })
    .fail(function(jqXHR, textStatus, errorThrown) { // 呼叫異常
      alert(errorThrown);
    })
    .always(function() {
      document.querySelector('.block').style.visibility = 'hidden'; // 結束呼叫後loading block調成不可見
    });
});

//驗證註冊表單並取得資料
function validateAndGetData(form){
  var id = form.elements.namedItem('id').value;
  if(id.length !== 6 || id.indexOf(' ') > -1){
    throw '帳號請輸入六碼工號';
  }
  var password = form.elements.namedItem('password').value;
  if(password.length < 7 || password.indexOf(' ') > -1){
    throw '密碼最少要有七碼，且不能有空白字';
  }
  var passwordConfirm = form.elements.namedItem('passwordConfirm').value;
  if(password !== passwordConfirm){
    throw '密碼需輸入一致';
  }
  var name = form.elements.namedItem('name').value;
  if(name.length < 1 || name.indexOf(' ') > -1){
    throw '請輸入名稱';
  }
  var birthday = form.elements.namedItem('birthday').value;
  if(birthday.length !== 10){
    throw '生日格式有誤';
  }
  var hobbies = Array.from(form.elements.namedItem('hobbies[]')); // IE不能使用
  var checkedHobbies = hobbies.filter(function(h){
    return h.checked;
  });
  if(checkedHobbies.length < 1 || checkedHobbies.length > 3){
    throw '興趣請選1~3項';
  }
  var checkedHobbiesValue = checkedHobbies.map(function(e){
    return e.value;
  });
  // getdata
  var data = {
    "id" : id,
    "password" : password,
    "name" : name,
    "birthday" : birthday,
    "hobbies" : checkedHobbiesValue
  };
  return data;
}
