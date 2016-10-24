/***********
	Add NUM and > 0 VALIDATION
************/

var mysql = require('mysql');
var inquirer = require('inquirer');
var exports = module.exports = {};

var bamazon_db = mysql.createConnection({
	host: 'sp6xl8zoyvbumaa2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
	port: 3306,
	user: 'nm8bonk1ppfdd3v9',
	password: 'xwsksy9iq386vvhx',
	database: 'ds5vfqjdiqobm84y'
});

function insert() {
	return "INSERT INTO Products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('alpha', 'omega', 50, 100)";
}

function printAllInfo() {
	bamazon_db.query("SELECT * FROM Products", function(err, res) {
	    for (var i = 0; i < res.length; i++) {
	        console.log(res[i].ItemID + " | " + res[i].ProductName + " | $" + res[i].Price);
	    }
	    console.log("-----------------------------------");
	    askForOrder();
	});
}

function askForOrder() {
	inquirer.prompt([
	{
		type: 'input',
		message: 'Please enter the ItemID of your purchase',
		name: 'ID',
		validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
    	}
	},
	{
		type: 'input',
		message: 'How many units would you like to buy?',
		name: 'numUnits'	
	}
	]).then(function(answers) {
		console.log('Checking store');
		bamazon_db.query("SELECT * FROM Products", function(err, res) {
			for (var i = 0; i < res.length; i++){
				if(parseInt(answers.ID) === res[i].ItemID) {
					if((res[i].StockQuantity > 0)  && (res[i].StockQuantity - parseInt(answers.numUnits) > 0)) {
						var newStockQuantity = res[i].StockQuantity - parseInt(answers.numUnits);
						console.log(newStockQuantity);
						// updateStockQuantity(answers.ID, newStockQuantity)
						bamazon_db.query("UPDATE Products SET StockQuantity= ? WHERE ItemID= ?", [newStockQuantity, answers.ID], function(err, res){
							if (err) {throw (err)}
							console.log('Order Placed');
							// console.log('New Stock: ' + res[i].StockQuantity);
						});
						
					}
					else {
						console.log('Insufficient Quantity!');
					}
				}	
			}	
		});
	});	
}

// printAllInfo();

exports.printAllInfo = function() {
	bamazon_db.query("SELECT * FROM Products", function(err, res) {
	    for (var i = 0; i < res.length; i++) {
	        console.log(res[i].ItemID + " | " + res[i].ProductName + " | $" + res[i].Price);
	    }
	    console.log("-----------------------------------");
	});
}

// exports.dab = bamazon_db;

