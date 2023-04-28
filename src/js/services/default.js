const { ThermalPrinter, PrinterTypes, CharacterSet, BreakLine } = require('node-thermal-printer');

const city = 'La Plata';
let today = new Date().toLocaleDateString();

class Printer {
    async prnt(data) {
        let printer = new ThermalPrinter({
            type: PrinterTypes.EPSON,                 // Printer type: 'star' or 'epson'
            interface: process.argv[2],               // Printer interface
            characterSet: CharacterSet.PC852_LATIN2,  // Printer character set - default: SLOVENIA
            removeSpecialCharacters: false,           // Removes special characters - default: false
            lineCharacter: "-",                       // Set character for lines - default: "-"
            breakLine: BreakLine.WORD,                // Break line after WORD or CHARACTERS. Disabled with NONE - default: WORD
            width: 40                                 // Number of characters per line
        });

        const layout = () => {
            printer.drawLine();
            printer.print('REGISTRO DE LA PROPIEDAD PCIA. BS. AS.');
            printer.newLine();
            printer.drawLine();
            printer.println(`NE ${data}`);
            printer.println(`${city} ${today}`);
            printer.newLine();
        };

        let isConnected = await printer.isPrinterConnected();
        console.log(isConnected);
        
        try {
            layout();
            const execute = await printer.execute();
            console.log(`Execute:: ${execute}`);
            return data;
        } catch (error) {
            throw error;
        };
    };
};

module.exports = new Printer();