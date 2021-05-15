# MySQL-query-builder

A query builder for [NodeJs and MySQL](https://github.com/mysqljs/mysql)

## Installation

```javascript
npm install @nodejscart/mysql-query-builder
```

## Example

### Select
```javascript
// var mysql = require('mysql');
//
// connection.query('SELECT * FROM product WHERE product_id > ?', [1], function (error, results, fields) {
//   if (error) throw error;
//    console.log('The solution is: ', results[0].solution);
// });
```
```javascript
const {select} = require('@nodejscart/mysql-query-builder')

const products = await select("*")
.from("product")
.where("product_id", ">", 1)
.execute(connection);


// var mysql = require('mysql');
//
// connection.query('SELECT * FROM product WHERE product_id > ? AND sku LIKE ?', [1, "sku"], function (error, results, fields) {
//   if (error) throw error;
//    console.log('The solution is: ', results[0].solution);
// });
```
```javascript
const {select} = require('@nodejscart/mysql-query-builder')

const products = await select("*")
.from("product")
.where("product_id", ">", 1)
.and("sku", "LIKE", "sku")
.execute(connection);
```
