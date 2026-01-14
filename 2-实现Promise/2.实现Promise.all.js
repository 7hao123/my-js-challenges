/**
 *
 * @param {*} promises
 * @returns
 * 返回一个新的promise,状态取决于promises的执行
 * 只要有一个promise失败则reject,返回第一个失败的原因
 */

Promise.myAll = (promises) => {
  return new Promise((resolve, reject) => {
    let count = 0;
    let result = [];

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => {
          count++;
          result[index] = res;
          if (count === promises.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};
