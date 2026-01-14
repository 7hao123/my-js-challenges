// 一个标准的 Promise 核心包含：
// 1.三种状态（pending/fulfilled/rejected），状态一旦改变就不可逆
// 2.执行器函数（executor）立即执行，接收 resolve/reject 两个回调
// 3.then 方法支持链式调用，能处理成功 / 失败回调
// 4.resolve/reject 方法用于改变状态并触发回调
// 5.处理异步执行和回调队列

// 定义Promise的三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

// ai生成
class MyPromise {
  // 构造函数，接收执行器函数
  constructor(executor) {
    try {
      // 执行器立即执行，传入resolve和reject方法
      executor(this.resolve, this.reject);
    } catch (error) {
      // 执行器执行出错直接调用reject
      this.reject(error);
    }
  }

  // 初始状态为pending
  status = PENDING;
  // 成功的结果
  value = undefined;
  // 失败的原因
  reason = undefined;
  // 成功回调队列（处理异步场景）
  onFulfilledCallbacks = [];
  // 失败回调队列（处理异步场景）
  onRejectedCallbacks = [];

  // resolve方法：将状态改为成功，使用箭头函数绑定this
  resolve = (value) => {
    // 状态不可逆，只有pending时才能修改
    if (this.status !== PENDING) return;
    // 修改状态为成功
    this.status = FULFILLED;
    // 保存成功结果
    this.value = value;
    // 执行所有缓存的成功回调
    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(value);
    }
  };

  // reject方法：将状态改为失败，使用箭头函数绑定this
  reject = (reason) => {
    // 状态不可逆，只有pending时才能修改
    if (this.status !== PENDING) return;
    // 修改状态为失败
    this.status = REJECTED;
    // 保存失败原因
    this.reason = reason;
    // 执行所有缓存的失败回调
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(reason);
    }
  };

  // then方法：接收成功和失败回调，支持链式调用
  then(onFulfilled, onRejected) {
    // 处理回调不传的情况（值的穿透）
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    // 返回新的Promise实现链式调用
    const promise2 = new MyPromise((resolve, reject) => {
      // 封装状态处理函数
      const handleCallback = (callback, result) => {
        try {
          const x = callback(result);
          // 处理回调返回值（兼容返回Promise的情况）
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      };

      // 当前状态为成功
      if (this.status === FULFILLED) {
        // 异步执行（保证promise2已初始化）
        setTimeout(() => {
          handleCallback(onFulfilled, this.value);
        }, 0);
      }

      // 当前状态为失败
      if (this.status === REJECTED) {
        // 异步执行
        setTimeout(() => {
          handleCallback(onRejected, this.reason);
        }, 0);
      }

      // 当前状态为pending（异步场景）
      if (this.status === PENDING) {
        // 缓存成功回调
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            handleCallback(onFulfilled, this.value);
          }, 0);
        });
        // 缓存失败回调
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            handleCallback(onRejected, this.reason);
          }, 0);
        });
      }
    });

    return promise2;
  }

  // 实现catch方法（语法糖）
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  // 实现finally方法（无论成功失败都会执行）
  finally(callback) {
    return this.then(
      (value) => MyPromise.resolve(callback()).then(() => value),
      (reason) =>
        MyPromise.resolve(callback()).then(() => {
          throw reason;
        })
    );
  }

  // 静态resolve方法
  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve) => resolve(value));
  }

  // 静态reject方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }

  // 静态all方法（所有Promise成功才成功）
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      let count = 0;
      const result = [];
      if (promises.length === 0) return resolve(result);
      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          (value) => {
            count++;
            result[index] = value;
            if (count === promises.length) resolve(result);
          },
          (reason) => reject(reason)
        );
      });
    });
  }

  // 静态race方法（第一个完成的Promise决定结果）
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        MyPromise.resolve(promise).then(
          (value) => resolve(value),
          (reason) => reject(reason)
        );
      });
    });
  }
}

// 核心辅助函数：处理then回调的返回值
function resolvePromise(promise2, x, resolve, reject) {
  // 防止循环引用
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }

  // 如果x是Promise实例
  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else if (x !== null && (typeof x === "object" || typeof x === "function")) {
    // 如果x是对象或函数（兼容其他Promise实现）
    let called = false; // 防止多次调用
    try {
      const then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        // 普通对象，直接resolve
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    // 普通值，直接resolve
    resolve(x);
  }
}

// 测试代码
// 1. 基础测试
const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("成功结果");
    // reject('失败原因');
  }, 1000);
});

p1.then((res) => {
  console.log("res1:", res); // 输出：res1: 成功结果
  return "链式调用的值";
})
  .then((res) => {
    console.log("res2:", res); // 输出：res2: 链式调用的值
  })
  .catch((err) => {
    console.log("err:", err);
  })
  .finally(() => {
    console.log("finally执行");
  });

// 2. all方法测试
MyPromise.all([
  MyPromise.resolve(1),
  new MyPromise((resolve) => setTimeout(() => resolve(2), 500)),
]).then((res) => {
  console.log("all结果:", res); // 输出：all结果: [1, 2]
});

// 3. race方法测试
MyPromise.race([
  new MyPromise((resolve) => setTimeout(() => resolve(1), 1000)),
  MyPromise.reject("race失败"),
]).catch((err) => {
  console.log("race结果:", err); // 输出：race结果: race失败
});
