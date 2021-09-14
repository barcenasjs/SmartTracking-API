const tcpudp = require('./tcpudp/tcpudp.service.js');
const write = require('./write/write.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(tcpudp);
  app.configure(write);
};
