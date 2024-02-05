import { dirController } from './DirController.js';
import { fileController } from './FileController.js';
import { hashController } from './HashController.js';
import { osController } from './OsController.js';
import { ValidationError } from './ValidationError.js';
import { zlibController } from './ZlibController.js';
import { Commands } from './constants.js';
import { rl as rlInterface } from './index.js';

class CommandController {
  #command;
  #params;

  [Commands.Dir.GoUpper] = dirController.goUpper.bind(dirController);
  [Commands.Dir.GoTo] = dirController.goTo.bind(dirController);
  [Commands.Dir.PrintItems] = dirController.printItems.bind(dirController);

  [Commands.File.PrintContent] = fileController.printContent.bind(fileController);
  [Commands.File.CreateEmpty] = fileController.createEmpty.bind(fileController);
  [Commands.File.Rename] = fileController.rename.bind(fileController);
  [Commands.File.Copy] = fileController.copy.bind(fileController);
  [Commands.File.Move] = fileController.move.bind(fileController);
  [Commands.File.Delete] = fileController.delete.bind(fileController);

  [Commands.Os.Info] = osController.printInfo.bind(osController);

  [Commands.Hash.CalcAndPrint] = hashController.printFileHash.bind(hashController);

  [Commands.Zlib.Compress] = zlibController.brotliCompressFile.bind(zlibController);
  [Commands.Zlib.Decompress] = zlibController.brotliDecompressFile.bind(zlibController);

  [Commands.Exit] = function () {
    rlInterface.close();
  };

  setCommand(value) {
    this.#command = value;
  }

  getCommand() {
    return this.#command;
  }

  setParams(value) {
    this.#params = value;
  }

  getParams() {
    return this.#params;
  }

  async executeCommand() {
    if (this.#command) {
      if (!(this.#command in this)) {
        throw new ValidationError(`Incorrect command: ${this.#command}`);
      }
      await this[this.#command](this.#params);
    }
  }
}

export const commandController = new CommandController();
