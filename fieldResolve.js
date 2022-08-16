module.exports = exports = {};

exports.fieldResolve = function fieldResolve(fieldName) {
  // replace all regex
  let tokens = fieldName.replace(/'|"|`/g, '').split('.').filter(token => token !== '');
  if (tokens.length === 1) {
    return `\`${tokens[0]}\``
  } else if (tokens.length === 2) {
    return `\`${tokens[0]}\`.\`${tokens[1]}\``
  } else {
    throw new Error(`Invalid field name ${fieldName}`);
  }
}