const { ThermalPrinter, PrinterTypes, CharacterSet, BreakLine } = require('node-thermal-printer');
const { SerialPort } = require('serialport');

const serialport = new SerialPort({
    path: '//./COM1',
    baudRate: 9600,
}).write('Testing ticket \n');

console.log(`Serialport:: ${serialport}`)


class Printer {
    async prnt(data) {
        const printer = new ThermalPrinter({
            type: PrinterTypes.EPSON,                 // Printer type: 'star' or 'epson'
            // interface: process.argv[2],               // Printer interface
            interface: '//./COM1',               // Printer interface
            characterSet: CharacterSet.PC852_LATIN2,  // Printer character set - default: SLOVENIA
            removeSpecialCharacters: false,           // Removes special characters - default: false
            lineCharacter: "-",                       // Set character for lines - default: "-"
            breakLine: BreakLine.WORD,                // Break line after WORD or CHARACTERS. Disabled with NONE - default: WORD
            width: 40,                                // Number of characters per line
        });

        let isConnected = await printer.isPrinterConnected();
        console.log(`Printer connected? ${isConnected}`);

        printer.drawLine();
        printer.print('REGISTRO DE LA PROPIEDAD PCIA. BS. AS.');
        printer.newLine();
        printer.drawLine();
        printer.println(`NE ${data}`);
        printer.newLine();

        try {
            const call = await printer.execute();
            console.log(`Default call:: ${call}`);
            return data
        } catch (err) {
            console.log(`Default error:: ${err}`)
            throw err
        }
    };
};

module.exports = new Printer();