const form = document.querySelector('#register-form');

form.addEventListener('submit', async event => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {
      name,
      email,
      password
    } ) 
  });

  window.location.href = 'login.html';
});