/* eslint-disable no-unused-vars */
const dgram = require('dgram');
const net = require('net');

exports.Tcpudp = class Tcpudp {
  constructor(options, app) {
    this.options = options || {};
    this.app = app;
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

    return this.app.service('write').create({ position: JSON.stringify(data) });
  }

  async update(id, data, params) {
    const a = this.app.service('write').getModel();
    a.update()
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return {id};
  }
};
