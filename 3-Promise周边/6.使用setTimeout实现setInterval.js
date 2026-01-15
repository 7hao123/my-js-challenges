function _setInterval(fn, delay = 4, ...args) {
  let cancel = false;
  const task = () => {
    setTimeout(() => {
      if (!cancel) {
        fn.apply(this, args);
        task();
      }
    }, delay);
  };
  task();
  return () => {
    cancel = true;
  };
}
_setInterval(() => {
  console.log("每隔1秒输出");
}, 1000);
