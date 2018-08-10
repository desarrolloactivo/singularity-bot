var macd = require('macd')
var data = require('./data')

var status = "out" // in, out
var cash = 1000
var crypto = 0
var orders = {}
var price_old = 0

function init() {
  // Get histogram
  var values = data.getList
  var datas = data.getData
  var hist = macd(values, 26, 12, 9).histogram

  var count = Object.keys(datas).length

  // Foreach data
  for (let i = 0; i < hist.length; i ++) {
    const el = hist[i];
    // console.log("cash", cash)
    // console.log("crypto", crypto)
    // console.log("===")
    // console.log("value", values[i])
    // console.log("macd", el)
      
    
    var time = parseInt(Object.keys(datas)[count - i])
    if (status == "out" && el > 0) {
      buy (values[i])
      price_old = values[i]
      console.log(`Buy ${crypto} BTC at price ${values[i]} $ on ${new Date(time).yyyymmdd()}`)
    }
    
    if (status == "in" && el < 0) {
      console.log(`Sell ${crypto} BTC at price ${values[i]} $ on ${new Date(time).yyyymmdd()}`)
      console.log(`Diferencia ${values[i] - price_old}`)
      console.log("===")
      sell(values[i])
    }
    // sleep(500)
  }
  console.log("cash", cash)
  console.log("crypto", crypto)
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

Date.prototype.yyyymmdd = function () {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
  (mm > 9 ? '' : '0') + mm,
  (dd > 9 ? '' : '0') + dd
  ].join('/');
};

var date = new Date();
date.yyyymmdd();

function buy (price) {
  status = "in"
  crypto = cash / price
  cash = 0
}

function sell (price) {
  status = "out"
  cash = crypto * price
  crypto = 0
}

init()
