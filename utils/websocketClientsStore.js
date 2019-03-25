class WebsocketClientsStore {
  constructor() {

    this._data = {};

  }

  add(key, item) {
    this._data[key] = item;
    console.log(Object.keys(this._data).length);

  }

  get(key) {
    return this._data[key];
  }

  getOpenConnections() {
    return Object.keys(this._data);
  }

  isOpen(key, removeIfClosed) {
    var client = this._data[key];
    if (client != null) {
      if (client.readyState === client.OPEN) {
        return true;
      } else {
        delete this._data[key];
        return false;
      }
    } else {
      return false;
    }
  }
  sendDataToClient(key, removeIfClosed, data) {
    var client = this._data[key];
    if (client != null) {
      if (client.readyState === client.OPEN) {
        if (typeof data === 'string' || data instanceof String) {
          client.send(data);
        } else {
          client.send(JSON.stringify(data));
        }


        return 202;
      } else {
        if (removeIfClosed) {
          delete this._data[key];
        }


        return 200;
      }
    } else {
      return 404;
    }

  }

}

class Singleton {

  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new WebsocketClientsStore();
    }
  }

  getInstance() {
    return Singleton.instance;
  }

}

module.exports = Singleton;