addEventListener('message', function(evt) {
  console.log('log=>worker receive:', evt.data);
});

postMessage('a reply from worker');
