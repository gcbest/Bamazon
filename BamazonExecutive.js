var inquirer = require('inquirer');
var bamazon = require('./bamazonCustomer.js');


var exports = module.exports = {};

function execPrompt() {
	inquirer.prompt([
	{
		type: 'list',
		message: 'Select an Option',
		name: 'choice',
		choices: ["View Product Sales by Department", "Create New Department"]
	}]).then(function(answers) {
			if (answers.choice == "View Product Sales by Department") {
				bamazon.dab.query("SELECT * FROM Departments", function(err, res) {
				    // console.log("DepartmentID | DepartmentName |  OverHeadCosts |  TotalSales |  TotalProfit");
				    for (var i = 0; i < res.length; i++) {
						var profit =  res[i].TotalSales - res[i].OverHeadCosts;
					    bamazon.dab.query("UPDATE Departments SET TotalProfit= ? WHERE DepartmentID= ?", [profit, res[i].DepartmentID], function(err, res) {
					    	if (err) {
					    		throw (err);
					    	}
					    	// console.log('Total Profit Updated');
					    });

					    console.log(res[i].DepartmentID + " | " + res[i].DepartmentName + " | $" + res[i].OverHeadCosts + " | $" + res[i].TotalSales + " | $" + res[i].TotalProfit);
				    }
				    console.log("-----------------------------------");


				});	
			}
		

			if (answers.choice == "Create New Department") {
				inquirer.prompt([
				{
					type: 'input',
					message: 'What is the name of the department you want to add?',
					name: 'deptName',
				},
				{
					type: 'input',
					message: 'What is the total overhead cost?',
					name: 'cost'
				},
				{
					type: 'input',
					message: 'What is the total sales amount?',
					name: 'sales'
				}
				]).then(function(answers) {
				bamazon.dab.query("INSERT INTO Departments (DepartmentName, OverHeadCosts, TotalSales) VALUES (?, ?, ?)", [answers.deptName, answers.cost, answers.sales], function(err, res) {
					if (err) {
						throw (err);
					}
					var profit =  answers.sales - answers.cost;
				    bamazon.dab.query("UPDATE Departments SET TotalProfit= ? WHERE DepartmentName= ?", [profit, answers.deptName], function(err, res) {
				    	if (err) {
				    		throw (err);
				    	}
				    	console.log('Total Profit Updated');
				    });


					console.log("Department Added");
				});
			});
		}

	});	
}

exports.execPrompt = execPrompt;
