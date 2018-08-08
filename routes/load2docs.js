var express = require('express');
var router = express.Router();
var marklogic = require('marklogic');

function load2docs(callback) {
    var db = marklogic.createDatabaseClient({
        host:     'localhost',
        port:     '8000',
        database: 'Documents',
        user:     'admin',
        password: 'admin',
        authType: 'DIGEST'
    });
    
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
}

router.get('/', function(req, res, next) {
    load2docs( () => {
        res.send('Should have loaded the two documents.');
    });
});

module.exports = router;
