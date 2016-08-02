'use strict'

var express = require('express');
var Promise = require('bluebird');
var db = Promise.promisify(require('fh-mbaas-api').db);
// var log = require('fh-bunyan').getLogger(__filename);


var router = module.exports = express.Router();
router.use(require('body-parser').json());

router.get('/', function listUsers(req, res, next) {
    var name = req.query.name;
    console.log('getting users with query: ', name);
    var statement = name ? {'firstname': name } : {};
    console.log('options created: ', statement);

    db({
      act: 'list',
      type: 'users',
      eq: statement
    })
    .then(function(data){
      console.log('User revovered: ' + JSON.stringify(data));
      res.json(data)
    })
    .catch(next);
});

router.post('/', function createUser(req, res, next) {
    var options = {
      "act": "create",
      "type": "users",
      "fields": req.body
    };

    db(options)
    .then(function(data){
      console.log('User created: ' + JSON.stringify(data));
      res.json(data)
    })
    .catch(next);
});
module
// .exports = usersRoute;
