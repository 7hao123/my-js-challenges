class Scheduler {
  constructor(max) {
    // 最大并发任务数
    this.max = max;
    // 当前并发任务数
    this.count = 0;
    // 阻塞的任务队列
    this.queue = [];
  }
  async add(fn) {
    if (this.count >= this.max) {
      await new Promise((resolve) => this.queue.push(resolve));
    }
    this.count++;
    const res = await fn();
    this.count--;
    if (this.queue.length) {
      this.queue.shift()();
    }
    return res;
  }
}

// 调用
const sleep = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler(2);

const addTask = (time, order) => {
  scheduler.add(() => sleep(time)).then(() => console.log(order));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");

class Scheduler {
  constructor(max) {
    this.max = max;
    this.count = 0;
    this.queue = [];
  }

  add(fn) {
    // 封装实际执行逻辑
    const run = () => {
      this.count++;
      return fn().then((res) => {
        this.count--;
        // 唤醒队列中第一个等待的任务
        if (this.queue.length) this.queue.shift()();
        return res;
      });
      // 注意：如果 fn() 抛出错误，上面这行 return 不会执行，
      // 导致 count-- 和唤醒都不会发生（与原 await 代码缺陷一致）
    };

    // 并发已满则等待，否则直接执行
    if (this.count >= this.max) {
      return new Promise((resolve) => {
        this.queue.push(resolve);
      }).then(run);
    }

    return run();
  }
}
