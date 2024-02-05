import { FileType } from './constants.js';

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function sortDirItems(a, b) {
  if (a.Type === b.Type) {
    return a.Name.localeCompare(b.Name);
  }
  return a.Type === FileType.Directory ? -1 : 1;
}

export function splitWords(str) {
  return str.split(' ');
}
