// Import express
const express = require('express');

// Create Express app
const app = express();

// Define root route
app.get('/', (req, res) => {
    res.send(`<div style="text-align: center"><h1>RSS to JSON parser</h1><p>Use the /api route to parse RSS feeds</p> <p>Example: <a href="/api?url=https://www.nasa.gov/rss/dyn/breaking_news.rss">/api?url=https://www.nasa.gov/rss/dyn/breaking_news.rss</a></p></div>`);
});

// Define api route
app.use("/", require("./routes/api"));

// Define Port
const port = 3000

// Listen on defined port
app.listen(port, () => {
    console.log(`Web server started`)
})