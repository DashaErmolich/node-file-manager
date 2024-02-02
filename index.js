import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

import { parser } from './Parser.js';
import { messenger } from './Messenger.js';

async function start() {
  const rl = readline.createInterface({ input, output });
  const username = parser.getUsername();

  messenger.invite(username);

  rl.on('line', (input) => {
    parser.parseInput(input);
    if (input === '.exit') {
      rl.close();
    }
  });

  rl.on('close', () => {
    messenger.sayGoodBy(username);
  })


}

start();
