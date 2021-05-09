# mysql-query-builder

A query builder for [NodeJs and MySQL](https://github.com/mysqljs/mysql)

## Installation

```javascript
npm install @nodejscart/mysql-query-builder
```

## Example

### Select query
```javascript
const {select} = require('@nodejscart/mysql-query-builder')

const products = await select("*").from("product").where("product_id", ">", 1).execute(connection);
```
