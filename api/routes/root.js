const router = require('express').Router();
const path = require('path')

router.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, '../../build', 'index.html'));
 });

//router.get('/', (req, res) => res.json({ message: 'API Initialized!'}) );

module.exports = router;
