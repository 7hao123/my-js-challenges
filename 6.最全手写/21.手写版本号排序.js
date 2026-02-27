const arr = ["0.1.1", "2.3.3", "0.302.1", "4.2", "4.3.5", "4.3.4.5"];
arr.sort((a, b) => {
  const arr1 = a.split(".").map(Number);
  const arr2 = b.split(".").map(Number);
  const len = Math.max(arr1.length, arr2.length);
  for (let i = 0; i < len; i++) {
    const s1 = arr1[i] || 0;
    const s2 = arr2[i] || 0;
    if (s1 != s2) {
      return s1 - s2;
    }
  }
  return 0;
});
console.log(arr);
debugger;
