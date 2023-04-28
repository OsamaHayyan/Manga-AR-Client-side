export default class LazyLoading {
  timer: NodeJS.Timeout;
  constructor() {
    this.lazyLoader = this.lazyLoader.bind(this);
  }
  async lazyLoader(cb: () => void, time: number) {
    try {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        cb();
      }, time);
    } catch (error) {
      console.log(error);
    }
  }
}
