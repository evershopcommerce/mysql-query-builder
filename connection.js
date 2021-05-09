const util = require("util");

async function getConnection(pool) {
    return await util.promisify(pool.getConnection).bind(pool)();
}

async function startTransaction(connection) {
    await util.promisify(connection.query).bind(connection)("SET autocommit = 0");
    await util.promisify(connection.query).bind(connection)("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
    await util.promisify(connection.query).bind(connection)("START TRANSACTION");
}

async function commit(connection) {
    await util.promisify(connection.query).bind(connection)("COMMIT");
    await connection.destroy();
}

async function rollback(connection) {
    await util.promisify(connection.query).bind(connection)("ROLLBACK");
    await connection.destroy();
}

export { pool, getConnection, startTransaction, commit, rollback }