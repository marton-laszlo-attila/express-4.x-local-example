const start = () => {

  const handleSumbit = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    fetch('/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error.status === 200) {
          window.location.href = "/login";
        } else {
          console.log(data.error.status + ' error: ' + data.error.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  window.addEventListener('submit', handleSumbit);
}

window.addEventListener('load', start);