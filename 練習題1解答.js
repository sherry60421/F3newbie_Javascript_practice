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

try{
  var year = 2020;
  if(isLeapYear(year)){
    console.log(year + ' is leap year.');
  } else{
    console.log(year + ' is not leap year.');
  }
} catch(e){
  console.log('error! ' + e);
}
