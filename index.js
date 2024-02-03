import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import os from 'os';
import fs from 'fs/promises';

import { parser } from './Parser.js';
import { messenger } from './Messenger.js';
import { dirController } from './DirController.js';
import { Commands } from './constants.js';

async function start() {
  const rl = readline.createInterface({ input, output });
  const providedUsername = parser.getUsername() || 'anonymous';

  messenger.invite(providedUsername);
  process.chdir(os.homedir());
  messenger.printCurrentDir();

  rl.on('line', async (input) => {
    if (input === Commands.Dir.GoUpper) {
      await dirController.goUpper();
    }

    if (input.startsWith(Commands.Dir.GoTo)) {
      await dirController.goTo(input);
    }

    if (input === Commands.Dir.PrintItems) {
      await dirController.printItems();
    }

    if (input === '.exit') {
      rl.close();
    }

    messenger.printCurrentDir();
    parser.parseInput(input);
  });

  rl.on('close', () => {
    messenger.sayGoodBy(providedUsername);
  });
}

start();
