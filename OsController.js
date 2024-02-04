import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';
import { Commands } from './constants.js';
import { parser } from './Parser.js';
import { splitWords } from './utils.js';
import os from 'os';

class OsController {
  async getEOL() {
    try {
      console.log(JSON.stringify(os.EOL));
    } catch (error) {
      console.log(error.message);
    }
  }
}
export const osController = new OsController();
