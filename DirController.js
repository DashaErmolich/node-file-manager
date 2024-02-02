import path from 'path';
import os from 'os';

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
}
export const dirController = new DirController();
