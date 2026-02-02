// 把数组分成无序和有序的，从无序中拿到最小的放到有序的末尾

function selectionSort(arr) {
  // 控制已排序的边界
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr;
}
console.log(selectionSort([3, 6, 2, 4, 1]));
