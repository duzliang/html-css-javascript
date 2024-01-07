const btn = document.querySelector('.btn-toggle');

btn.addEventListener('click', () => {
  //  method 1: use body class
  // document.body.classList.toggle('dark-theme');

  // method 2: use separated css file
  // const link = document.querySelector('#theme-link');
  // if (link.getAttribute('href') === './light-theme.css') {
  //   link.href = './dark-theme.css';
  // } else {
  //   link.href = './light-theme.css';
  // }

  // method 3: use custom properties
  document.body.classList.toggle('dark-theme');
});
