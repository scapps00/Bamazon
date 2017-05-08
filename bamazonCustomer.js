var mysql = require("mysql");
var promptly = require("promptly");

var productId = 0;

var item = {};

var stock = 0;

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

connection.query("SELECT * FROM products", function(err, resp) {
	for (var i = 0; i < resp.length; i++) {
		console.log("Item ID: " + resp[i].item_id);
		console.log("Name: " + resp[i].product_name);
		console.log("Department: " + resp[i].department_name);
		console.log("Price: " + resp[i].price + "\n");
	}
});

function compareAmount() {
	if (item.stock_quantity == 0) {
		console.log("Sorry. We are out of that product. Please pick something else.");
		buyID();
	} else {
		connection.query("UPDATE products SET? WHERE?", [{stock_quantity: stock - 1}, {item_id: productID}]);
		console.log("Thank you for your purchase! Can we help you with anything else?");
		connection.query("SELECT * FROM products", function(err, resp) {
			for (var i = 0; i < resp.length; i++) {
				console.log("Item ID: " + resp[i].item_id);
				console.log("Name: " + resp[i].product_name);
				console.log("Department: " + resp[i].department_name);
				console.log("Price: " + resp[i].price + "\n");
			}
		});
		buyID();
	}
}

function buyAmount() {
	promptly.prompt("How many do you want to buy?").then(function(value2) {
		var rounded = Math.round(value2);
		console.log(value2);
		console.log(rounded);
		if (Number(value2) !== Number(rounded)) {
			console.log("That is not an integer!");
			buyAmount();
		} else {
			connection.query("SELECT * FROM products WHERE?", {
				item_id: productID
			},
				function(err, resp) {
					item = resp;
					console.log(resp[0]);
					stock = resp[0].stock_quantity;
					compareAmount();	
				});
		}
	});
}

function buyID() {
	promptly.prompt("What ID would you like to purchase?").then(function(value) {
		productID = value;
		buyAmount();
	})
}

setTimeout(buyID, 500);