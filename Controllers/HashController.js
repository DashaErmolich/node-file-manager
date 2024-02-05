import path from 'path';
import fsp from 'fs/promises';
import crypto from 'crypto';
import { BaseController } from './BaseController.js';
import { messenger } from '../Utils/Messenger.js';

class HashController extends BaseController {
  async printFileHash(params) {
    this._checkParamsQty(params, 1);

    const [filePath] = params;
    const targetPath = path.resolve(filePath);

    await this._isFile(targetPath);

    const fileBuffer = await fsp.readFile(targetPath);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    messenger.printSuccess(`File hash: ${hashSum.digest('hex')}`);
  }
}
export const hashController = new HashController();
