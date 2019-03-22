class WebsocketClientsStore {
  constructor() {

    this._data = [];

  }

  add(key, item) {
    this._data[key] = item;
    console.log(this._data.length);
  }

  get(key) {
    return this._data[key];
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