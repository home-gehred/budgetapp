var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var path = require('path');
var dataPath = path.join(__dirname, "bills/expenses.json");
var _ = require('underscore');
var moment = require('moment');
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5001'
}));
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
          console.log("Responding to ->", persistObject.balance)
          res.status(200).send(persistObject.balance);
        }
      });
    }
  });
})

app.post("/groupupdateduedate", function (req, res) {
  console.log("Post groupupdateduedate received:", req.body);
  var hasError = (moment(req.body.dueDate, "YYYY-MM-DD", true).isValid() === false);
  if (hasError || (req.body.groupId === undefined))
  {
    var badRequestError = JSON.stringify(req.body) + " is not valid, check dueDate is in YYYY-MM-DD format, and groupId has a value.";
    console.log("Bad request error:", badRequestError);
    res.status(400).send({error: badRequestError});
    return;
  }

  var validDueDate = req.body.dueDate;
  var validGroupId = req.body.groupId;
  fs.readFile(dataPath, "utf8", function(err,data) {
    if (err) {
      console.log("Error->", err);
      res.status(500).send(err);
    } else {
      var expenseToUpdate = JSON.parse(data);
      var didUpdateHappen = false;
      _.forEach(expenseToUpdate.expenses, function(expense) {
        if (expense.groupid !== undefined) {
          if (expense.groupid === validGroupId) {
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
              groupId: validGroupId,
              duedate: validDueDate});
          }
        });
      } else {
        var unprocessableError = "Group " + validInstitution + " was not found in expenses."
        res.status(422).send({error: unprocessableError});
      }
    }
  });
});

app.use('/public', express.static('public'))
app.use('/fonts', express.static('public'))
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

