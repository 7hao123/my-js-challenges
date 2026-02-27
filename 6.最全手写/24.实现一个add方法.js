// 题目描述:实现一个 add 方法 使计算结果能够满足如下预期： add(1)(2)(3)()=6 add(1,2,3)(4)()=10

// 其实就是考函数柯里化

function add(...args) {
  let allArgs = [...args];
  function fn(...newArgs) {
    if (newArgs.length === 0) {
      // 没传参，说明是要结果
      return allArgs.reduce((a, b) => a + b, 0);
    }
    allArgs = [...allArgs, ...newArgs];
    return fn;
  }
  return fn;
}
