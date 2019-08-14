import React from "react";
import { useState, useEffect } from "react";
import { getArticle } from "../api";

const UpdateArticle = props => {
  const [article, setArticle] = useState({});
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  useEffect(() => {
    const id = props.p.match.params.id;

    getArticle(id).then(resp => {
      setArticle(resp.Article);
      setTitle(resp.Article.title)
      setBody(resp.Article.body);
    });
  }, []);

  return (
    <div>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <textarea value={body} onChange={(e) => setBody(e.target.value)} />
      <input type="submit" />
    </div>
  );
};

export default UpdateArticle;
