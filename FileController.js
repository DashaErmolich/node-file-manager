import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';
import { Commands } from './constants.js';
import { parser } from './Parser.js';
import { splitWords } from './utils.js';

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

  async rename(input) {
    try {
      const data = splitWords(parser.extractUserInput(input, Commands.File.Rename));
      let [ oldPath, newName ] = data;
      oldPath = path.resolve(oldPath);
      const fileDirPath = path.dirname(oldPath);
      const newPath = path.resolve(fileDirPath, newName);
      await fsp.rename(oldPath, newPath)
    } catch (error) {
      console.log(error.message);
    }
  }

  async copy(input) {
    try {
      const data = splitWords(parser.extractUserInput(input, Commands.File.Copy));
      let [ oldPath, newPath ] = data;
      oldPath = path.resolve(oldPath);
      const fileName = path.basename(oldPath);
      newPath = path.resolve(newPath, fileName);
      const readStream = fs.createReadStream(oldPath, 'utf-8');
      const writeStream = fs.createWriteStream(newPath, 'utf-8');
      readStream.pipe(writeStream)
    } catch (error) {
      console.log(error.message);
    }
  }

  async move(input) {
    try {
      this.copy(input);

      const data = splitWords(parser.extractUserInput(input, Commands.File.Copy));
      let [ oldPath ] = data;
      oldPath = path.resolve(oldPath);
      await fsp.rm(oldPath);
    } catch (error) {
      console.log(error.message);
    }
  }

  async delete(input) {
    try {
      const filePath = path.resolve(parser.extractUserInput(input, Commands.File.Delete));
      await fsp.rm(filePath);
    } catch (error) {
      console.log(error.message);
    }
  }
}
export const fileController = new FileController();
