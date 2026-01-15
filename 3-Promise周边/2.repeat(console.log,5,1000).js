function repeat(fn, timer, wait) {
  return function callback(...args) {
    setTimeout(() => {
      fn(...args);
      timer--;
      if (timer > 0) callback(...args);
    }, wait);
  };
}

const repeatLog = repeat(console.log, 5, 1000);
repeatLog("hello world");
