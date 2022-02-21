const { convertJsToTs, convertJsToTsSync } = require('js-to-ts-converter');


// Async
convertJsToTs('./aaa/CertSing.js').then(
    () => console.log('Done!'),
    (err) => console.log('Error: ', err));



// Sync
convertJsToTsSync('./aaa/CertSing.js');
console.log('Done!');
