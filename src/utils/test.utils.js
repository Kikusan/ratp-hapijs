const PassThrough = require('stream').PassThrough;

class FakeResponse extends PassThrough {
  constructor(options) {
    super(options);
    this.headers = [];
  }
  code(status) {
    this.status = status;
    return this;
  }
  response(content) {
    this.content = content;
    return this;
  }
}

class FakeRequest extends PassThrough {
  constructor(options = {}) {
    super();
    this.headers = options.headers ? options.headers : {};
    this.params = options.params ? options.params : {};
    this.query = options.query;
    this.user = options.user;
    this.body = options.body;
  }

  setCustom(key, value) {
    this[key] = value;
  }

  param(key) {
    return this.params[key];
  }
}

module.exports = {
  FakeResponse,
  FakeRequest,
};
