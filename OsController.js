import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';
import { Commands } from './constants.js';
import { parser } from './Parser.js';
import { splitWords } from './utils.js';
import os from 'os';

class OsController {
  getEOL() {
    try {
      console.log(JSON.stringify(os.EOL));
    } catch (error) {
      console.log(error.message);
    }
  }

  async getCpus() {
    try {
      const cpus = os.cpus();

      const info = cpus.map((item) => ({
        'Model': item.model,
        'Clock Rate, GHz': item.speed / 1000, // MHz -> GHz
      }));

      console.log(`Overall amount: ${os.availableParallelism()}`);
      console.table(info);
    } catch (error) {
      console.log(error.message);
    }
  }
}
export const osController = new OsController();
