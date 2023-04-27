const { ThermalPrinter, PrinterTypes, CharacterSet, BreakLine } = require('node-thermal-printer');

class Printer {
    async prnt(data) {
        let printer = new ThermalPrinter({
            type: PrinterTypes.EPSON,              // Printer type: 'star' or 'epson'
            interface: "//./COM1",                 // Printer interface
            characterSet: CharacterSet.PC852_LATIN2,  // Printer character set - default: SLOVENIA
            removeSpecialCharacters: false,        // Removes special characters - default: false
            lineCharacter: "-",                    // Set character for lines - default: "-"
            breakLine: BreakLine.WORD,
            width: 40              // Break line after WORD or CHARACTERS. Disabled with NONE - default: WORD
        });

        printer.drawLine();
        printer.print('REGISTRO DE LA PROPIEDAD PCIA. BS. AS.');
        printer.newLine();
        printer.drawLine();
        printer.println(`NE ${data}`);
        printer.newLine();

        try {
            await printer.execute();
            return data
        } catch (err) {
            throw err
        }
    };
};

module.exports = new Printer();