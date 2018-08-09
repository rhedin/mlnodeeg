var express = require('express');
var router = express.Router();
var marklogic = require('marklogic');
var newsData = require('./data.js');

function storeDocs(callback) {
    var db = marklogic.createDatabaseClient({
        host:     'localhost',
        port:     '8000',
        database: 'Documents',
        user:     'rickhedin',
        password: 'Sadie1Tink2',
        authType: 'DIGEST'
    });
    
    db.createCollection(
        '/news',
        newsData.articles
    )
    .result(function(response) {
        console.log(`Call to db.createCollection succeeded.\n${JSON.stringify(response, null, 4)}`);
        callback();
    }, function (error) {
        console.log(`Call to db.createCollection failed.\n${JSON.stringify(error, null, 4)}`);
        callback();  // Calls back just the same if there is an error.
    });
}

function removeDocs(callback) {
    var db = marklogic.createDatabaseClient({
        host:     'localhost',
        port:     '8000',
        database: 'Documents',
        user:     'rickhedin',
        password: 'Sadie1Tink2',
        authType: 'DIGEST'
    });
    
    db.documents.removeAll({collection: '/news'})
    .result(function(response) {
        console.log(`Call to db.removeAll succeeded.\n${JSON.stringify(response, null, 4)}`);
        callback();
    }, function (error) {
        console.log(`Call to db.removeAll failed.\n${JSON.stringify(error, null, 4)}`);
        callback();
    });
}

router.get('/add', function(req, res, next) {
    console.log(`In docs/add route.`);
    storeDocs( () => {
        res.send('Stored the documents.');
    });
});

router.get('/remove', function(req, res, next) {
    console.log(`In docs/remove route.`);
    removeDocs( () => {
        res.send('Removed the documents.');
    });
});

module.exports = router;


/***

This should broken into one file per operation, but oh well.

Shouldn't use "get" for everything.

Really?  Going to get a new database connection each time? 

***/
