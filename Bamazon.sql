CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50),
    price INTEGER(10) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Nintendo Switch", "video games", 300, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Insignia 40-inch TV", "electronics", 200, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("The Secret", "books", 20, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("diamond earrings", "jewelry", 30, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Black Star", "music", 23, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Machi Koro", "board games", 25, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("vanilla candle", "home accessories", 8, 90);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("M-Audio speakers", "electronics", 60, 21);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Charmin toilet paper", "home supplies", 18, 130);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("The Legend of Zelda: Breath of the Wild", "video games", 60, 45);