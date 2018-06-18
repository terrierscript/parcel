const {createIPC, isMaster} = require('node-shared-buffer');

module.exports = createIPC(require('./worker'));
module.exports.isMaster = isMaster;
