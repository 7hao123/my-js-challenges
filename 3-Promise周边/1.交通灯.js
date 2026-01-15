// 模拟红绿灯
// 模拟交通信号灯的切换逻辑：红灯亮 3 秒 → 绿灯亮 2 秒 → 黄灯亮 1 秒
// 要求使用 Promise 实现，且信号灯切换过程需要循环执行（无限轮询）
// 每一步切换时，在控制台打印对应的提示（如 “红灯亮”“绿灯亮”）

function red() {
  console.log("red");
}

function green() {
  console.log("green");
}

function yellow() {
  console.log("yellow");
}

const task = (timer, light) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (light === "red") {
        red();
      } else if (light === "green") {
        green();
      } else if (light === "yellow") {
        yellow();
      }
      resolve();
    }, timer);
  });
};

const step = async () => {
  task(3000, "red")
    .then(() => {
      return task(2000, "green");
    })
    .then(() => {
      return task(1000, "yellow");
    })
    .then(() => {
      step();
    });
};

step();
