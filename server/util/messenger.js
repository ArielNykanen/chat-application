const { PubsubManager } = require('redis-messaging-manager')

let messenger = new PubsubManager({
  host: 'localhost'
});

module.exports = messenger;