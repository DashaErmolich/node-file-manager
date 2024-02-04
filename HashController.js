import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';
import { Commands } from './constants.js';
import { parser } from './Parser.js';
import { splitWords } from './utils.js';
import crypto from 'crypto';

class HashController {
  async printFileHash(input) {
    try {
      const filePath = path.resolve(parser.extractUserInput(input, Commands.Hash.CalcAndPrint));
      const fileBuffer = await fsp.readFile(filePath);
      const hashSum = crypto.createHash('sha256');
      hashSum.update(fileBuffer);
      console.log(hashSum.digest('hex'));

    } catch (error) {
      console.log(error.message);
    }
  }
}
export const hashController = new HashController();
