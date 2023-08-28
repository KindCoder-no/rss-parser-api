const express = require('express');
const router = express.Router();

// Define root route
router.get('/api', (req, res) => {

    // Function to check if URL is valid
    function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ //port
        '(\\?[;&amp;a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        
        return !!pattern.test(str);
    }   


    let url = req.query.url;

    if(!url) {
        res.status(400).json({message: "No URL provided"});
    }

    // If URL is provided, check if it is valid
    if(url) {
        // Check if URL is valid
        if(!validURL(url)) {
            res.status(400).json({message: "Invalid URL"});
        }else{

            // Fetch rss feed and convert to JSON
            const Parser = require('rss-parser');
            const parser = new Parser({
                customFields: {
                    item: [
                      ['media:content', "media"],
                    ]
                  }
            });

            (async () => {

                let feed = await parser.parseURL(url);
                res.json(feed);
              
              
              })();
           
        }
    }


});



module.exports = router;