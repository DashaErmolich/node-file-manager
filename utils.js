import path from 'path';
import url from 'url';
import { FileType } from './constants.js';

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const __filename = url.fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

export function sortDirItems(a, b) {
  if (a.Type === b.Type) {
    return a.Name.localeCompare(b.Name);
  }
  return a.Type === FileType.Directory ? -1 : 1;
}
