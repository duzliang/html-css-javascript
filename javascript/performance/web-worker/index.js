let worker = new Worker('./worker.js');

worker.addEventListener('message', function(evt) {
  console.log('log=>index receive:', evt.data);
});

// Create an 8MB "file" and fill it. 8MB = 1024 * 1024 * 8 B
const uInt8Array = new Uint8Array(1024 * 1024 * 8).map((v, i) => i);
console.log('log=>uInt8Array before:', uInt8Array.byteLength);

// Transfer the underlying buffer to a worker
worker.postMessage(uInt8Array, [uInt8Array.buffer]);
console.log('log=>uInt8Array after:', uInt8Array.byteLength);

// postMessage('message from index');
