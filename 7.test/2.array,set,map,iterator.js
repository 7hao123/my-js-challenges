const map = new Map();
map.set(1, 2);
map.set(3, 4);
map.set(5, 6);
map.set(7, 8);
// for (let item of map) {
//   console.log(item);
// }
const set = new Set();
set.add(1);
set.add(3);
set.add(5);
set.add(7);
for (let item of set) {
  console.log(item);
}
for (let item of map.entries()) {
  console.log(item);
}
const arr = Array.from(set);
console.log(arr, "set");
const arr2 = Array.from(map);
console.log(arr2, "map");

const obj = {
  a: 1,
  b: 2,
  c: 3,
};
for (let item in obj) {
  console.log(item);
}
for (let item of Object.keys(obj)) {
  console.log(item);
}
for (let item of Object.values(obj)) {
  console.log(item);
}
for (let item of Object.entries(obj)) {
  console.log(item);
}

// 只有有iterator.symbol属性的对象才是可迭代的，可以通关value[Symbol.iterator] === function来判断
