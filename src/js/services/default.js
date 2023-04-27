const { ThermalPrinter, PrinterTypes, CharacterSet, BreakLine } = require('node-thermal-printer');
const { SerialPort } = require('serialport');

const city = 'La Plata';
let today = new Date().toLocaleDateString();

const serialport = new SerialPort({ path: 'COM1', baudRate: 9600 });

class Printer {
    async prnt(data) {
        let printer = new ThermalPrinter({
            type: PrinterTypes.EPSON,                 // Printer type: 'star' or 'epson'
            interface: '//./COM1',               // Printer interface
            characterSet: CharacterSet.PC852_LATIN2,  // Printer character set - default: SLOVENIA
            removeSpecialCharacters: false,           // Removes special characters - default: false
            lineCharacter: "-",                       // Set character for lines - default: "-"
            breakLine: BreakLine.WORD,                // Break line after WORD or CHARACTERS. Disabled with NONE - default: WORD
            width: 40                                 // Number of characters per line
        });
        
        serialport.write('Lorem ipsum sit dolor amet');

        let isConnected = await printer.isPrinterConnected();
        console.log(`Printer connected? ${isConnected}`);
        
        printer.drawLine();
        printer.print('REGISTRO DE LA PROPIEDAD PCIA. BS. AS.');
        printer.newLine();
        printer.drawLine();
        printer.println(`NE ${data}`);
        printer.println(`${city} ${today}`);
        printer.newLine();

        try {
            await printer.execute();
            return data
        } catch (err) {
            console.log(`Default error:: ${err}`)
            throw err
        }
    };
};

module.exports = new Printer();