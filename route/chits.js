const express = require('express');
const router = express.Router();
const available_chits = require('../chits.json');

router.get('/available-chits', (req, res, next) => {
    res.send(available_chits);
})

module.exports = router;