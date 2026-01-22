// 为什么要用setTimeout模拟setInterval？
// 重点：avaScript 单线程事件循环，setInterval 仅按固定时间发起回调，不等待上一次完成；
// 1.无视回调执行时间，如果任务时长超过delay,导致多个回调堆积
// 2.由于单线程，可能会被其他任务阻塞，导致时间不精确

// function _setInterval(fn,delay){
//     let timer = null
//     const loop = ()=>{
//         timer = setTimeout(()=>{
//             fn()
//             loop()
//         },delay)
//     }
//     loop()
//     return ()=>{
//         clearTimeout(timer)
//     }
// }

// let a = _setInterval(()=>{console.log(1)},1000)

// setTimeout(()=>{
//     a()
// },3000)

// 拓展：用setInterval模拟setTimeout
const _setTimeout = (fn, time) => {
    const timer = setInterval(() => {
      clearInterval(timer);
      fn();
    }, time);
  };
let b = _setTimeout(()=>{console.log(2)},2000)

