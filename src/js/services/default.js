const { ThermalPrinter, PrinterTypes, CharacterSet, BreakLine } = require('node-thermal-printer');
const { exec } = require('child_process');

// const mode = () => {
//     exec('mode COM1:9600,N,8,1,P', (error, stdout, stderr) => {
//         if (error) {
//             console.log(`child process error::: ${error.message}`);
//             return;
//         }
//         if (stderr) {
//             console.log(`stderr::: ${stderr}`);
//             return;
//         }
//         console.log(`stdout::: ${stdout}`);
//     });
// };

class Printer {
    async print(data) {
        let printer = new ThermalPrinter({
            type: PrinterTypes.EPSON,              // Printer type: 'star' or 'epson'
            interface: "//./COM1",                 // Printer interface
            characterSet: CharacterSet.PC852_LATIN2,  // Printer character set - default: SLOVENIA
            removeSpecialCharacters: false,        // Removes special characters - default: false
            lineCharacter: "-",                    // Set character for lines - default: "-"
            breakLine: BreakLine.WORD,
            width: 40,             // Break line after WORD or CHARACTERS. Disabled with NONE - default: WORD
        });
        
        let isConnected = await printer.isPrinterConnected();       // Check if printer is connected, return bool of status
        let execute = await printer.execute();
        
        printer.print(data);
        printer.newLine();
        printer.drawLine();
        
        execute;
    };
};

module.exports = new Printer();