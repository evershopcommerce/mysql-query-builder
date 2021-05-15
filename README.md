# MySQL-query-builder

A query builder for [NodeJs and MySQL](https://github.com/mysqljs/mysql)

## Installation

```javascript
npm install @nodejscart/mysql-query-builder
```

## Example

#### Simple select
```javascript
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'me',
//   password : 'secret',
//   database : 'my_db'
// });

// connection.connect();
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
```
#### More complex where
```javascript
// var mysql = require('mysql');
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'me',
//   password : 'secret',
//   database : 'my_db'
// });

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
#### Event more complex where
```javascript
// var mysql = require('mysql');
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'me',
//   password : 'secret',
//   database : 'my_db'
// });

// connection.query('SELECT * FROM product WHERE (product_id > ? AND sku LIKE ?) OR price > ?', [1, "sku", 100], function (error, results, fields) {
//   if (error) throw error;
//    console.log('The solution is: ', results[0].solution);
// });
```
```javascript
const {select} = require('@nodejscart/mysql-query-builder')

const query = select("*").from("product");
query.where("product_id", ">", 1).and("sku", "LIKE", "sku");
query.andWhere("price", ">", 100);

const products = await query.execute(connection);
```
#### Insert&update
<table>
<tr>
<th> user_id </th>
<th> name </th>
<th> email </th>
<th> phone </th>
<th> status </th>
</tr>
<tr>
<td>
  1
</td>
<td>
  David
</td>
<td>
  emai@email.com
</td>
<td>
  123456
</td>
<td>
  1
</td>
</tr>
</table>

```javascript
// var mysql = require('mysql');
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'me',
//   password : 'secret',
//   database : 'my_db'
// });

//  connection.query('INSERT INTO user SET name=?, email=?, phone=?, status=?', ["David", "email@email.com", "123456", 1], function (error, results, fields) {
//    if (error) {
//      return connection.rollback(function() {
//        throw error;
//      });
//    }
//  });
```
```javascript
const {insert} = require('@nodejscart/mysql-query-builder')

const query = insert("user")
.given({name: "David", email: "email@email.com", "phone": "123456", status: 1, notExistedColumn: "This will not be a part of query"});
await query.execute(connection);
```
```javascript
const {update} = require('@nodejscart/mysql-query-builder')

const query = update("user")
.given({name: "David", email: "email@email.com", "phone": "123456", status: 1, notExistedColumn: "This will not be a part of query"})
.where("user_id", "=", 1);
await query.execute(connection);
```
