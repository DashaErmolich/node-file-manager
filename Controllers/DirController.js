import path from 'path';
import os from 'os';
import fsp from 'fs/promises';
import { FileType } from '../Constants/constants.js';
import { sortDirItems } from '../Utils/utils.js';
import { BaseController } from './BaseController.js';
import { messenger } from '../Utils/Messenger.js';

class DirController extends BaseController {
  limitPath = os.homedir();

  async goUpper(params) {
    this._checkParamsQty(params, 0);

    const currentPath = process.cwd();

    if (currentPath === this.limitPath) {
      return;
    }

    const targetPath = path.resolve(currentPath, '..');
    process.chdir(targetPath);
  }

  async goTo(params) {
    this._checkParamsQty(params, 1);

    const [dirPath] = params;
    const targetPath = path.resolve(dirPath);

    await this._isDir(targetPath);

    process.chdir(targetPath);
  }

  async printItems(params) {
    this._checkParamsQty(params, 0);

    const dirItems = (await fsp.readdir(process.cwd(), { withFileTypes: true }))
      .map((data) => {
        const item = { Name: data.name };
        item.Type = data.isFile() ? FileType.File : FileType.Directory;
        return item;
      })
      .sort(sortDirItems);

    messenger.printSuccess('List of all files and folders in current directory: ');
    messenger.printSuccess(
      '- list contains files and folder names (for files - with extension) (Name column)'
    );
    messenger.printSuccess(
      '- folders and files are sorted in alphabetical order ascending, but list of folders goes first'
    );
    messenger.printSuccess('- Type of directory content should be marked explicitly (Type column)');

    console.table(dirItems);
  }
}
export const dirController = new DirController();
