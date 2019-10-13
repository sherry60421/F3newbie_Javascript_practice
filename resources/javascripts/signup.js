// 驗證註冊表單
function validateData(form){
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
}
