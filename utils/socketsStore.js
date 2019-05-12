class SocketsStore {
  constructor() {
    this._data = {};
  }

  
  add(key, socket) {
    this._data[key] = socket;
    console.log(Object.keys(this._data).length);
  }

  get(key) {
    return this._data[key];
  }

  getConnectedConnections() {
    return Object.keys(this._data);
  }

  isConnected(key, removeIfClosed) {
    var socket = this._data[key];
    if (socket != null) {
      if (socket.connected) {
        return true;
      } else {
        if (removeIfClosed) {
          delete this._data[key];
        }

        return false;
      }
    } else {
      return false;
    }
  }
  async sendDataToSocket(key,emit,data, removeIfClosed=true) {
    try {
      var socket = this._data[key];
      if (socket != null) {
        if (socket.connected) {
          

            await socket.emit(emit,data);
          

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
    } catch (e) {
      console.log("Error in sending data to socket", e);
    }
  }
}
class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new SocketsStore();
    }
  }

  getInstance() {
    return Singleton.instance;
  }
}

module.exports = Singleton;
