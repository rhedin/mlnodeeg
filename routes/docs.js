var express = require('express');
var router = express.Router();
var marklogic = require('marklogic');

function load2docs(callback) {
    var db = marklogic.createDatabaseClient({
        host:     'localhost',
        port:     '8000',
        database: 'Documents',
        user:     'rickhedin',
        password: 'Sadie1Tink2',
        authType: 'DIGEST'
    });
    // Wouldn't it be nice to find out this failed now, at the 
    // time we create the database client.  Currently, we find 
    // out when we try to use it.
    
    db.createCollection(
        '/books',
        {author: 'Beryl Markham'},
        {author: 'WG Sebald'}
    )
    .result(function(response) {
        console.log(`Call to db.createCollection succeeded.\n${JSON.stringify(response, null, 2)}`);
        callback();
    }, function (error) {
        console.log(`Call to db.createCollection failed.\n${JSON.stringify(error, null, 2)}`);
        callback();  // Calls back just the same if there is an error.
    });
    // What happens if I create the collection twice?
    // Ans: It just succeeds, but is much faster!
}

router.get('/add', function(req, res, next) {
    console.log(`In docs/add route.`);
});

module.exports = router;


/***

This should broken into one file per operation, but oh well.

***/
