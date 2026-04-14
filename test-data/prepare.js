import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
const dirname = path.dirname(import.meta.filename);

export const twoLakhsArray = readFileSync(path.join(dirname, 'two-lakhs-array-input.txt'), 'utf8').split(' ').map(x => x.trim()).map(x => Number.parseInt(x));
writeFileSync(path.join(dirname, 'two-lakhs-array-output.json'), JSON.stringify(twoLakhsArray));
