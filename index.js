import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import { parser } from './Utils/Parser.js';
import { messenger } from './Utils/Messenger.js';
import { commandController } from './Controllers/CommandController.js';
import os from 'os';
import { ValidationError } from './Errors/ValidationError.js';

export const rl = readline.createInterface({ input, output });

async function start() {
  const providedUsername = parser.getUsername() || 'anonymous';

  messenger.invite(providedUsername);
  process.chdir(os.homedir());
  messenger.printCurrentDir();

  rl.on('line', async (input) => {
    input = input.trim();
    const [command, ...params] = parser.parseInput(input);

    commandController.setCommand(command);
    commandController.setParams(params);

    try {
      await commandController.executeCommand();
    } catch (error) {
      if (error instanceof ValidationError) {
        messenger.printError(error.message);
      } else {
        messenger.printError(`Operation failed: ${os.EOL}` + error.message);
      }
    }

    messenger.printCurrentDir();
  });

  rl.on('close', () => {
    messenger.sayGoodBy(providedUsername);
  });
}

await start();
