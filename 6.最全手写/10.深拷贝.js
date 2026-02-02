function simpleDeepClone(target, hash = new WeakMap()) {
  if (typeof target !== "object" || target === null) {
    return target;
  }
  if (hash.has(target)) {
    return hash.get(target);
  }
  const cloneTarget = Array.isArray(target) ? [] : {};
  hash.set(target, cloneTarget);
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      cloneTarget[key] = simpleDeepClone(target[key]);
    }
  }
  return cloneTarget;
}

// 如果是函数，正则，日期等特殊对象的处理  用return new target.constructor(target)
