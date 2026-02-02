// 把多个参数转成多个函数，这样复用函数
// 1.获取函数形参的个数
// 2.保存已经收集的参数
// 3.参数够就调用，不够返回新函数继续收集

function currying(fn, ...args) {
  const length = fn.length;
  return function (...newArgs) {
    const allArgs = [...args, ...newArgs];

    if (allArgs.length >= length) {
      return fn(...allArgs);
    } else {
      return currying(fn, ...allArgs);
    }
  };
}
const add = (a, b, c) => a + b + c;
const a = currying(add, 1);
console.log(a(2, 3));
