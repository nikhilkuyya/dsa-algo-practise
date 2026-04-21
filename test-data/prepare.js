import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
const dirname = path.dirname(import.meta.filename);

export const data = readFileSync(path.join(dirname, '../prepare-data/lilly-homework/10k.txt'), 'utf8').split(' ').map(x => x.trim()).map(x => Number.parseInt(x));
writeFileSync(path.join(dirname, './lily-homework/ten-lakhs-input.json'), JSON.stringify(data));
