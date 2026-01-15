// 无论请求是 “还在浏览器队列中未发送”，还是 “已经发送到后端、后端正在处理”，调用终止后：
// 浏览器层面会立即停止等待响应，并触发 axios 的 cancel 回调；
// 但无法中断后端已经开始的处理（后端仍会执行完逻辑，只是响应会被浏览器丢弃）。
const abort = new AbortController();
let res = null;
fetch(url, {
  signal: abort.signal,
}).then((_res) => {
  res = _res;
});

setTimeout(() => {
  if (!res) abort.abort();
}, 5000);
