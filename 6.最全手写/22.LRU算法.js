class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  get(key) {
    if (this.map.has(key)) {
      let tempValue = this.map.get(key);
      this.map.delete(key);
      this.map.set(key, tempValue);
      return tempValue;
    } else {
      return -1;
    }
  }
  put(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
      this.map.set(key, value);
    } else {
      if (this.map.size >= this.capacity) {
        this.map.delete(this.map.keys().next().value);
      }
      this.map.set(key, value);
    }
  }
}
