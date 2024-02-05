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
    Info: 'os',
  },
  Hash: {
    CalcAndPrint: 'hash',
  },
  Zlib: {
    Compress: 'compress',
    Decompress: 'decompress',
  },
  Exit: '.exit',
};

export const FileType = {
  File: 'file',
  Directory: 'directory',
};

export const Params = {
  Os: {
    EOL: '--EOL',
    Cpus: '--cpus',
    HomeDir: '--homedir',
    Username: '--username',
    Architecture: '--architecture',
  },
};

export const ConsoleColors = {
  Cyan: '\x1b[36m%s\x1b[0m',
  Yellow: '\x1b[33m%s\x1b[0m',
}
