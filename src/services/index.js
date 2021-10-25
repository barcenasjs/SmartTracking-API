const tcpudp = require('./tcpudp/tcpudp.service.js');
const write = require('./write/write.service.js');
const users = require('./users/users.service.js');
const position = require('./position/position.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    app.configure(tcpudp);
    app.configure(write);
    app.configure(users);
    app.configure(position);
};
