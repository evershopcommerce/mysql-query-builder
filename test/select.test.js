const { select } = require('../index.js');

test('Simple select', () => {
    expect(select().from("product").sql()).toBe("SELECT * FROM `product` LIMIT 0, 1000000000");
});