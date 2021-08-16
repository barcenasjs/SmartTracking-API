/* eslint-disable no-unused-vars */
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
    console.log(data);

    return "Información recibida satisfactoriamente";
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
