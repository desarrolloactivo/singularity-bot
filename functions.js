var macd = require('macd')
var data = require('./data')

var status = "out" // in, out
var cash = 1000
var crypto = 0
var orders = {}


function init() {
  // Get histogram
  var values = data.getList
  var hist = macd(values, 26, 12, 9).histogram

  // Foreach data
  for (let i = 0; i < hist.length; i ++) {
    const el = hist[i];
    console.log("cash", cash)
    console.log("crypto", crypto)
    console.log("===")
    console.log("value", values[i])
    console.log("macd", el)
      
    if (status == "out" && el > 0) {
      buy (values[i])
    }
    
    if (status == "in" && el < 0) {
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
