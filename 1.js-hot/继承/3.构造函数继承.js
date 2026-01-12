// 核心：在子类构造函数中，通过 call()/apply()
// 调用父类构造函数，强制将父类构造函数的 this 指向子类实例。

// 1. 定义父类构造函数（包含实例属性和实例方法）
function Parent(name) {
  // 父类实例属性（重点：引用类型）
  this.name = name;
  this.hobbies = ["看书", "运动"];

  // 父类实例方法（注意：是挂载到 this 上，而非原型）
  this.sayName = function () {
    console.log(`我的名字是：${this.name}`);
  };
}

// 父类原型方法（构造函数继承无法继承这个方法）
Parent.prototype.sayHello = function () {
  console.log("我是父类原型上的方法");
};

// 2. 定义子类构造函数（核心：借用父类构造函数）
function Child(name, age) {
  // 关键：调用父类构造函数，将 this 指向子类实例
  // 相当于把父类的实例属性/方法“复制”到子类实例上
  Parent.call(this, name);

  // 子类自身的实例属性
  this.age = age;
}

// 3. 测试验证
// 创建两个子类实例
const child1 = new Child("小明", 18);
const child2 = new Child("小红", 20);

// ✅ 验证1：继承父类实例属性，且引用类型独立（无共享问题）
child1.hobbies.push("听歌");
console.log(child1.hobbies); // ['看书', '运动', '听歌']
console.log(child2.hobbies); // ['看书', '运动']（不受child1修改影响）

// ✅ 验证2：继承父类实例方法
child1.sayName(); // 我的名字是：小明
child2.sayName(); // 我的名字是：小红

// ❌ 验证3：无法继承父类原型上的方法（构造函数继承的局限）
console.log(child1.sayHello); // undefined（找不到这个方法）
console.log(child2.sayHello); // undefined

// ✅ 验证4：子类实例的方法是独立的（缺点：方法无法复用）
console.log(child1.sayName === child2.sayName); // false（每个实例都有独立的方法副本）
