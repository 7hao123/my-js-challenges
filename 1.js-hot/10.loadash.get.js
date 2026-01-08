var object = { a: [{ b: { c: 3 } }] };

console.log(_get(object, "a[0].b.c"));
// => 3
console.log(_get(object, ["a", "0", "b", "c"]));
// => 3
console.log(_get(object, "a.b.c", "default")); // 第三个参数如果值是undefined，则返回第三个参数
// => 'default'

/**
 *
 * @param {*} object
 * @param {*} key [] | string
 * @param {*} value 如果值是undefined，则返回第三个参数
 */
function _get(object, key, value) {
  if (!Array.isArray(key)) {
    key = key
      .trim()
      .replace(/\[(.*)\]/g, (match, i) => {
        return `.${i}`;
      })
      .split(".");
  }
  for (let i = 0; i < key.length; i++) {
    object = object[key[i]];
    if (!object) return value;
  }
  return object | value;
}
