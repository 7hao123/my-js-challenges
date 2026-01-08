const arr = [1, [2, 3, [4, 5]], 1, 2, [6, 7]];
Array.prototype.flat = function (depth = 1) {
  let res = [];
  depth--;
  for (let i = 0; i < this.length; i++) {
    if (Array.isArray(this[i]) && depth) {
      res = res.concat(this[i].flat(depth));
    } else {
      res.push(this[i]);
    }
  }
  return res;
};

debugger;
