import React from "react";
import firebase from "./firebase";
import { AddArticle } from "./pages/add_article";
import { getPrivateMessage } from "./api";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged(u => {
      if (u) {
        setUser(u);
      } else {
        setUser(null);
      }
    });
  });

  const getPrivateMess = () => {
    user
      .getIdToken()
      .then(token => {
        return getPrivateMessage(token);
      })
      .then(resp => {
        setMessage(resp.message);
      })
      .catch(e => {
        setErrorMessage(e.toString());
      });
  };

  return (
    <div>
      {user === null ? (
        <button onClick={firebase.login}>Please login</button>
      ) : null}
      <div>{message}</div>
      <p>{errorMessage}</p>
      <button onClick={() => getPrivateMess()}>Get Private Message</button>
      <button onClick={firebase.logout}>Logout</button>
      <MainConponent user={user} />
    </div>
  );
};

const MainConponent = props => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/add_article">Add article</Link>
            </li>
            <li>
              <Link to="/show_article">Show article</Link>
            </li>
            <li>
              <Link to="/update_article/">Update article</Link>
            </li>
          </ul>
        </nav>

        <Route
          path="/add_article"
          render={() => <AddArticle user={props.user} />}
        />
      </div>
    </Router>
  );
};

export default App;
