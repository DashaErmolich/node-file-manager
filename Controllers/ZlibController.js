import fs from 'fs';
import zlib from 'zlib';
import { BaseController } from './BaseController.js';
import { messenger } from '../Utils/Messenger.js';

class ZlibController extends BaseController {
  BROTLI_EXT = '.br';

  async brotliCompressFile(params) {
    const { sourceFilePath, targetFilePath } = await this._getFilesPaths(params);

    const readStream = fs.createReadStream(sourceFilePath, { encoding: 'utf-8' });
    const writeStream = fs.createWriteStream(`${targetFilePath}${this.BROTLI_EXT}`);

    const brotliCompress = zlib.createBrotliCompress();

    readStream.pipe(brotliCompress).pipe(writeStream);
    messenger.printSuccess(`File was successfully compressed using Brotli algorithm`);
  }

  async brotliDecompressFile(params) {
    const { sourceFilePath, targetFilePath } = await this._getFilesPaths(params);

    const readStream = fs.createReadStream(sourceFilePath);
    const writeStream = fs.createWriteStream(targetFilePath.split(this.BROTLI_EXT).join(''));

    const brotliDecompress = zlib.createBrotliDecompress();

    readStream.pipe(brotliDecompress).pipe(writeStream);
    messenger.printSuccess(`File was successfully decompressed using Brotli algorithm`);
  }
}
export const zlibController = new ZlibController();
