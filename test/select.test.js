const { select } = require('../index.js');
const parser = require('js-sql-parser');

function parseSql(query) {
    if (!query || typeof query !== "string")
        return false;
    let tokens = query.split(" ").map((e) => {
        if (e.substr(0, 1) === ":") {
            let count = e.split(")").length - 1;
            let t = (Array.apply(null, Array(count)).map(e => ")").join(""));
            return `"dummy"${t}`;
        } else {
            return e;
        }
    });

    let sql = tokens.join(" ");
    console.log(sql);
    try {
        const ast = parser.parse(sql);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}


//parser.astify('SELECT * FROM `product` WHERE (name LIKE "dummy" AND sku = "dummy") LIMIT 0, 1000000000');
test('Simple select', () => {
    expect(parseSql(select().from("product").sql())).toBe(true);
});

test('Select with function', () => {
    let query = select().from("product");
    query.select("SUM(product.id)");
    query.select("SUM (product.id)");
    query.select("SUM ( product.id )", "sum");
    query.where("name", "LIKE", "abc");
    query.limit(2, '5');
    expect(parseSql(query.sql())).toBe(true);
});


test('Simple select with where', () => {
    let query = select().from("product");
    query.where("name", "LIKE", "abc");
    query.limit(2, '5');
    expect(parseSql(query.sql())).toBe(true);
});

test('More complex where', () => {
    let query = select().from("product");
    query.where("name", "LIKE", "abc").and("sku", "=", "abc");
    expect(parseSql(query.sql())).toBe(true);
});

test('More and more complex where', () => {
    let query = select().from("product");
    query.where("name", "LIKE", "abc").and("sku", "=", "abc");
    query.andWhere("price", ">", 100).or("stock", ">=", "1");
    expect(parseSql(query.sql())).toBe(true);
});

test('Reset where', () => {
    let query = select().from("product");
    query.where("name", "LIKE", "abc").and("sku", "=", "abc");
    query.where("price", ">", 100).or("stock", ">=", "1");
    expect(parseSql(query.sql())).toBe(true);
});

test('Or where', () => {
    let query = select().from("product");
    query.where("name", "LIKE", "abc").and("sku", "=", "abc");
    query.orWhere("price", ">", 100).or("stock", ">=", "1");
    expect(parseSql(query.sql())).toBe(true);
});

test('Left join', () => {
    let query = select().from("product");
    query.where("name", "LIKE", "abc").and("sku", "=", "abc");
    query.leftJoin("price").on("product.id", "=", "price.`id`");
    expect(parseSql(query.sql())).toBe(true);
});

test('Left join', () => {
    let query = select().from("product");
    query.where("name", "LIKE", "abc").and("sku", "=", "abc");
    query.leftJoin("price").on("product.id", "=", "1");
    expect(parseSql(query.sql())).toBe(true);
});

test('Multi Left join', () => {
    let query = select().from("product");
    query.where("name", "LIKE", "abc").and("sku", "=", "abc");
    query.leftJoin("price").on("product.id", "=", "price.`id`");
    query.leftJoin("inventory").on("product.id", "=", "inventory.`id`");
    expect(parseSql(query.sql())).toBe(true);
});

test('Right join', () => {
    let query = select().from("product");
    query.where("name", "LIKE", "abc").and("sku", "=", "abc");
    query.rightJoin("price").on("product.id", "=", "price.`id`");
    expect(parseSql(query.sql())).toBe(true);
});

test('Multi Right join', () => {
    let query = select().from("product");
    query.where("name", "LIKE", "abc").and("sku", "=", "abc");
    query.rightJoin("price").on("product.id", "=", "price.`id`");
    query.rightJoin("inventory").on("product.id", "=", "inventory.`id`");
    expect(parseSql(query.sql())).toBe(true);
});

test('Right and left join', () => {
    let query = select().from("product");
    query.where("name", "LIKE", "abc").and("sku", "=", "abc");
    query.rightJoin("price").on("product.id", "=", "price.`id`");
    query.leftJoin("inventory").on("product.id", "=", "inventory.`id`");
    expect(parseSql(query.sql())).toBe(true);
});

test('Inner join', () => {
    let query = select().from("product");
    query.where("name", "LIKE", "abc").and("sku", "=", "abc");
    query.innerJoin("price");
    expect(parseSql(query.sql())).toBe(true);
});

test('Inner join', () => {
    let query = select().from("product");
    query.where("name", "LIKE", "abc").and("sku", "=", "abc");
    query.innerJoin("price").on("product.id", "=", "price.`id`");
    expect(parseSql(query.sql())).toBe(true);
});


test('Inner&left join', () => {
    let query = select().from("product");
    query.where("name", "LIKE", "abc").and("sku", "=", "abc");
    query.innerJoin("price").on("product.id", "=", "price.`id`");
    query.leftJoin("inventory").on("product.id", "=", "inventory.`id`");
    expect(parseSql(query.sql())).toBe(true);
});

test('Inner&right join', () => {
    let query = select().from("product");
    query.where("name", "LIKE", "abc").and("sku", "=", "abc");
    query.innerJoin("price").on("product.id", "=", "price.`id`");
    query.rightJoin("inventory").on("product.id", "=", "inventory.`id`");
    expect(parseSql(query.sql())).toBe(true);
});

// Group by

test('Group by', () => {
    let query = select().from("product");
    query.where("name", "LIKE", "abc").and("sku", "=", "abc");
    query.leftJoin("price").on("product.id", "=", "price.`id`");
    query.groupBy("product.id");
    query.groupBy("product.price");
    expect(parseSql(query.sql())).toBe(true);
});

// Having

test('Having', () => {
    let query = select().from("product");
    query.where("name", "LIKE", "abc").and("sku", "=", "abc");
    query.leftJoin("price").on("product.id", "=", "price.`id`");
    query.groupBy("product.id");
    query.having("SUM(product.id)", "=", 1);
    expect(parseSql(query.sql())).toBe(true);
});

// Limit

test('Limit', () => {
    let query = select().from("product");
    query.where("name", "LIKE", "abc").and("sku", "=", "abc");
    query.leftJoin("price").on("product.id", "=", "price.`id`");
    query.groupBy("product.id");
    query.having("SUM(product.id)", "=", 1);
    query.limit(10);
    expect(parseSql(query.sql())).toBe(true);
});


test('Limit', () => {
    let query = select().from("product");
    query.where("name", "LIKE", "abc").and("sku", "=", "abc");
    query.leftJoin("price").on("product.id", "=", "price.`id`");
    query.groupBy("product.id");
    query.having("SUM(product.id)", "=", 1);
    query.limit(1, "10");
    expect(parseSql(query.sql())).toBe(true);
});

// Order by

test('Limit', () => {
    let query = select().from("product");
    query.where("name", "LIKE", "abc").and("sku", "=", "abc");
    query.leftJoin("price").on("product.id", "=", "price.`id`");
    query.groupBy("product.id");
    query.having("SUM(product.id)", "=", 1);
    query.limit(10);
    query.orderBy("product.id");
    expect(parseSql(query.sql())).toBe(true);
});

test('Limit', () => {
    let query = select().from("product");
    query.where("name", "LIKE", "abc").and("sku", "=", "abc");
    query.leftJoin("price").on("product.id", "=", "price.`id`");
    query.groupBy("product.id");
    query.having("SUM(product.id)", "=", 1);
    query.limit(10);
    query.orderBy("product.id", "ASC");
    expect(parseSql(query.sql())).toBe(true);
});