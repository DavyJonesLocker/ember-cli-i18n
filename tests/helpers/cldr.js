export default function(value, type, rules, result, path, countryCode) {
  var ruleResults = rules(value, result, path, countryCode);
  deepEqual(ruleResults, { result: type, path: 'result.'+type }, 'with value of: '+value);
}
