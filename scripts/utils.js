import fs from 'node:fs';
import path from 'node:path';

export function getPastMonth() {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    return `${year.toString()}-${month.toString().padStart(2, '0')}-`;
}

export function getInvoices() {
    const dirname = path.dirname(import.meta.filename);
    let invoicesData;
    try {
        const { invoices } = JSON.parse(fs.readFileSync(path.join(dirname, '../assets/data.json'), 'utf8'));
        invoicesData = invoices;
    } catch (error) {
        console.error(error);
    }
    return invoicesData;
}
