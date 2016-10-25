var inquirer = require('inquirer');
var here = require('./bamazonCustomer.js');

inquirer.prompt([
	{
		type: 'list',
		message: 'Select an Option',
		name: 'choice',
		choices: ["View Product Sales by Department", "Create New Department"]
	}]).then(function(answers) {
			if (answers.choice == "View Product Sales by Department") {
				here.dab.query("SELECT * FROM Departments", function(err, res) {
				    for (var i = 0; i < res.length; i++) {
				        console.log(res[i].DepartmentID + " | " + res[i].DepartmentName + " | $" + res[i].TotalProfit);
				    }
				    console.log("-----------------------------------");

				    var profit =  res[0].TotalSales - res[0].OverHeadCosts;
				    here.dab.query("UPDATE Departments SET TotalProfit= ?", [profit], function(err, res) {
				    	if (err) {
				    		throw (err);
				    	}
				    	console.log('Total Profit Updated');
				    });

			});	
			}
		});