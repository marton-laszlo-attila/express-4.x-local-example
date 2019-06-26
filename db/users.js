var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

var db = new PouchDB('var/pouchdb/users');
var idx = db.createIndex({ index: { fields: ['username'] } });

idx.then(function(ok) {
  console.log('INDEX CREATED!');
  console.log(ok);
}).catch(function(err) {
  console.log('INDEX ERROR');
  console.log(err);
})


db.info().then(function (info) {
  console.log(info);
})

exports.db = db;



var records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}
