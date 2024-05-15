import Store from './Store';

export class RootStore {
  constructor() {
    this.store = new Store(this);
  }
}