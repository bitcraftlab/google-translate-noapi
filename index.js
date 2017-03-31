var fetch = require('node-fetch');

module.exports = function(text, opts = {}) {

  // default languages
  var source = 'en' || opts.source;
  var target = 'de' || opts.target;

  // feedback
  console.log("Translating " + source + " to " + target);

  // Use the free google translate API (no API key required)
  var url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl='
  + source + "&tl=" + target + "&dt=t&q=" + encodeURI(text);

  // Parse google's sparse array json, by inserting null values
  var parseJSON =  txt => JSON.parse(txt.split(',').map( x => x || 'null').join(',')) ;

  // Join the snippets from google translate
  var joinSnippets = json => json[0].map( x => x[0] ).join('');

  // fetch the translation from google and extract it
  return fetch(url)
  .then( res => res.text())
  .then( text => joinSnippets(parseJSON(text)) )
  .catch( reason => console.log('Google Translate: ' + reason)  )

}
