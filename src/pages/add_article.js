import React from "react";
import { useState } from "react";
import { postArticle } from "../api";

export const AddArticle = props => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const createArticle = e => {
    e.preventDefault();

    props.user
      .getIdToken()
      .then(token => {
        return postArticle(token, title, body);
      })
      .then(resp => {
        setMessage("Created!!");
        formReset();
      })
      .catch(e => {
        setErrorMessage(e.toString());
      });
  };

  const formReset = () => {
    setTitle("");
    setBody("");
  };

  return (
    <div>
      <p>{message}</p>
      <p>{errorMessage}</p>
      <form onSubmit={createArticle}>
        <label>タイトル</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label>内容</label>
        <input
          type="textarea"
          value={body}
          onChange={e => setBody(e.target.value)}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};
