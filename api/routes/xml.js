const path = '/xml';

const router = require('express').Router();
const axios = require('axios');
const parseString = require('xml2js').parseString;

const finnkinoUrl = 'http://www.finnkino.fi/xml/';

router.route(path)
.get(async(req, res) => {

  const { endpoint = '', ...params } = req.query;

  const url = `${finnkinoUrl}${endpoint}`

  axios.get(url, {params})
    .then(response => {
      parseString(response.data, {trim: true, explicitArray: false, ignoreAttrs: true }, (err, result) => {
        if (err) res.send(err)
        else res.send(result)
      });
    })
    .catch(error => res.send(error));
})

module.exports = router;
