const express = require('express');
const { searchOnWebpage } = require('./search');

const router = express.Router();

router.get('/v1/search', async (req, res) => {
    const searchQuery = req.query.q;
    const chainId = req.query.chainId;
    try {
        const searchResults = await searchOnWebpage(searchQuery, chainId);
        res.json(searchResults);
    } catch (error) {
        console.error('Error searching on webpage:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
