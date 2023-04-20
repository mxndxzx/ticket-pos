const service = require('../services/default.js');

class Controller {
    async postPrint(req,res) {
        const { body } = req;

        const response = await service.print(body.data);

        res.status(200).send({
            status: 'OK',
            data: response
        });
    };
};

module.exports = new Controller();