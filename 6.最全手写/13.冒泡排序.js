// 两两比较，每一轮把最大的冒出来，进行n轮
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
console.log(bubbleSort([3, 6, 2, 4, 1]));
