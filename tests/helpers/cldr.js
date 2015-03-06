export default function(assert, value, type, rules, result, path, countryCode) {
  var ruleResults = rules(value, result, path, countryCode);
  assert.deepEqual(ruleResults, { result: type, path: 'result.'+type }, 'with value of: '+value);
}
