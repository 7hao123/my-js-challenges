// JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。完善下面代码的Scheduler类，使以下程序能够正常输出：
// class Scheduler {
//   add(promiseCreator) { ... }
//   // ...
// }

// const timeout = time => new Promise(resolve => {
//   setTimeout(resolve, time);
// })

// const scheduler = new Scheduler();

// const addTask = (time,order) => {
//   scheduler.add(() => timeout(time).then(()=>console.log(order)))
// }

// addTask(1000, '1');
// addTask(500, '2');
// addTask(300, '3');
// addTask(400, '4');

// 这是一个🚀"Worker Pool（工作池）"模式的调度器，
// 核心思想是：预先开启 N 条"生产线"，它们不断从队列中取任务执行，直到队列为空。
class Scheduler {
  constructor(max) {
    this.queue = [];
    this.max = max;
    // 当前有几个再跑
    this.count = 0;
  }
  request() {
    if (this.queue.length === 0 || this.count >= this.max) {
      return;
    }
    this.count++;
    this.queue
      .shift()()
      .then(() => {
        this.count--;
        this.request();
      });
  }
  add(fn) {
    this.queue.push(fn);
  }
  taskStart() {
    for (let i = 0; i < this.queue.length; i++) {
      this.request();
    }
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });
const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");

scheduler.taskStart();
