import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import os from 'os';
import fs from 'fs/promises';

import { parser } from './Parser.js';
import { messenger } from './Messenger.js';
import { dirController } from './DirController.js';
import { Commands } from './constants.js';
import { fileController } from './FileController.js';
import { osController } from './OsController.js';
import { hashController } from './HashController.js';
import { zlibController } from './ZipController.js';

async function start() {
  const rl = readline.createInterface({ input, output });
  const providedUsername = parser.getUsername() || 'anonymous';

  messenger.invite(providedUsername);
  // process.chdir(os.homedir());
  messenger.printCurrentDir();

  rl.on('line', async (input) => {
    input = input.trim();

    if (input === Commands.Dir.GoUpper) {
      await dirController.goUpper();
    }

    if (input.startsWith(Commands.Dir.GoTo)) {
      await dirController.goTo(input);
    }

    if (input === Commands.Dir.PrintItems) {
      await dirController.printItems();
    }

    if (input.startsWith(Commands.File.PrintContent)) {
      await fileController.printContent(input);
    }

    if (input.startsWith(Commands.File.CreateEmpty)) {
      await fileController.createEmpty(input);
    }

    if (input.startsWith(Commands.File.Rename)) {
      await fileController.rename(input);
    }

    if (input.startsWith(Commands.File.Copy)) {
      await fileController.copy(input);
    }

    if (input.startsWith(Commands.File.Move)) {
      await fileController.move(input);
    }

    if (input.startsWith(Commands.File.Delete)) {
      await fileController.delete(input);
    }

    if (input === Commands.Os.GetEOL) {
      await osController.getEOL();
    }

    if (input === Commands.Os.GetCpus) {
      await osController.getCpus();
    }

    if (input === Commands.Os.GetHomeDir) {
      osController.printHomeDir();
    }

    if (input === Commands.Os.GetUsername) {
      osController.printSystemUsername();
    }

    if (input === Commands.Os.GetArchitecture) {
      osController.printArch();
    }

    if (input.startsWith(Commands.Hash.CalcAndPrint)) {
      await hashController.printFileHash(input);
    }

    if (input.startsWith(Commands.Zlib.Compress)) {
      await zlibController.brotliCompressFile(input);
    }

    if (input.startsWith(Commands.Zlib.Decompress)) {
      await zlibController.brotliDecompressFile(input);
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
