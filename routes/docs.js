var express = require('express');
var router = express.Router();
var marklogic = require('marklogic');
var newsData = require('./data.js');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('4f59056a196149c381bd8c5c48c7218a');
var jc = require('json-cycle');

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
        console.log(`Call to db.documents.removeAll succeeded.\n${JSON.stringify(response, null, 4)}`);
        callback();
    }, function (error) {
        console.log(`Call to db.documents.removeAll failed.\n${JSON.stringify(error, null, 4)}`);
        callback();
    });
}

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

function findDocs(callback) {
    var db = marklogic.createDatabaseClient({
        host:     'localhost',
        port:     '8000',
        database: 'Documents',
        user:     'rickhedin',
        password: 'Sadie1Tink2',
        authType: 'DIGEST'
    });

    var qb = marklogic.queryBuilder;

    db.documents.query(  // Yes, first one is db
        qb.where(        // And rest are qb.
            qb.term('trump')
        )
    ).result(function(results) {
        console.log(`Call to db.documents.query succeeded.\n${JSON.stringify(results, null, 4)}`);
        callback();
    }, function (error) {
        console.log(`Call to db.documents.query failed.\n${JSON.stringify(error, null, 4)}`);
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

router.get('/removeAll', function(req, res, next) {
    console.log(`In docs/removeAll route.`);
    removeAllDocs( () => {
        res.send('Removed all the documents.');
    });
});
// This one is different from because /remove only removes the documents 
// in the /news collection. 
// We want the set of documents in the /news collection and the set of 
// documents in the database to be the same.  /removeAll is to get us 
// back to an entirely empty database, if someone creates some non-news 
// entries.

router.get('/find', function(req, res, next) {
    console.log(`In docs/find route.`);
    findDocs( () => {
        res.send('Found the documents.');
    });
});

function storeDocs2(docs) {
    console.log(`In storeDocs2.  docs = ${JSON.stringify(jc.decycle(docs), null, 4)}`);
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

function removeDocs2() {
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

function findDocs2(words) {
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
    console.log(`queryString = ${queryString}`);

    return db.documents.query(  // Yes, first one is db
        qb.where(  // And rest are qb.
            // qb.term('russia')
            // qb.and(
                // qb.collection('/news'),
                qb.parsedFrom(queryString)
                // qb.term('trump')
            // )
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
        removeDocs2()
        .then( () => {
            return storeDocs2(response.articles);
        });
    })
}

function filterDocs(words) {
    return findDocs2(words);
}

router.post('/loadNews', function(req, res, next) {
    console.log(`In loadNews.  req.body = ${req.body} = ${JSON.stringify(req.body, null, 4)}`);
    // res.send({
    //     name: 'Charlie',
    //     phone: '800-DMY-DATA',
    // });
    getNewNews()
    .then( () => {
        console.log(`    req.body.words = ${req.body.words}`);
        filterDocs(req.body.words)
        .then(docs => {
            console.log(`    docs = ${JSON.stringify(jc.decycle(docs), null, 4)}`);
            res.send(docs);
        });
    });
});
// Believe can align .then's at the left edge.

router.post('/searchNews', function(req, res, next) {
    console.log(`In searchNews.  req.body = ${req.body} = ${JSON.stringify(req.body, null, 4)}`);
    // res.send({
    //     name: 'Pamela',
    //     phone: '800-DMY-DATA',
    // });
    console.log(`    req.body.words = ${req.body.words}`);
    filterDocs(req.body.words)
    .then(docs => {
        console.log(`    docs = ${JSON.stringify(jc.decycle(docs), null, 4)}`);
        res.send(docs);
    });
});

module.exports = router;


/***

This should broken into one file per operation, but oh well.

Shouldn't use "get" for everything.

Really?  Going to get a new database connection each time? 

***/
