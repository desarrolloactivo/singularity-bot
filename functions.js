var macd = require('macd')
var data = require('./data')

function init() {
  console.log(macd(data.getList, 26, 12, 9))
}

init()
