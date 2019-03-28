const signup = (e) => {
  e.preventDefault();
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const passwordRepeat = document.getElementById('passwordRepeat').value.trim();

  fetch('https://epic-m.herokuapp.com/auth/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json' 
    },
    body: JSON.stringify({
      firstName, lastName, email, password
    })
  })
    .then(res => res.json())
    .then((data) => {
      localStorage.setItem('token', data.token);
      console.log(data)
    })
    .catch((err) => {
      console.log(err);
    });
};

document.getElementById('signup').addEventListener('submit', signup);
