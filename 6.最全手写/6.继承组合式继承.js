function Parent(name) {
  this.name = name;
  this.hobbies = ["看书", "运动"];
}
Parent.prototype.play = () => {
  console.log("222");
};
function Child(name, age) {
  // 调用父类的构造函数
  Parent.call(this);
  this.name = name;
  this.age = age;
}
// 核心是Object.create把child的原型指向parent,然后把构造函数指向child
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
const child = new Child("小明", 18);
console.log(child.name, child.age);
child.play();
