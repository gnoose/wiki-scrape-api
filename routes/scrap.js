const request = require("request-promise");
const cheerio = require("cheerio");

var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    const websiteURL = req.body.websiteURL;
    const searchWord = req.body.searchWord;
    try {
        request(websiteURL, (error, response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
		        const contentData = $(".mw-body");
        		const contentTextContent = contentData.text();
                const wordCount = contentTextContent.split(searchWord).length - 1;
		        console.log('word count = ', wordCount);
                res.json({data: wordCount});

            } else {
                console.log('Error Response = ', error);
                res.json({data: 0});
            }
        });
    } catch (e) {
        console.log('No reached to the Wiki Page. Please check your internet status');
        res.json({data: 0});
    }
   
});

module.exports = router;