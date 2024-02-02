import { capitalize } from './utils.js';

class Messenger {
  constructor() {}

  invite(username) {
    console.log(`Welcome to the File Manager, ${capitalize(username)}!`);
  }

  sayGoodBy(username) {
    console.log(`Thank you for using File Manager, ${capitalize(username)}, goodbye!`);
  }
}

export const messenger = new Messenger();
