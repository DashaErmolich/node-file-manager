import { Params } from './constants.js';
import os from 'os';
import { BaseController } from './BaseController.js';
import { messenger } from './Messenger.js';

class OsController extends BaseController {
  paramsManager = {
    [Params.Os.EOL]: this.printEOL,
    [Params.Os.Cpus]: this.printCpus,
    [Params.Os.HomeDir]: this.printHomeDir,
    [Params.Os.Username]: this.printSystemUsername,
    [Params.Os.Architecture]: this.printArch,
  };

  async printInfo(params) {
    this._checkParamsQty(params, 1);

    await this.paramsManager[params]();
  }

  async printEOL() {
    messenger.printSuccess(`Default system End-Of-Line: ${JSON.stringify(os.EOL)}`);
  }

  async printCpus() {
    const cpus = os.cpus();

    const info = cpus.map((item) => ({
      Model: item.model,
      'Clock Rate, GHz': item.speed / 1000, // MHz -> GHz
    }));

    messenger.printSuccess(`Overall amount of CPUS: ${os.availableParallelism()}`);
    messenger.printSuccess('Model and clock rate (in GHz) for each of them: ');
    console.table(info);
  }

  async printHomeDir() {
    messenger.printSuccess(`System home directory: ${os.homedir()}`);
  }

  async printSystemUsername() {
    messenger.printSuccess(`System username: ${os.userInfo().username}`);
  }

  async printArch() {
    messenger.printSuccess(
      `CPU architecture for which Node.js binary has compiled: ${process.arch}`
    );
  }
}

export const osController = new OsController();
