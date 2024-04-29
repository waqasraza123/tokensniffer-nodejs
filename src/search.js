const { parsedDataTokenSnifferWebPage } = require('./chains/ethereum');
const { parseSolSniferWebPage } = require('./chains/solana');

const CHAINIDS = {
    solana: {
        id: 'solana',
        displayName: 'Solana',
        apiUrl: 'https://solsniffer.com/scanner',
    },
    ethereum: {
        id: 'ethereum',
        displayName: 'Ethereum',
        apiUrl: 'https://tokensniffer.com/token/eth',
    },
    base: {
      displayName: 'Base Chain',
      apiUrl: 'https://api.basechain.org',
    }
  };

async function searchOnWebpage(searchQuery, chainId) {

    if (chainId === CHAINIDS.ethereum.id){
        tokenInfo = parsedDataTokenSnifferWebPage(searchQuery);
    }
    else {
        tokenInfo = parseSolSniferWebPage(searchQuery);
    }

    return tokenInfo;
}

module.exports = { searchOnWebpage };