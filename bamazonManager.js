var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "Bamazon"
});

connection.connect(function(err) {
	if (err) throw err;
});

function products() {
	connection.query("SELECT * FROM products", function(err, resp) {
		for (var i = 0; i < resp.length; i++) {
			console.log("Item ID: " + resp[i].item_id);
			console.log("Name: " + resp[i].product_name);
			console.log("Department: " + resp[i].department_name);
			console.log("Price: " + resp[i].price);
			console.log("Quantity: " + resp[i].stock_quantity + "\n");
		}
	});
}

function low() {
	connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, resp) {
		for (var i = 0; i < resp.length; i++) {
			console.log("Item ID: " + resp[i].item_id);
			console.log("Name: " + resp[i].product_name);
			console.log("Department: " + resp[i].department_name);
			console.log("Price: " + resp[i].price);
			console.log("Quantity: " + resp[i].stock_quantity + "\n");
		}
	});
}

function addInventory() {
	var itemArray = [];
	connection.query("SELECT product_name FROM products", function(err, resp) {
		if (err) throw err;
		for (var i = 0; i < resp.length; i++) {
			itemArray.push(resp[i].product_name);
		}
		inquirer.prompt([
			{
				type: "list",
				name: "item",
				message: "Which item do you wish to add inventory to?",
				choices: itemArray
			}
		]).then(function(answers) {
			var item = answers.item;
			inquirer.prompt([
				{
					type: "input",
					name: "quantity",
					message: "How much inventory do you want to add?"
				}
			]).then(function(answers2) {
				var currentInv = 0;
				connection.query("SELECT stock_quantity FROM products WHERE ?", [{product_name: item}], function(err, resp) {
					if (err) throw err;
					currentInv = resp[0].stock_quantity;
					connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: Number(currentInv) + Number(answers2.quantity)}, {product_name: item}], function(err, resp) {
						if (err) throw err;
						console.log("Inventory updated!");
						pick();
					})
				})
			});
		});
	})
}

function addNewItem() {
	inquirer.prompt([
		{
			type: "input",
			name: "name",
			message: "Name of new item?"
		},
		{
			type: "input",
			name: "department",
			message: "Department for new item?"
		},
		{
			type: "input",
			name: "price",
			message: "Price of new item? (Numerals only)"
		},
		{
			type: "input",
			name: "inventory",
			message: "How many units of the new item?"
		}
	]).then(function(answers) {
		connection.query("INSERT INTO products SET ?", [{product_name: answers.name, department_name: answers.department, price: answers.price, stock_quantity: answers.inventory}], function(err) {
			if (err) throw err;
		});
		console.log("Your item was added!");
		pick();
	})
}

function pick() {
	inquirer.prompt([
		{
			type: "list",
			name: "choice",
			message: "What do you want to do?",
			choices: [
				"View Products for Sale",
				"View Low Inventory",
				"Add to Inventory",
				"Add New Product"
			]
		}
	]).then(function(answers) {
		if (answers.choice == "View Products for Sale") {
			products();
			setTimeout(pick, 500);
		} else if (answers.choice == "View Low Inventory") {
			low();
			setTimeout(pick, 500);
		} else if (answers.choice == "Add to Inventory") {
			addInventory();
		} else if (answers.choice == "Add New Product"){
			addNewItem();
		}
	});
}

pick();