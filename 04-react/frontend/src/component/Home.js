import { Link } from "react-router-dom";

const Home = (props) => {
  const { user } = props;

  return <>
    <h1>Home</h1>
    {user ?
      <p>Hello, {user.username}. View your <Link to="/profile">profile</Link>.</p> :
      <p>Welcome! Please <Link to="/login">log in</Link> or <Link to="/registration">registration</Link>.</p>
    }
  </>
}

export default Home;