import path from 'path';
import fs from 'fs';
import stream, { pipeline } from 'stream';
import { Commands } from './constants.js';
import { parser } from './Parser.js';
import { splitWords } from './utils.js';
import zlib from 'zlib';

class ZlibController {
  async brotliCompressFile(input) {
    try {
      let [sourcePath, destinationPath] = splitWords(
        parser.extractUserInput(input, Commands.Zlib.Compress)
      );
      sourcePath = path.resolve(sourcePath);
      destinationPath = path.resolve(destinationPath, `${path.basename(sourcePath)}.br`);

      const readStream = fs.createReadStream(sourcePath, { encoding: 'utf-8' });
      const writeStream = fs.createWriteStream(destinationPath);

      const brotliCompress = zlib.createBrotliCompress();

      readStream.pipe(brotliCompress).pipe(writeStream);
    } catch (error) {
      console.log(error.message);
    }
  }
}
export const zlibController = new ZlibController();
