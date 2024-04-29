const puppeteer = require('puppeteer');
const { default: parsedDataTokenSnifferWebPage } = require('./chains/ethereum');
const { default: parseSolSniferWebPage } = require('./chains/solana');

const CHAINIDS = {
    solana: {
      displayName: 'Solana',
      apiUrl: 'https://solsniffer.com/scanner',
    },
    ethereum: {
      displayName: 'Ethereum',
      apiUrl: 'https://tokensniffer.com/token/eth',
    },
    base: {
      displayName: 'Base Chain',
      apiUrl: 'https://api.basechain.org',
    }
  };

async function searchOnWebpage(searchQuery, chainId) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();


    if (chainId === CHAINIDS.ethereum){
        tokenInfo = parsedDataTokenSnifferWebPage();
    }
    else {
        tokenInfo = parseSolSniferWebPage();
    }

    return tokenInfo;
}

module.exports = { searchOnWebpage };