const puppeteer = require('puppeteer');

const parseSolSniferWebPage = async (searchQuery) => {


    let tokenInfo = {};
    const apiUrl = 'https://solsniffer.com/scanner';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {

        // Navigate to the webpage containing the search bar
        await page.goto(apiUrl + "/" + searchQuery);

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


        const snifScoreObject = await page.$('.index_b__XO5He');
        const snifScore = await page.evaluate(element => element.textContent, snifScoreObject);

        tokenInfo.snifScore = snifScore;

        return tokenInfo;

    } catch (error) {
        console.error('Error parsing token data:', error);
        await browser.close();
        throw error;
    }
}

module.exports = { parseSolSniferWebPage };