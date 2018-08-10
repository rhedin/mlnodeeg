var express = require('express');
var router = express.Router();
var marklogic = require('marklogic');
var newsData = require('./data.js');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('4f59056a196149c381bd8c5c48c7218a');
var jc = require('json-cycle');

function removeAllDocs(callback) {
    var db = marklogic.createDatabaseClient({
        host:     'localhost',
        port:     '8000',
        database: 'Documents',
        user:     'rickhedin',
        password: 'Sadie1Tink2',
        authType: 'DIGEST'
    });
    
    db.documents.removeAll({all: true})
    .result(function(response) {
        console.log(`Call to db.documents.removeAll succeeded.\n${JSON.stringify(response, null, 4)}`);
        console.log(`Database empty`);
        callback();
    }, function (error) {
        console.log(`Call to db.documents.removeAll failed.\n${JSON.stringify(error, null, 4)}`);
        callback();
    });
}

router.get('/removeAll', function(req, res, next) {
    removeAllDocs( () => {
        res.send('Removed all the documents.');
    });
});
// We want the set of documents in the /news collection and the set of 
// documents in the database to be the same.  /removeAll is to get us 
// back to an entirely empty database, if someone creates some non-news 
// entries.

function storeDocs(docs) {
    var db = marklogic.createDatabaseClient({
        host:     'localhost',
        port:     '8000',
        database: 'Documents',
        user:     'rickhedin',
        password: 'Sadie1Tink2',
        authType: 'DIGEST'
    });
    
    return db.createCollection(
        '/news',
        docs
        // newsData.articles
    )
    .result();
}

function removeDocs() {
    var db = marklogic.createDatabaseClient({
        host:     'localhost',
        port:     '8000',
        database: 'Documents',
        user:     'rickhedin',
        password: 'Sadie1Tink2',
        authType: 'DIGEST'
    });
    
    return db.documents.removeAll({collection: '/news'})
    .result();
}

function findDocs(words) {
    var db = marklogic.createDatabaseClient({
        host:     'localhost',
        port:     '8000',
        database: 'Documents',
        user:     'rickhedin',
        password: 'Sadie1Tink2',
        authType: 'DIGEST'
    });

    var qb = marklogic.queryBuilder;

    var queryString = words.split(' ').join(' OR ');

    return db.documents.query(  // Yes, first one is db
        qb.where(  // And rest are qb.
            qb.parsedFrom(queryString)
        )
    ).result();
}

function getNewNews() {
    return newsapi.v2.topHeadlines({
        category: 'politics',
        language: 'en',
        country: 'us',
        pageSize: 10,
    })
    .then(response => {
        removeDocs()
        .then( () => {
            return storeDocs(response.articles);
        });
    })
}

function filterDocs(words) {
    return findDocs(words);
}

router.post('/loadNews', function(req, res, next) {
    getNewNews()
    .then( () => filterDocs(req.body.words) )
    .then(docs => {
        res.send(docs);
    });
});

router.post('/searchNews', function(req, res, next) {
    filterDocs(req.body.words)
    .then(docs => {
        res.send(docs);
    });
});

module.exports = router;


/***

This should broken into one file per operation, but oh well.

Really?  Going to get a new database connection each time? 

***/
