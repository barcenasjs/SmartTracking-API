/* eslint-disable no-unused-vars */
const dgram = require("dgram");
exports.Tcpudp = class Tcpudp {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    console.log(params);
    return [];
  }

  async get(id, params) {
    return {
      id,
      text: `A new message with ID: ${id}!`,
    };
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)));
    }
    console.log("PROTOCOL: TPC  " + JSON.stringify(data));
    try {
      const socket = dgram.createSocket("udp4");
      socket.send(Buffer.from(JSON.stringify(data)), 41234, "localhost");
    } catch (err) {
      console.log("No UDP server listener found");
    }

    return "Información recibida satisfactoriamente. PROTOCOL : TCP";
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return { id };
  }
};
