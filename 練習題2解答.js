// 先建立西元2000~3000的陣列
var yearList = [];
for(var i = 2000; i <= 3000; i++){
  yearList.push(i);
}

var result = yearList.filter(function(year){
    return isLeapYear(year); // function isLeapYear有提升作用
}).map(function(year){
    return year - 1911;
});
console.log('西元2000~3000年的閏年：', result);

function isLeapYear(year){
  var isTypeError = (typeof year !== 'number' && typeof year !== 'string');
  var isNotInteger = (isNaN(Number(year)) || Number(year) % 1 !== 0);
  if(isTypeError || isNotInteger){
    throw 'Please input the integer';
  }
  if(year % 400 === 0){
    return true;
  } else if(year % 100 === 0){
    return false;
  } else if(year % 4 === 0){
    return true;
  } else{
    return false;
  }
}
