import path from 'path';
import os from 'os';
import { Commands } from './constants.js';
import { parser } from './Parser.js';

class DirController {
  limitPath = os.homedir();

  async goUpper() {
    try {
      const currentPath = process.cwd();

      if (currentPath === this.limitPath) {
        return;
      }

      const targetPath = path.resolve(currentPath, '..');
      process.chdir(targetPath);
    } catch (error) {
      console.log(error.message);
    }
  }

  async goTo(input) {
    try {
      const targetPath = path.resolve(parser.extractUserInput(input, Commands.Dir.GoTo));

      process.chdir(targetPath);
    } catch (error) {
      console.log(error.message);
    }
  }
}
export const dirController = new DirController();
