export class Semaphore {
  private counter = 0;

  private waiting: {
    resolve: (_: unknown) => void;
    reject: (_: unknown) => void;
  }[] = [];

  private max: number;

  constructor(max: number) {
    this.max = max;
  }

  public readonly take = () => {
    if (this.waiting.length > 0 && this.counter < this.max) {
      this.counter++;
      const promise = this.waiting.shift();
      promise?.resolve(true);
    }
  };

  public readonly acquire = () => {
    if (this.counter < this.max) {
      this.counter++;
      return new Promise((resolve) => {
        resolve(true);
      });
    }
    return new Promise((resolve, reject) => {
      this.waiting.push({ resolve, reject });
    });
  };

  public readonly release = () => {
    this.counter--;
    this.take();
  };

  public readonly purge = () => {
    const unresolved = this.waiting.length;

    for (let i = 0; i < unresolved; i++) {
      this.waiting[i]?.reject('Task has been purged.');
    }

    this.counter = 0;
    this.waiting = [];

    return unresolved;
  };
}
