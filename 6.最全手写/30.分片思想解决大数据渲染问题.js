// 题目描述:渲染百万条结构简单的大数据时 怎么使用分片思想优化渲染

const total = 1000000;
// 每次渲染100条
const once = 100;
let index = 0;

function render() {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < once && index < total; i++, index++) {
    const li = document.createElement("li");
    li.textContent = `这是第${index}条数据`;
    fragment.appendChild(li);
  }
  document.body.appendChild(fragment);
  if (index < total) {
    requestAnimationFrame(render);
  }
}
requestAnimationFrame(render);
