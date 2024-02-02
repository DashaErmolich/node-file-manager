import path from 'path';
import url from 'url';

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const __filename = url.fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);