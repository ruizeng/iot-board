// splite a number to integer part and decimal part('decimal' number afer the decimal point).
template.helper('$splitNumber',function(num, decimal){
  var result = [0, 0];
  result[0] = Math.floor(num);
  result[1] = Math.ceil((num * Math.pow(10, decimal)) % Math.pow(10, decimal));
  console.dir(result)
  return result;
});