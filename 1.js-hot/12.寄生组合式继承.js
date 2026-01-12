function Person(name, age) {
  this.name = name;
  this.age = age;
}
function Son(name, age, skills) {
  Parent.call(this, name, age);
  this.skills = skills;
}

Son.prototype = Object.create(Person.prototype);
Son.prototype.constructor = Son;

// Object.create原理
function myCreate(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
