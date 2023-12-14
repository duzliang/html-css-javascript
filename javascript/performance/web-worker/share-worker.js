const shareWorker = new SharedWorker('./work.js');

// shareWorker.port.addEventListener('message', function (evt) {
//   console.log('log=>sw receive msg:', evt);
// });

shareWorker.addEventListener('connect', function (evt) {
  let port = evt.ports[0];

  port.addEventListener('message', function (evt) {
    console.log('log=>sw receive msg:', evt);
  });

  port.postMessage('msg from share worker');

  // init connect
  port.start();
})

