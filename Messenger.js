import { capitalize } from './utils.js';

class Messenger {
  constructor() {}

  invite(username) {
    console.log('✨', `Welcome to the File Manager, ${capitalize(username)}!`);
  }

  sayGoodBy(username) {
    console.log('✨', `Thank you for using File Manager, ${capitalize(username)}, goodbye!`);
  }

  printCurrentDir() {
    console.log('💬', `You are currently in ${process.cwd()}`);
  }

  printSuccess(output) {
    console.log('🟢', output);
  }

  printError(output) {
    console.log('🙁 Operation failed');
    console.log('🔴', output);
    console.log('🔄', 'Retry, please');
  }
}

export const messenger = new Messenger();
