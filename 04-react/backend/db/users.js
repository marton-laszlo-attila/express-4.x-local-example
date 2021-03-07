// var records = [
//   { id: 1, username: 'jack', password: 'secret' },
//   { id: 2, username: 'SF', password: 'password' }
// ];

const fs = require('fs');
const filePath = __dirname + '/users.json';

// user data loading
const loadUsersData = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data);
  } catch (err) {
    console.error(err)
  }
}
// user adatok mentése
exports.saveUsersData = function (data) {
  try {
    data.id = records.length + 1;
    records.push(data);
    fs.writeFileSync(filePath, JSON.stringify(records))
  } catch (err) {
    console.error(err)
  }
}

var records = loadUsersData();

exports.findById = function (id, cb) {
  process.nextTick(function () {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function (username, cb) {
  process.nextTick(function () {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}
