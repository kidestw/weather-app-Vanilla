// login.js

const form = document.querySelector('#login-form');

form.addEventListener('submit', async event => {

  event.preventDefault();

  // Get credentials
 const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Make login request
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password}) 
  });

  // Handle response  
  if(response.ok) {
    // JWT token
    const { token } = await response.json(); 

    // Save token
    sessionStorage.setItem('token', token);

    // Redirect to index
    window.location.href = 'index.html';

  } else {
    alert('Invalid credentials!');
  }

});