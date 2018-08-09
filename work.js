Ricks-MBP:mlnodeeg rickhedin$ DEBUG=mlnodeeg:* npm start

> mlnodeeg@0.0.0 start /Users/rickhedin/work/180808/mlnodeeg
> node ./bin/www

  mlnodeeg:server Listening on port 3000 +0ms
Call to db.createCollection succeeded.
[
  "/10309385258434249670.json",
  "/14187809377987606430.json"
]
GET /load2docs 304 956.404 ms - -
{ status: 'ok',
  totalResults: 5,
  articles: 
   [ { source: [Object],
       author: 'Michael Hiltzik',
       title: 'Trump\'s minions are using California wildfires as excuse to attack endangered species protections',
       description: 'Commerce Secretary Wilbur Ross issued an order for the government to provide water that\'s unneeded for wildfires. Now the ulterior motive for President Trump\'s wildly uninformed tweet about what\'s causing California wildfires comes into focus.',
       url: 'http://www.latimes.com/business/hiltzik/la-fi-hiltzik-wildfires-20180808-story.html',
       urlToImage: 'http://www.latimes.com/resizer/cmwcrXZxhB5fk9YoCPoyD_5-ZIk=/1200x0/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/SO5THDWZRRFIHAS5JLTHXV76KA.jpg',
       publishedAt: '2018-08-09T00:58:18Z' },
     { source: [Object],
       author: 'https://www.facebook.com/nakamuradavid',
       title: 'Ahead of midterms, Trump hits a wall in efforts to curb illegal immigration',
       description: 'The president’s tough rhetoric and new policies have failed to make significant progress on his top campaign promise after 19 months in office.',
       url: 'https://www.washingtonpost.com/politics/ahead-of-midterms-trump-hits-a-wall-in-efforts-to-curb-illegal-immigration/2018/08/08/9bc49f4a-9a59-11e8-843b-36e177f3081c_story.html',
       urlToImage: 'https://www.washingtonpost.com/resizer/eEXAIjpTfJoKPUytctb8WpIc5y4=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/RSPNS6E3HYI6RNQLDSEX6F7BQU.jpg',
       publishedAt: '2018-08-08T22:10:12Z' },
     { source: [Object],
       author: 'http://www.nytimes.com/by/alan-feuer, https://www.nytimes.com/by/shane-goldmacher',
       title: 'New York Congressman Chris Collins Is Charged With Insider Trading',
       description: 'Representative Collins, one of President Trump’s earliest and most vocal supporters, is accused of using inside information about a new drug to avoid losses.',
       url: 'https://www.nytimes.com/2018/08/08/nyregion/chris-collins-insider-trading.html',
       urlToImage: 'https://static01.nyt.com/images/2018/08/09/nyregion/09congressman1/09congressman1-facebookJumbo.jpg',
       publishedAt: '2018-08-08T20:50:51Z' },
     { source: [Object],
       author: 'http://www.nytimes.com/by/gardiner-harris',
       title: 'US to Issue New Sanctions Against Russia Over Spy Poisoning',
       description: 'The sanctions are part of anti-Russian efforts by the United States, even as President Trump works to forge warmer ties.',
       url: 'https://www.nytimes.com/2018/08/08/world/europe/sanctions-russia-poisoning-spy-trump-putin.html',
       urlToImage: 'https://static01.nyt.com/images/2018/08/09/us/politics/09dc-sanctions-print/merlin_141463833_28baa2a7-8cea-49e6-b865-649b2e5bc1d3-facebookJumbo.jpg',
       publishedAt: '2018-08-08T20:34:55Z' },
     { source: [Object],
       author: null,
       title: 'Don Lemon: Trump told me I couldn\'t be a fair reporter because I\'m black',
       description: 'Donald Trump also called Lemon a racist after a 2011 interview with Lemon, the CNN anchor claimed.',
       url: 'https://www.washingtonpost.com/news/reliable-source/wp/2018/08/08/don-lemon-trump-told-me-i-couldnt-be-a-fair-reporter-because-im-black/',
       urlToImage: 'https://www.washingtonpost.com/resizer/Lk3fneMgxuog9Yce7ggnm5B0KIA=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/KHT6VREGYI4HDE5W4AMVTR35ZE.jpg',
       publishedAt: '2018-08-08T16:41:47Z' } ] }
GET /news 200 414.786 ms - 29
^C
Ricks-MBP:mlnodeeg rickhedin$ 




The one above sucks.  Ignore it.
}).then(response => {
    // console.log(response);
    console.log(`${JSON.stringify(response, null, 4)}`);




Ricks-MBP:mlnodeeg rickhedin$ DEBUG=mlnodeeg:* npm start

> mlnodeeg@0.0.0 start /Users/rickhedin/work/180808/mlnodeeg
> node ./bin/www

  mlnodeeg:server Listening on port 3000 +0ms
{
    "status": "ok",
    "totalResults": 3,
    "articles": [
        {
            "source": {
                "id": null,
                "name": "Latimes.com"
            },
            "author": "Michael Hiltzik",
            "title": "Trump's minions are using California wildfires as excuse to attack endangered species protections",
            "description": "Commerce Secretary Wilbur Ross issued an order for the government to provide water that's unneeded for wildfires. Now the ulterior motive for President Trump's wildly uninformed tweet about what's causing California wildfires comes into focus.",
            "url": "http://www.latimes.com/business/hiltzik/la-fi-hiltzik-wildfires-20180808-story.html",
            "urlToImage": "http://www.latimes.com/resizer/cmwcrXZxhB5fk9YoCPoyD_5-ZIk=/1200x0/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/SO5THDWZRRFIHAS5JLTHXV76KA.jpg",
            "publishedAt": "2018-08-09T00:58:18Z"
        },
        {
            "source": {
                "id": "the-washington-post",
                "name": "The Washington Post"
            },
            "author": "https://www.facebook.com/nakamuradavid",
            "title": "Ahead of midterms, Trump hits a wall in efforts to curb illegal immigration",
            "description": "The president’s tough rhetoric and new policies have failed to make significant progress on his top campaign promise after 19 months in office.",
            "url": "https://www.washingtonpost.com/politics/ahead-of-midterms-trump-hits-a-wall-in-efforts-to-curb-illegal-immigration/2018/08/08/9bc49f4a-9a59-11e8-843b-36e177f3081c_story.html",
            "urlToImage": "https://www.washingtonpost.com/resizer/eEXAIjpTfJoKPUytctb8WpIc5y4=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/RSPNS6E3HYI6RNQLDSEX6F7BQU.jpg",
            "publishedAt": "2018-08-08T22:10:12Z"
        },
        {
            "source": {
                "id": "the-washington-post",
                "name": "The Washington Post"
            },
            "author": null,
            "title": "Trump administration to impose new sanctions on Russia for nerve agent attack in England",
            "description": "The State Department said the U.S. had determined Russia was responsible for the use of Novichok in March in the city of Salisbury.",
            "url": "https://www.washingtonpost.com/world/national-security/trump-administration-to-impose-new-sanctions-on-russia-for-nerve-agent-attack-in-england/2018/08/08/7c66b45e-9b3e-11e8-b60b-1c897f17e185_story.html",
            "urlToImage": "https://www.washingtonpost.com/resizer/t4lKK53paQd8xeID9htJYvz5UFI=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/V7G4GMULMII6RCXKQ3UIVZ3A3A.jpg",
            "publishedAt": "2018-08-08T19:41:02Z"
        }
    ]
}
GET /news 304 278.488 ms - -
^C
Ricks-MBP:mlnodeeg rickhedin$ 

