// 防抖  特定时间内多次触发只触发一次
// 基础版本，不停的取消，只触发最后一次
function debounce(fn, delay = 100) {
  // 闭包
  let timer;
  return function (...args) {
    // 这里的this是正确的this
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, ...args);
    }, delay);
  };
}

// 节流 在 delay 时间内，只允许函数执行一次，多余的触发全部被忽略。

function throttle(fn, delay = 100) {
  let timer = null;
  return function (...args) {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, ...args);
      timer = null;
    }, delay);
  };
}

// 防抖  中间怎么抖动都不管 只执行最后一次（loadash也可以先执行）
// 搜索框 防止按钮重复提交
// 节流 固定时间执行一次
// 页面scroll 拖拽 埋点曝光  eventListener
