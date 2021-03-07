import { Link } from "react-router-dom";

const Profile = (props) => {
  const { user, setUser } = props;

  const handleClickLogout = () => {
    setUser(false);
  }

  return <>
    <h1>Profile</h1>
    <p>
      ID: {user.id}<br />
      Username: {user.username}<br />
    </p>
    <Link onClick={handleClickLogout} to="/">Log out</Link>
  </>
}

export default Profile;