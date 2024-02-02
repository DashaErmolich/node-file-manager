export const Commands = {
  Dir: {
    GoUpper: 'up',
    GoTo: 'cd',
    PrintItems: 'ls',
  },
  File: {
    PrintContent: 'cat',
    CreateEmpty: 'add',
    Rename: 'rn',
    Copy: 'cp',
    Move: 'mv',
    Delete: 'rm',
  },
  Os: {
    GetEOL: 'os --EOL',
    GetCpus: 'os --cpus',
    GetHomeDir: 'os --homedir',
    GetUsername: 'os --username',
    GetArchitecture: 'os --architecture',
  },
  Hash: {
    CalcAndPrint: 'hash',
    Compress: 'compress',
    Decompress: 'decompress',
  },
};
