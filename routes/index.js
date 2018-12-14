let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.end('Social Network API');
});

module.exports = router;