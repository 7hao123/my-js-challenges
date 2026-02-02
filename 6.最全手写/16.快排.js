// 分而治之 找个基准，矮的站左，高的站右，左右重复这个过程
// 函数法
// function quickSort(arr) {
//   if (arr.length < 2) {
//     return arr;
//   }
//   const cur = arr[arr.length - 1];
//   //   排除基准值
//   const left = arr.filter((v, i) => v <= cur && i !== arr.length - 1);
//   const right = arr.filter((v) => v > cur);
//   return [...quickSort(left), cur, ...quickSort(right)];
// }
// 双指针法，面试用
// 选取基准，双向巡逻，递归分支

function quickSort(arr, l = 0, r = arr.length - 1) {
  if (l >= r) return arr;
  let i = l;
  let j = r;
  let p = arr[l];
  while (i < j) {
    while (i < j && arr[j] >= p) j--;
    while (i < j && arr[i] <= p) i++;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // 交换基准额值
  [arr[i], arr[l]] = [arr[l], arr[i]];
  quickSort(arr, l, i - 1);
  quickSort(arr, i + 1, r);
  return arr;
}

console.log(quickSort([3, 6, 2, 4, 1]));
