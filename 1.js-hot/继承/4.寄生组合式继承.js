// 第一步：封装寄生继承工具函数（可复用）
function inheritPrototype(Child, Parent) {
  // 1. 创建空对象，原型指向父类原型（不调用父类构造函数，避免冗余）
  const prototype = Object.create(Parent.prototype);
  // 2. 修复构造函数指向（否则子类实例的constructor会指向Parent）
  prototype.constructor = Child;
  // 3. 赋值给子类原型
  Child.prototype = prototype;
}

// 第二步：父类
function Parent(name) {
  this.name = name; // 实例属性（独立）
  this.hobbies = ["看书"];
}
Parent.prototype.sayName = function () {
  // 原型方法（复用）
  console.log(this.name);
};

// 第三步：子类
function Child(name, age) {
  // 构造函数继承：调用一次父类构造函数，继承实例属性
  Parent.call(this, name);
  this.age = age;
}

// 第四步：寄生组合继承核心
inheritPrototype(Child, Parent);

// 子类自有方法
Child.prototype.sayAge = function () {
  console.log(this.age);
};
// 便用写法
// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }
// function Son(name, age, skills) {
//   Parent.call(this, name, age);
//   this.skills = skills;
// }

// Son.prototype = Object.create(Person.prototype);
// Son.prototype.constructor = Son;

// 测试验证
const child = new Child("小明", 18);
child.sayName(); // 小明
child.sayAge(); // 18
child.hobbies.push("运动");
console.log(child.hobbies); // ['看书', '运动']（独立，不影响其他实例）
