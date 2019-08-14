import React from "react";
import firebase from "./firebase";
import { getPrivateMessage } from "./api";
import { useState, useEffect } from "react";

const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    firebase.auth().onAuthStateChanged(u => {
      if (u) {
        setUser(u)
      } else {
        setUser(null)
      }
    });
  });

  const getPrivateMess = () => {
    user.getIdToken().then((token) => {
      return getPrivateMessage(token)
    })
    .then((resp) => {
      console.log(resp)
      setMessage(resp.message)
    })
    .catch((e) => {
      setErrorMessage(e.toString())
    })
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
    </div>
  );
};

export default App;