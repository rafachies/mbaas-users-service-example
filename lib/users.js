'use strict'

var express = require('express');
var Promise = require('bluebird');
var db = Promise.promisify(require('fh-mbaas-api').db);
// var log = require('fh-bunyan').getLogger(__filename);


var router = module.exports = express.Router();
router.use(require('body-parser').json());



// GET REST endpoint - query params may or may not be populated
router.get('/', function listUsers(req, res, next) {

    console.log('getting users for query ', req.query);
    
    db({
      act: 'list',
      type: 'users',
      eq: req.query
    })
    .then(function(data){
      console.log('User revovered: ' + data);
      res.json(data)
    })
    .catch(next);
});

 
router.post('/', function createUser(req, res, next) {
    
    console.log('Creating user: ', req.body);
   
    db({
      act: 'create',
      type: 'users',
      eq: req.body
    })
    .then(function(data){
      console.log('User created: ' + data);
      res.json(data)
    })
    .catch(next);
});




// function getUsers(cb) {
// 	var options = {
//       "act": "list",
//       "type": "users",
//     };

//     $fh.db(options, function (err, data) {
//       if (err) {
//         console.error("Error while getting tasks " + err);
//         cb(err, null);
//       } else {
//         console.log("RESPONSE: " + JSON.stringify(data));
//         cb(null, data);
//       }
//     });
// }

// function createUser(user, cb) {
//     console.log("Creating task: " + JSON.stringify(task));
//     var options = {
//       "act": "create",
//       "type": "users",
//       "fields": user
//     };

//     $fh.db(options, function (err, data) {
//       if (err) {
//         console.error("Error while persisting " + err);
//         cb(err, null);
//       } else {
//         console.log("RESPONSE: " + JSON.stringify(data));
//         cb(null, data);
//       }
//     });
// }

// module.exports = usersRoute;