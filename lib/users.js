'use strict'

var express = require('express');
var Promise = require('bluebird');
var db = Promise.promisify(require('fh-mbaas-api').db);
// var log = require('fh-bunyan').getLogger(__filename);

var router = module.exports = express.Router();
router.use(require('body-parser').json());

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
// module.exports = usersRoute;