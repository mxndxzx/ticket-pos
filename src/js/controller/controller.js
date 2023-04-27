const service = require('../services/default.js');

class Controller {
    async postPrint(req,res) {
        const { body } = req;

        try {
            const response = await service.prnt(body.data);
            res.status(200).send({
                status: 'OK',
                data: response
            });
        } catch (error) {
            res.status(500).send({
                status: 'FAILED',
                msg: error
            });
        };
    };
};

module.exports = new Controller();