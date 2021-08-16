const tcpudp = require('./tcpudp/tcpudp.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(tcpudp);
};
