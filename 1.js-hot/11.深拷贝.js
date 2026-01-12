function deepClone(target, map = new WeakMap()) {
  if (typeof target !== "object" || target === null) {
    return target;
  }
  // 函数 正则 日期 Map/Set 等特殊对象的处理 执行构造体 返回新的对象
  const constructor = target.constructor;
  if (/^(Function|RegExp|Date|Map|Set)$/.test(constructor.name)) {
    return new constructor(target);
  }
  //   map标记每一个出现过的属性，避免循环引用
  if (map.has(target)) {
    return map.get(target);
  }
  const cloneTarget = Array.isArray(target) ? [] : {};
  map.set(target, cloneTarget);
  for (let key in target) {
    cloneTarget[key] = deepClone(target[key], map);
  }
  return cloneTarget;
}

// 简化版本，不需要考虑date、regexp、map、set等复杂类型,不需要循环引用
function simpleDeepClone(target) {
  if (typeof target !== "object" || target === null) {
    return target;
  }
  const cloneTarget = Array.isArray(target) ? [] : {};
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      cloneTarget[key] = simpleDeepClone(target[key]);
    }
  }
  return cloneTarget;
}
let obj = {
  a: 1,
  b: 2,
  c: {
    c: 1,
    d: 2,
  },
};
console.log(deepClone(obj));
console.log(simpleDeepClone(obj));
debugger;
