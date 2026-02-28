/*<div>
  <span>
    <a></a>
  </span>
  <span>
    <a></a>
    <a></a>
  </span>
</div>;*/

// 把上诉dom结构转成下面的JSON格式

// {
//   tag: 'DIV',
//   children: [
//     {
//       tag: 'SPAN',
//       children: [
//         { tag: 'A', children: [] }
//       ]
//     },
//     {
//       tag: 'SPAN',
//       children: [
//         { tag: 'A', children: [] },
//         { tag: 'A', children: [] }
//       ]
//     }
//   ]
// }

function dom2Json(dom) {
  let obj = {};
  obj.name = dom.tagName;
  obj.children = [];
  dom.childNodes.forEach((child) => {
    obj.children.push(dom2Json(child));
  });
  return obj;
}
