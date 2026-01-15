function randomUniqueArr(len = 100, min = 0, max = 200) {
  if (max - min < len) {
    // 可生成数的范围小于数组长度
    return null;
  }
  const hash = [];
  while (hash.length < len) {
    const num = Math.floor(Math.random() * max);
    if (num < min) continue;
    if (hash.indexOf(num) === -1) {
      hash.push(num);
    }
  }
  return hash;
}
