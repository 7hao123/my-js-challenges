/**
 * 等待所有的Promise有结果后
 * 该方法返回的Promise完成
 * 并且按照顺序将所有结果汇总
 * @param {Iterable} proms
 */
function allSettled(promises) {
  return Promise.all(
    promises.map((p) =>
      Promise.resolve(p).then(
        (value) => ({ status: "fulfilled", value }),
        (reason) => ({ status: "rejected", reason })
      )
    )
  );
}
