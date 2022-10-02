export default class LazyLoading {
  constructor() {
    this.timer = "";
    this.lazyLoader = this.lazyLoader.bind(this);
  }
  async lazyLoader(cb, time) {
    try {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        console.log(this);
        cb();
      }, time);
    } catch (error) {
      console.log(error);
    }
  }
}
