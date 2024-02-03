import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';
import { Commands } from './constants.js';
import { parser } from './Parser.js';

class FileController {
  async printContent(input) {
    try {
      const filePath = path.resolve(parser.extractUserInput(input, Commands.File.PrintContent));
      const readStream = fs.createReadStream(filePath, 'utf-8');

      readStream.pipe(process.stdout);
    } catch (error) {
      console.log(error.message);
    }
  }

  async createEmpty(input) {
    try {
      const filePath = path.resolve(process.cwd(), parser.extractUserInput(input, Commands.File.CreateEmpty));
      const fd = await fsp.open(filePath, 'wx');
      await fd.close()
    } catch (error) {
      console.log(error.message);
    }
  }
}
export const fileController = new FileController();
