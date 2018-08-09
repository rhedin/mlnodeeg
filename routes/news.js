var express = require('express');
var router = express.Router();

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('4f59056a196149c381bd8c5c48c7218a');

/***
// To query top headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
newsapi.v2.topHeadlines({
    q: 'trump',
    category: 'politics',
    language: 'en',
    country: 'us'
}).then(response => {
    console.log(response);
    // {
    //     status: "ok",
    //     articles: [...]
    // }
});

// To query everything
// You must include at least one q, source, or domain
newsapi.v2.everything({
    q: 'trump',
    sources: 'bbc-news,the-verge',
    domains: 'bbc.co.uk,techcrunch.com',
    from: '2017-12-01',
    to: '2017-12-12',
    language: 'en',
    sortBy: 'relevancy',
    page: 2
}).then(response => {
    console.log(response);
    // {
    //     status: "ok",
    //     articles: [...]
    // }
});

// To query sources
// All options are optional
newsapi.v2.sources({
    category: 'technology',
    language: 'en',
    country: 'us'
}).then(response => {
    console.log(response);
    // {
    //     status: "ok",
    //     sources: [...]
    // }
});
***/

router.get('/', function(req, res, next) {
    newsapi.v2.topHeadlines({
        q: 'trump',
        category: 'politics',
        language: 'en',
        country: 'us'
    }).then(response => {
        // console.log(response);
        console.log(`${JSON.stringify(response, null, 4)}`);
        // {
        //     status: "ok",
        //     articles: [...]
        // }
        res.send('Should have loaded some news.');
    });
 });

module.exports = router;
