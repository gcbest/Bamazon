var inquirer = require('inquirer');
var here = require('./bamazonCustomer.js');


/***********
	Add NUM and > 0 VALIDATION
************/


function managerPrompt(){
	inquirer.prompt([
	{
		type: 'list',
		message: 'Select an Option',
		name: 'choice',
		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
	}]).then(function(answers) {
		switch (answers.choice) {
			case "View Products for Sale": 
				here.printAllInfo();
				break;

			case "View Low Inventory":
				here.dab.query("SELECT * FROM Products WHERE StockQuantity < 5", function(err, res) {
					if (err) {
						throw (err);
					}
					for (var i = 0; i < res.length; i++) {
					    console.log(res[i].ItemID + " | " + res[i].ProductName + " | $" + res[i].Price);
					}
					console.log("-----------------------------------");
				});
				break;

			case "Add to Inventory":
				inquirer.prompt([
				{
					type: 'input',
					message: 'Which Inventory item would you like to increase?',
					name: 'whichItem',
				},
				{
					type: 'input',
					message: 'How many would you like to add?',
					name: 'numItems'
				}
				]).then(function(answers2) {
					here.dab.query("SELECT * FROM Products", function(err, res) {
						for (var i = 0; i < res.length; i++) {
							console.log('this rean');
							if (answers2.whichItem == res[i].ProductName) {
								var newQuantity = res[i].StockQuantity + parseInt(answers2.numItems);
								console.log(newQuantity);
								here.dab.query("UPDATE Products SET StockQuantity= ? WHERE ProductName= ?", [newQuantity, answers2.whichItem], function(err, res) {
									if (err) {
										throw err
									}
									else {
										console.log('Quantity Updated');
									}
								});
							}
						}
					});
				});
				break;

			case "Add New Product":
				inquirer.prompt([
				{
					type: 'input',
					message: 'What is the name of the product you want to add?',
					name: 'prodName',
				},
				{
					type: 'input',
					message: 'What is the name of the department?',
					name: 'deptName'
				},
				{
					type: 'input',
					message: 'Set the price of the product',
					name: 'price'
				},
				{
					type: 'input',
					message: 'Set the stock quantity',
					name: 'quantity'
				}
				]).then(function(answers) {
					
					here.dab.query("INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) VALUES (?, ?, ?, ?)", [answers.prodName, answers.deptName, parseInt(answers.price), parseInt(answers.quantity)], function(err, res) {
						if (err) {
							throw(err);
						}

						console.log('New Item Added');
					})
				})
		}
	});
}	


managerPrompt();
