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
          if (_.isNumber(req.body.amount)) {
            expense.amount = req.body.amount;
            expense.duedate = req.body.dueDate;
            didUpdateHappen = true;
          } else {
              res.status(422).send(new Error("Expecting a number but received: ", req.body.amount));
              return;
          }
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

app.get('/balance', function (req, res) {
  fs.readFile(dataPath, "utf8", function(err,data) {
    if (err) {
      console.log("Error->", err);
      res.status(500).send(err);
    } else {
      var data = JSON.parse(data);
      console.log("Balance ", data.balance);
      res.status(200).send(data.balance);
    }
  });
})

app.post("/balance", function (req, res) {
  console.log("Save Balance Received:", req.body);
  fs.readFile(dataPath, "utf8", function(err,data) {
    if (err) {
      console.log("Error->", err);
      res.status(500).send(err);
    } else {
      var persistObject = JSON.parse(data);
      persistObject.balance.currentBalance = (req.body.balance === undefined) ? persistObject.balance.currentBalance : req.body.balance;
      persistObject.balance.date = (req.body.date === undefined) ? persistObject.balance.date : req.body.date;

      fs.writeFile(dataPath, JSON.stringify(persistObject, null, "  "), function(error) {
        if (err) {
          console.log("Error saving file ->", err);
          res.status(500).send(err);
        } else {
          res.status(200).send(persistObject.balance);
        }
      });
    }
  });
})

// TODO: should validate date is ####-##-## where -##- is valid only if it is 1-12 and -##
//       is valid only when 1-31. Otherwise return bad request with good msg.
// TODO: expense.institution should be renamed to expense.groupid
app.post("/groupupdateduedate", function (req, res) {
  console.log("Post institution received:", req.body);
  var validDueDate = req.body.dueDate;
  var validInstitution = req.body.institution;
  fs.readFile(dataPath, "utf8", function(err,data) {
    if (err) {
      console.log("Error->", err);
      res.status(500).send(err);
    } else {
      var expenseToUpdate = JSON.parse(data);
      var didUpdateHappen = false;
      _.forEach(expenseToUpdate.expenses, function(expense) {
        if (expense.institution !== undefined) {
          if (expense.institution === validInstitution) {
            expense.duedate = validDueDate;
            didUpdateHappen = true;
          }
        }
      });
      if (didUpdateHappen) {
        fs.writeFile(dataPath, JSON.stringify(expenseToUpdate, null, "  "), function(error) {
          if (err) {
            console.log("Error saving file ->", err);
            res.status(500).send(err);
          } else {
            res.status(200).send({
              institution: validInstitution,
              duedate: validDueDate});
          }
        });
      } else {
        res.status(422).send(new Error("Group " + validInstitution + " was not found in expenses."));
      }
    }
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
