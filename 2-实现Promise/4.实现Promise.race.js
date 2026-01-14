/**
 * 返回的Promise与第一个有结果的一致
 * @param {iterator} proms
 */

Promise.myRace = (promises) => {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise).then(
        (value) => resolve(value),
        (reason) => reject(reason)
      );
    });
  });
};

Promise.myRace = function (arr) {
  return new Promise((resolve, reject) => {
    for (let item of arr) {
      Promise.resolve(item)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};
