import stateful from '../src/stateful';

export default class Demo extends stateful() {
  constructor(key) {
    super();
    this.stateful = {
      key,
      table: 'demo',
    };
  }
}
