function flatten(obj, prefix = "", result = {}) {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    const newKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    // 如果value是一个普通对象 那么继续递归调用flatten函数  直到value不是一个对象了 就把这个值赋值给result对象的newKey属性
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      flatten(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }

  return result;
}
