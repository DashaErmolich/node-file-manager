import { ConsoleColors } from '../Constants/constants.js';
import { capitalize } from './utils.js';

class Messenger {
  constructor() {}

  invite(username) {
    console.log(
      ConsoleColors.Yellow,
      '✨' + ` Welcome to the File Manager, ${capitalize(username)}!`
    );
  }

  sayGoodBy(username) {
    console.log(
      ConsoleColors.Yellow,
      '✨' + ` Thank you for using File Manager, ${capitalize(username)}, goodbye!`
    );
  }

  printCurrentDir() {
    console.log('💬', `You are currently in ${process.cwd()}`);
  }

  printSuccess(output) {
    console.log('🟢', output);
  }

  printError(output) {
    console.log('🔴', output);
    console.log('🔄', 'Retry, please');
  }

  printContent(output, color = false) {
    if (color) {
      console.log(color, output);
      return;
    }
    console.log(output);
  }
}

export const messenger = new Messenger();
