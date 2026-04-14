import { getPastMonth, getInvoices } from './utils.js';

(function () {
    function getPastMonthInvoices(invoices) {
        const pastMonthGrep = getPastMonth();
        return invoices.filter(invoice => {
            return invoice.data.issued_at.includes(pastMonthGrep);
        });
    }
    
    class Invoice {
        constructor(data) {
            this.data = data;
        }
    
        get clientNumber() {
            return this.data.client_name;
        }
    
        get clientGstin() {
            return this.data.client_gstin;
        }
    
        get id() {
            return this.data.id;
        }
    
        get invoiceId() {
            return this.data.number;
        }
    
        get status() {
            return this.data.status;
        }
    
        get rows() {
            return this.data.rows;
        }
    
        getRowQuantity(row) {
            return +row.quantity;
        }
    
        getRowTaxableAmount(row) {
            return +row.quantity * +row.price;
        }
    
        getQuantity() {
            return this.rows.reduce((acc, row) => acc + this.getRowQuantity(row), 0);
        }
    
        getTaxableAmount() {
            return this.rows.reduce((acc, row) => acc + this.getRowTaxableAmount(row), 0);
        }
    
        getUniqueTaxes() {
            return this.rows
                .flatMap(row => row.taxes)
                .reduce((map, tax) => map.set(tax.label, tax), new Map());
        }
    
        getTaxAmounts() {
            const taxableAmount = this.getTaxableAmount();
            const taxes = this.getUniqueTaxes();
    
            return Array.from(taxes.values()).reduce((acc, tax) => {
                acc[tax.label] = (+tax.value / 100) * taxableAmount;
                return acc;
            }, {});
        }
    
        isCancelled() {
            return this.status === 'cancelled';
        }
    }
    
    function filterCancelledInvoices(invoices) {
        return invoices.filter(invoice => !invoice.isCancelled());
    }
    
    function getQuantityOfInvoices(invoices) {
        return invoices.reduce((acc, invoice) => acc + invoice.getQuantity(), 0);
    }
    
    function getTaxableAmountOfInvoices(invoices) {
        return invoices.reduce((acc, invoice) => acc + invoice.getTaxableAmount(), 0);
    }
    
    function getTaxAmountOfInvoices(invoices) {
        return invoices.reduce((acc, invoice) => {
            const invoiceTaxAmounts = invoice.getTaxAmounts();
            Object.entries(invoiceTaxAmounts).forEach(([key, value]) => {
                acc[key] = (acc[key] || 0) + value;
            });
            return acc;
        }, {});
    }
    
    function main() {
        const rawInvoices = getInvoices();
        const invoices = rawInvoices.map(data => new Invoice(data));
        const operations = [getPastMonthInvoices, filterCancelledInvoices];
        const pastMonthInvoices = operations.reduce((acc, operation) => operation(acc), invoices);
        const summaryValues = [{ fn: getQuantityOfInvoices, label: 'quantity' }, { fn: getTaxableAmountOfInvoices, label: 'taxableAmount' }, { fn: getTaxAmountOfInvoices, label: 'taxAmount' }];
        const monthlySummary = summaryValues.reduce((acc, attribute) => {
            acc[attribute.label] = attribute.fn(pastMonthInvoices);
            return acc;
        }, {});
    
        const invoiceSummary = pastMonthInvoices.reduce((acc, invoice, index) => {
            acc[invoice.invoiceId] = {
                index: index + 1,
                name: invoice.clientNumber || 'N/A',
                gstin: invoice.clientGstin || 'N/A',
                quantity: invoice.getQuantity(),
                taxableAmount: invoice.getTaxableAmount(),
                taxAmount: invoice.getTaxAmounts(),
            };
            return acc;
        }, {});
    
        invoiceSummary['total-id'] = {
            name: 'total',
            ...monthlySummary
        }
    
        console.table(invoiceSummary);
    }
    
    main();
    
})()

