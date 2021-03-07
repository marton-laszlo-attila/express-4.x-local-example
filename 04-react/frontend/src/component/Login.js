import { useHistory } from 'react-router-dom'

const Login = (props) => {
  const { setUser } = props;
  const history = useHistory();

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error.status === 200) {
          history.push('/');
          setUser(data.user);
        } else {
          console.log(data.error.status + ' error: ' + data.error.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }

  return <>
    <h1>Login</h1>
    <form onSubmit={handleSubmitForm}>
      <div>
        <label>Username:</label>
        <input type="text" name="username" /><br />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" />
      </div>
      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  </>
}

export default Login;