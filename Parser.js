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
    console.log(1111, input.split(''));
  }
}

export const parser = new Parser();
