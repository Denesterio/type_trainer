export default class LocalStorageService {
  get(key, fallback = null) {
    return new Promise(resolve => {
      const item = localStorage.getItem(key);
      if (item) {
        resolve(JSON.parse(item));
      } else {
        resolve(fallback);
      }
    });
  }

  set(key, value) {
    return new Promise(resolve => {
      localStorage.setItem(key, JSON.stringify(value));
      resolve(true);
    });
  }

  patch(key, value) {
    return this.get(key, []).then((item) => {
      item.push(value);
      this.set(key, item);
    });
  }
}