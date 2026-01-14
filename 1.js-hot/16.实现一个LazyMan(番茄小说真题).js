// 实现一个LazyMan，可以按照以下方式调用:
// LazyMan(“Hank”)输出:
// Hi! This is Hank!

// LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~

// LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~

// LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper
// 以此类推。
class LLazyMan {
  constructor(name) {
    this.name = name;
    this.queue = [];
    this.sayName();
    this.run();
  }
  sayName() {
    this.queue.push(() => {
      console.log(`Hi! This is ${this.name}`);
    });
    return this;
  }
  sleep(time) {
    this.queue.push(() => this.timeWait(time));
    return this;
  }
  sleepFirst(time) {
    this.queue.unshift(() => this.timeWait(time));
    return this;
  }
  timeWait(time) {
    return new Promise((resolve) =>
      setTimeout(() => {
        console.log(`Wake up after ${time}`);
        resolve();
      }, time * 1000)
    );
  }
  eat(param) {
    this.queue.push(() => {
      console.log(`Eat ${param}`);
    });
    return this;
  }
  run() {
    setTimeout(async () => {
      for (const task of this.queue) {
        await task();
      }
    }, 0);
  }
}
const LazyMan = (name) => new LLazyMan(name);
// LazyMan("Hank").sleepFirst(5).eat("supper");
// LazyMan("Hank").eat("dinner").eat("supper");
LazyMan("c2c").sleep(2).eat("s");
