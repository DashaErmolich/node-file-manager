import fsp from 'fs/promises';
import path from 'path';
import { ValidationError } from './ValidationError.js';

export class BaseController {
  _checkParamsQty(params, qty) {
    if (params.length !== qty) {
      if (qty === 0) {
        throw new ValidationError(
          `No params required for execution, but you provide ${params.length}: ${params}`
        );
      }

      throw new ValidationError(
        `Require ${qty} ${qty > 1 ? 'params' : 'param'} for execution, but you provide ${
          params.length
        }: ${params}`
      );
    }
  }

  async _isDir(path) {
    if (!(await fsp.lstat(path)).isDirectory()) {
      throw new ValidationError(
        `Directory path required for execution, but you provide file path: ${path}`
      );
    }
  }

  async _isFile(path) {
    if (!(await fsp.lstat(path)).isFile()) {
      throw new ValidationError(
        `File path required for execution, but you provide directory path: ${path}`
      );
    }
  }

  async _getFileToDirPaths(params) {
    this._checkParamsQty(params, 2);

    const [filePath, newDirPath] = params;

    const sourceFilePath = path.resolve(filePath);

    await this._isFile(sourceFilePath);

    const targetDirPath = path.resolve(newDirPath);

    try {
      await fsp.access(targetDirPath);
    } catch (error) {
      await fsp.mkdir(targetDirPath, { recursive: true });
    }

    const fileName = path.basename(sourceFilePath);
    const targetFilePath = path.resolve(targetDirPath, fileName);

    return { sourceFilePath, targetFilePath };
  }

  async _getFilesPaths(params) {
    return await this._getFileToDirPaths(params);
  }
}
