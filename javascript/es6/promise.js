let fs = require('fs');

function readFile(filename) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filename, { encoding: 'utf-8' }, function (err, contents) {
            if (err) {
                reject(err);
                return;
            }

            resolve(contents);
        })
    });
}

let promise = readFile('example.txt');

console.log('promise=>', typeof promise);

// 监听执行完成和执行被拒
promise.then(contents => {
    console.log('success=>', contents);
}, error => {
    console.log('error=>', error);
});

let promise = new Promise(function (resolve, reject) {
    console.log('Promise');
});

console.log('after promise');

