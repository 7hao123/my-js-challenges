Function.prototype.call2 = function (context, ...args) {
  context = context === undefined || context === null ? window : context;
  context.__fn = this;
  let result = context.__fn(...args);
  delete context.__fn;
  return result;
};
Function.prototype.apply2 = function (context, args) {
  context = context === undefined || context === null ? window : context;
  context.__fn = this;
  let result = context.__fn(...args);
  delete context.__fn;
  return result;
};
Function.prototype.bind2 = function (context, ...args1) {
  context = context === undefined || context === null ? window : context;
  let _this = this;
  return function (...args2) {
    context.__fn = _this;
    let result = context.__fn(...[...args1, ...args2]);
    delete context.__fn;
    return result;
  };
};

Function.prototype._call = function (obj, ...args) {
  !obj && (obj = globalThis);
  // this代表要执行的函数
  obj._fn = this;
  const res = obj._fn(...args);
  delete obj._fn;
  return res;
};

Function.prototype._apply = function (obj, args) {
  // 第二个参数必须为数组或类数组对象, 否则初始化为空对象
  const arr = [];
  for (let i = 0; i < args?.length; ++i) {
    arr.push(args[i]);
  }
  return this._call(obj, ...arr);
};

Function.prototype._bind = function (obj, ...args1) {
  !obj && (obj = globalThis);
  return (...args2) => {
    obj._fn = this;
    const res = obj._fn(...[...args1, ...args2]);
    delete obj._fn;
    return res;
  };
};
