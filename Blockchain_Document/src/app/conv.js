const { convertJsToTs, convertJsToTsSync } = require('js-to-ts-converter');


// Async
convertJsToTs('./blockchain_script').then(
    () => console.log('Done!'),
    (err) => console.log('Error: ', err));



// Sync
convertJsToTsSync('./blockchain_script');
console.log('Done!');