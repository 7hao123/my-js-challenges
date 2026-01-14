Promise.reject = function (data) {
  return new Promise((resolve, reject) => {
    reject(data);
  });
};
