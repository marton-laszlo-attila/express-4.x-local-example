var db = require('../db');


function createUser(req, res, next) {
  console.log('REGISTER!');
  console.log(req.body);
  
  var user = {
    displayName: req.body.name,
    username: req.body.username,
    password: req.body.password
  };
  
  // FIXME: rename to users
  // use post to auto-assign an _id
  db.people.post(user, function callback(err, result) {
    console.log(err);
    console.log(result);
    
    /*
{ ok: true,
  id: '89d5109d-5805-4738-a8c4-32dbdd60ed31',
  rev: '1-7572cb8419d46d6b797f1a0c89a0e2a2' }
    */
    
    //if (!err) {
    //  console.log('Successfully posted a todo!');
    //}
  });
}


exports = module.exports = [
  createUser
];
