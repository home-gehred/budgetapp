var express = require('express')
var app = express()

app.get('/expenses', function (req, res) {
  var expenses = [
      {
        id: 1,
        name: "Gas/Electric",
        amount: 280.67,
        duedate: "2016-11-22"
      },
      {
        id: 2,
        name: "Max Education",
        amount: 240.00,
        duedate: "2016-11-5"
      },
      {
        id: 3,
        name: "Holy Family Church",
        amount: 65.00,
        duedate: "2016-11-17"
      },
      {
        id: 4,
        name: "Charlotte Education",
        amount: 240.00,
        duedate: "2016-11-5"
      },
      {
        id: 5,
        name: "WaterBill",
        amount: 275.23,
        duedate: "2016-11-28"
      }
  ];
  res.send(expenses)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
