Function.prototype.myCall = function (context, ...args) {
  if (!context || context === null) {
    context = window;
  }
  // 创造唯一的key值  作为我们构造的context内部方法名
  let fn = Symbol();
  //   这一步关键，把this作为context中的一个量
  //   this是动态的，谁执行指向谁
  context[fn] = this;
  return context[fn](...args);
};

// apply原理一致  只是第二个参数是传入的数组
Function.prototype.myApply = function (context, args) {
  if (!context || context === null) {
    context = window;
  }
  // 创造唯一的key值  作为我们构造的context内部方法名
  let fn = Symbol();
  context[fn] = this;
  // 执行函数并返回结果
  return context[fn](...args);
};

Function.prototype.myBind = function (context, ...args1) {
  if (!context || context === null) {
    context = window;
  }
  let _this = this;
  return function (...args2) {
    let fn = Symbol();
    context[fn] = _this;
    let result = context[fn](...[...args1, ...args2]);
    delete context.fn;
    return result;
  };
};
