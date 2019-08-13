const fs = require('fs');

class Message {
  all(){
    return JSON.parse(fs.readFileSync('messages.json')).data;
  }

}
module.exports = new Message();
