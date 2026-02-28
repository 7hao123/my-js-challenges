// 题目描述:实现一个add方法完成两个大数相加
let a = "9007199254740991";
let b = "1234567899999999999";
// 字符串模拟竖式相加
function add(a, b) {
  //先补0
  const maxLength = Math.max(a.length, b.length);
  a = a.padStart(maxLength, "0");
  b = b.padStart(maxLength, "0");
  let carry = 0;
  let result = "";
  for (let i = maxLength - 1; i >= 0; i--) {
    const sum = parseInt(a[i]) + parseInt(b[i]) + carry;
    result = (sum % 10) + result;
    carry = Math.floor(sum / 10);
  }
  if (carry) {
    result = carry + result;
  }
  return result;
}
