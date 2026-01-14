// 返回原来的promise

Promise.resolve = function (data) {
  if (data instanceof Promise) {
    return data;
  }
  return new Promise((resolve) => {
    resolve(data);
  });
};
