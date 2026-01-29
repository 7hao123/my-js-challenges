// 当执行 new 构造函数(参数1, 参数2,...) 时，JavaScript 引擎会依次完成以下 4 件事：
// 创建空对象：生成一个全新的空普通对象（{}）；
// 绑定原型链：将空对象的 __proto__ 指向构造函数的原型对象（构造函数.prototype），让新对象继承构造函数原型上的属性 / 方法；
// 执行构造函数：将构造函数的this 绑定到新创建的空对象上，传入参数执行构造函数，完成新对象的属性初始化；
// 返回结果判断：
// 如果构造函数显式返回一个引用类型（对象、数组、函数等），则 new 操作最终返回这个引用类型；
// 如果构造函数无返回值或返回基本类型（数字、字符串、布尔、undefined、null），则 new 操作返回第一步创建的新对象。
function myNew(constructor, ...args) {
  let obj = Object.create(constructor.prototype);
  let res = constructor.call(obj, ...args);
  if (res && (typeof res === "object" || typeof res === "function")) return res;
  return obj;
}

// 为什么constructor.call是执行了constructor的函数体;
function Person(name) {
  // 这行代码不会自动执行，直到函数被调用
  this.name = name;
  console.log("Person 被执行了，name =", name);
}

// Person 只是定义，没执行 —— 没有任何输出

// 这才是执行：
Person("Alice"); // 输出: Person 被执行了，name = Alice
// apply 的作用 = 调用函数 + 指定 this
