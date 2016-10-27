var bmznCustomer = require('./bamazonCustomer.js');
var bmznManager = require('./BamazonManager.js');
var bmznExecutive = require('./BamazonExecutive')

var inquirer = require('inquirer');





inquirer.prompt([
	{
		type: 'list',
		message: 'Which one are you?',
		name: 'choice',
		choices: ["Bamazon Customer", "Bamazon Manager", "Bamazon Executive"]
	}]).then(function(answers) {
		switch (answers.choice) {
			case "Bamazon Customer": 
				bmznCustomer.bamObj.printAllInfo();
				break;

			case "Bamazon Manager":
				bmznManager.managerPrompt();
				break;

			case "Bamazon Executive":
				bmznExecutive.execPrompt();
				break;

		}

	});