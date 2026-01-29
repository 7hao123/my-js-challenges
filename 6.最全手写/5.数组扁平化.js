// 实现一个多维数组，变成一维数组
const arr = [1, 2, [3, 4], 5, 6, [7, [8, 9]]];
function flatter(arr) {
  if (!arr.length) return;
  return arr.reduce((prev, cur) => {
    return Array.isArray(cur) ? prev.concat(flatter(cur)) : prev.concat(cur);
  }, []);
}
console.log(flatter(arr));
// 用迭代的思路

function flatter(arr) {
  if (!arr.length) return;
  // 如果有嵌套结果就循环
  while (arr.some((item) => Array.isArray(item))) {
    // concat，如果参数是非数组，直接添加，如果是数值则去掉最外层
    arr = [].concat(...arr);
  }
  return arr;
}
console.log(...arr);
console.log([].concat(...arr));
