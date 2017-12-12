const router = require('express').Router();
const path = require('path')

router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../src', 'build', 'index.html'));
});

//router.get('/', (req, res) => res.json({ message: 'API Initialized!'}) );

module.exports = router;
