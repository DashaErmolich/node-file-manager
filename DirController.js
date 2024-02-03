import path from 'path';
import os from 'os';
import fs from 'fs/promises';
import { Commands, FileType } from './constants.js';
import { parser } from './Parser.js';
import { sortDirItems } from './utils.js';

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

  async printItems() {
    try {
      const dirItems = (await fs.readdir(process.cwd(), { withFileTypes: true }))
        .map((data) => {
          const item = { Name: data.name };
          item.Type = data.isFile() ? FileType.File : FileType.Directory;
          return item;
        })
        .sort(sortDirItems);

      console.table(dirItems);

    } catch (error) {
      console.log(error.message);
    }
  }
}
export const dirController = new DirController();
