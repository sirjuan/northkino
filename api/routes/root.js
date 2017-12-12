const router = require('express').Router();

router.get('/', (req, res) => res.json({ message: 'API Initialized!'}) );

module.exports = router;
