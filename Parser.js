import process from 'process';

class Parser {
  constructor() {}

  getUsername() {
    return process.argv
      .slice(2)
      .find((item) => item.startsWith('--username'))
      ?.split('=')[1];
  }

  parseInput(input) {
    return input.split(' ');
  }

  extractUserInput(input, command) {
    return input.slice(command.length + 1);
  }
}

export const parser = new Parser();
