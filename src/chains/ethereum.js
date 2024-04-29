const puppeteer = require('puppeteer');

const parsedDataTokenSnifferWebPage =  async (searchQuery) => {
    let tokenInfo = {};
    const apiUrl = 'https://tokensniffer.com/token/eth';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        // Navigate to the Ethereum API URL
        await page.goto(apiUrl + '/' + searchQuery);

        // Wait for the table to load
        await page.waitForSelector('.Home_section__16Giz table');

        // Extract data from the table
        const tableData = await page.evaluate(() => {
            const tableRows = document.querySelectorAll('.Home_section__16Giz table tbody tr');
            const data = [];

            tableRows.forEach(row => {
                const columns = row.querySelectorAll('td');
                const rowData = {};

                columns.forEach((column, index) => {
                    // Extract data from each column
                    rowData['column' + index] = column.textContent.trim();
                });

                data.push(rowData);
            });

            return data;
        });

        // Log the extracted table data
        console.log('Table Data:', tableData);

        // Close the browser
        await browser.close();

        return tokenInfo;

    } catch (error) {
        console.error('Error parsing token data:', error);
        await browser.close();
        throw error;
    }
}

module.exports = { parsedDataTokenSnifferWebPage };