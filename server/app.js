var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var path = require('path');
var dataPath = path.join(__dirname, "data/bills/expenses.json");
var _ = require('underscore');
var moment = require('moment');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/expenses', function (req, res) {
  fs.readFile(dataPath, "utf8", function(err,data) {
    if (err) {
      console.log("Error->", err);
      res.status(500).send(err);
    } else {
      var data = JSON.parse(data);
      res.status(200).send(data.expenses);
    }
  });
})

app.post('/expenses/:expenseId', function (req, res) {
  console.log("received:", req.body);
  var routeExpenseId = parseInt(req.params.expenseId, 10);
  console.log("route paarams", routeExpenseId);
  fs.readFile(dataPath, "utf8", function(err,data) {
    if (err) {
      console.log("Error->", err);
      res.status(500).send(err);
    } else {
      var expenseToUpdate = JSON.parse(data);
      var didUpdateHappen = false;
      _.forEach(expenseToUpdate.expenses, function(expense) {
        if ((expense.id === req.body.expenseId) &&
           (expense.id === routeExpenseId) ) {
          //expense.duedate = req.body.dueDate;
          expense.amount = req.body.amount;
          didUpdateHappen = true;
        }
      });
      if (didUpdateHappen) {
        fs.writeFile(dataPath, JSON.stringify(expenseToUpdate, null, "  "), function(error) {
          if (err) {
            console.log("Error saving file ->", err);
            res.status(500).send(err);
          } else {
            res.status(200).send(expenseToUpdate.expenses);
          }
        });
      } else {
        res.status(422).send(new Error("Malformed request"));
      }
    }
  });
})

app.post('/expenses', function (req, res) {
    console.log("received:", req.body);
    fs.readFile(dataPath, "utf8", function(err,data) {
      if (err) {
        console.log("Error->", err);
        res.status(500).send(err);
      } else {
        var data = JSON.parse(data);
        var expensesToUpdate = req.body;
        // basically need to find the same id's
        // update the date then save the file.
        _.forEach(data.expenses, function(expense) {
          var updateExpense = _.find(expensesToUpdate, function(expenseToUpdate) {
            return (expense.id === expenseToUpdate.id);
          });
          if (updateExpense !== undefined) {
            var dueDate = moment(expense.duedate, "YYYY-MM-DD");
            dueDate.add({months:1});
            expense.duedate = dueDate.format("YYYY-MM-DD");
          }
        });
        //console.log("After Filter ->", data);
        fs.writeFile(dataPath, JSON.stringify(data, null, "  "), function(error) {
          if (err) {
            console.log("Error saving file ->", err);
            res.status(500).send(err);
          } else {
            res.status(200).send(data.expenses);
          }
        });
      }
    });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
