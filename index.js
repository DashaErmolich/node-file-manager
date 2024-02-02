import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

import { parser } from './Parser.js';
import { messenger } from './Messenger.js';

async function start() {
  const rl = readline.createInterface({ input, output });
  const providedUsername = parser.getUsername() || 'anonymous';

  messenger.invite(providedUsername);
  messenger.printCurrentDir()

  rl.on('line', (input) => {
    messenger.printCurrentDir();
    parser.parseInput(input);
    if (input === '.exit') {
      rl.close();
    }
  });

  rl.on('close', () => {
    messenger.sayGoodBy(providedUsername);
  })


}

start();
