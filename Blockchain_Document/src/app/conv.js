const { convertJsToTs, convertJsToTsSync } = require('js-to-ts-converter');


// Async
convertJsToTs('./aaa').then(
    () => console.log('Done!'),
    (err) => console.log('Error: ', err));



// Sync
convertJsToTsSync('./aaa');
console.log('Done!');
