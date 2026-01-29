// 原型+构造函数继承
// 特点：既继承实例属性（独立），又继承原型方法（复用）
// 缺点：1. 父类构造函数会被调用两次，影响性能
// 1. 父类
function Parent(name) {
  this.name = name;
  this.hobbies = ["看书", "运动"]; // 实例属性
}

Parent.prototype.sayName = function () {
  console.log(`我的名字是：${this.name}`);
};

// 2. 子类
function Child(name, age) {
  // 构造函数继承：调用父类构造函数，继承实例属性（独立）
  // 把parent的构造函数的this指向子类实例，然后执行parent的代码,为子类实例创建了独立的 hobbies 属性；
  Parent.call(this, name); // 第一次调用 Parent 构造函数
  this.age = age; // 子类自身实例属性
}

// 原型链继承：继承父类原型方法（复用）
Child.prototype = new Parent(); // 第二次调用 Parent 构造函数
Child.prototype.constructor = Child;

// 子类原型方法
Child.prototype.sayAge = function () {
  console.log(`我的年龄是：${this.age}`);
};

// 测试
const child1 = new Child("小明", 18);
const child2 = new Child("小红", 20);

// 实例属性独立（解决原型继承的共享问题）
child1.hobbies.push("听歌");
console.log(child1.hobbies); // ['看书', '运动', '听歌']
console.log(child2.hobbies); // ['看书', '运动']

// 继承父类方法
child1.sayName(); // 我的名字是：小明
child2.sayAge(); // 我的年龄是：20
debugger;
