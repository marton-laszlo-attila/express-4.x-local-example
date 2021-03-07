import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import './App.css';

import Home from "./component/Home";
import Registration from "./component/Registration";
import Login from "./component/Login";
import Profile from "./component/Profile";

function App() {
  const [user, setUser] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/registration">
            <Registration />
          </Route>
          <Route exact path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route exact path="/profile">
            <Profile setUser={setUser} user={user} />
          </Route>
          <Route exact path="/">
            <Home user={user} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
