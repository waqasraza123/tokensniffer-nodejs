const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const port = 8000;

// Enable CORS for all routes
app.use(cors());

const tokenInfo = {}

// Define a route for handling search requests
app.get('/v1/search', async (req, res) => {
    const searchQuery = req.query.q; // Get the search query from the request query parameters

    try {
        const searchResults = await searchOnWebpage(searchQuery);
        res.json(searchResults); // Send the search results as a JSON response
    } catch (error) {
        console.error('Error searching on webpage:', error);
        res.status(500).json({ error: 'Internal server error' }); // Send an error response
    }
});

// Function to perform search on a webpage
async function searchOnWebpage(searchQuery) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the webpage containing the search bar
    await page.goto('https://solsniffer.com/scanner/' + searchQuery);

    // Wait for search results to load
    await page.$('.index_tokenSnifferBiz__qRljW');

    //Token title
    await page.waitForSelector('div.index_biz__ESPSd');

    tokenName = await page.$eval('div.index_biz__ESPSd', element => element.textContent);
    tokenInfo.tokenName = tokenName;
    tokenInfo.tokenAddress = searchQuery;

    const tokenPriceElement = await page.$('.tracking-wider.text-2xl.alg\\:text-3xl.font-semibold.alg\\:mr-10.min-w-fit');
    const tokenPrice = await page.evaluate(element => element.textContent, tokenPriceElement);
    tokenInfo.tokenPrice = tokenPrice.trim(); // Trim any leading or trailing whitespace



    // Risk Info
    const parentElement = await page.$('.index_div1__mLqmp');
    const childElements = await parentElement.$$('.index_descriptionImg__ogATi .index_risklist13__ffwns');
    const riskInfo = [];
    for (const element of childElements) {
        const imgSrc = await element.$eval('img', img => img.src);
        const description = await element.$eval('.index_noPreviousScams1__z_XRT', p => p.textContent.trim());
        riskInfo.push({ imgSrc, description });
    }

    tokenInfo.riskInfo = riskInfo
    console.log(tokenInfo)

    return tokenInfo;
}

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
