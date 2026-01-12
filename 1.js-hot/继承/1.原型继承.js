// 核心： 子类.prototype = new 父类()
// 特点，只能继承父类原型上的属性和方法，构造函数内的实例属性存在引用共享的问题
// 1. 定义父类（构造函数 + 原型方法）
function Parent(name) {
  // 父类实例属性（会被子类实例共享）
  this.name = name || "默认父类名称";
  // 引用类型属性（共享会导致问题）
  this.hobbies = ["看书", "运动"];
}

// 父类原型方法
Parent.prototype.sayName = function () {
  console.log(`我的名字是：${this.name}`);
};

// 2. 定义子类
function Child(age) {
  this.age = age;
}

// 3. 核心：原型继承 - 把父类实例作为子类原型
Child.prototype = new Parent();
// 修复构造函数指向（否则 Child 实例的 constructor 会指向 Parent）
Child.prototype.constructor = Child;

// 4. 子类原型添加自己的方法
Child.prototype.sayAge = function () {
  console.log(`我的年龄是：${this.age}`);
};

// 测试
const child1 = new Child(18);
const child2 = new Child(20);

// 继承父类的属性和方法
child1.sayName(); // 我的名字是：默认父类名称
child1.sayAge(); // 我的年龄是：18

// 问题：引用类型属性被共享
child1.hobbies.push("听歌");
console.log(child2.hobbies); // ['看书', '运动', '听歌']（child2 也被修改了）
