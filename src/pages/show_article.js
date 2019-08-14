import React from "react";
import { useState, useEffect } from "react";
import { getArticle } from "../api";

const ShowArticle = props => {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const id = props.match.params.id;
    getArticle(id).then(resp => {
      setArticle(resp.Article);
      setComments(resp.Comments);
    });
  }, []);

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.body}</p>
      <h2>コメント</h2>
      <p>id: {article.user_id}</p>

      {comments.map((comment, i) => {
        return (
          <div key={i}>
            <p>{comment.body} </p>
            <p>{comment.created_at}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ShowArticle;
