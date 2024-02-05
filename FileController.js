import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';
import { BaseController } from './BaseController.js';
import { messenger } from './Messenger.js';

class FileController extends BaseController {
  async printContent(params) {
    this._checkParamsQty(params, 1);

    const [filePath] = params;
    const targetPath = path.resolve(filePath);

    await this._isFile(targetPath);

    const readStream = fs.createReadStream(targetPath, 'utf-8');
    
    readStream.pipe(process.stdout);
  }

  async createEmpty(params) {
    this._checkParamsQty(params, 1);

    const [fileName] = params;

    const filePath = path.resolve(process.cwd(), fileName);
    const fd = await fsp.open(filePath, 'wx');
    await fd.close();
  }

  async rename(params) {
    this._checkParamsQty(params, 2);

    const [filePath, newFileName] = params;

    const oldPath = path.resolve(filePath);
    const fileDirPath = path.dirname(oldPath);
    const newPath = path.resolve(fileDirPath, newFileName);

    await this._isFile(oldPath);
    await fsp.rename(oldPath, newPath);
  }

  async copy(params) {
    const { sourceFilePath, targetFilePath } = await this._getFilesPaths(params);

    const readStream = fs.createReadStream(sourceFilePath, 'utf-8');
    const writeStream = fs.createWriteStream(targetFilePath, 'utf-8');

    readStream.pipe(writeStream);
  }

  async move(params) {
    await this.copy(params);
    params.pop();
    await this.delete(params);
  }

  async delete(params) {
    this._checkParamsQty(params, 1);

    const [filePath] = params;

    await fsp.rm(path.resolve(filePath));
  }
}
export const fileController = new FileController();
