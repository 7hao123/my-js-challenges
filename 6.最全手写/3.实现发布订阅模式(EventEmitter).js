class EventEmitter {
    constructor() {
      this.events = {};
    }
    // 实现订阅
    on(name, callBack) {
      if (!this.events[name]) {
        this.events[name] = [callBack];
      } else {
        this.events[name].push(callBack);
      }
    }
    // 删除订阅
    off(name, callBack) {
      if (!this.events[name]) return;
      // 如果不传callback，则取消该事件的所有订阅
      if (!callBack) this.events[name] = [];
      this.events[name] = this.events[name].filter((item) => {
        return item !== callBack;
      });
    }
    // 只执行一次订阅事件
    once(name, callBack) {
      function fn() {
        callBack();
        this.off(name, fn);
      }
      this.on(name, fn);
    }
    // 触发事件
    emit(name, ...rest) {
      this.events[name] &&
        this.events[name].forEach((callBack) => callBack(...rest));
    }
}