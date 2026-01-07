let arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
  { id: 6, name: "部门6", pid: 0 },
];

function listToTree(list) {
  const map = {};
  const tree = [];
  // 先将节点存在映射表
  list.forEach((item) => {
    map[item.id] = { ...item, children: [] };
  });

  //
  list.forEach((item) => {
    const currentNode = map[item.id];
    if (item.pid === 0) {
      tree.push(currentNode);
    } else {
      const parent = map[item.pid];
      parent.children.push(currentNode);
    }
  });
  return tree;
}

console.log(listToTree(arr));
debugger;
