import React from "react";
import { useState, useEffect } from "react";
import { getArticles, DeleteArticle } from "../api";
import { Link } from "react-router-dom";

const IndexArticles = props => {
  const [articles, setArticles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
      getArticles(props.id)
        .then(resp => {
          setArticles(resp);
        })
        .catch(e => {
          setErrorMessage(e.toString());
        });
  }, []);

  const deleteArticle = id => {
    props.user
      .getIdToken()
      .then(token => {
        return DeleteArticle(id, token);
      })
      .then(resp => {
        window.location.reload();
      })
      .catch(e => {
        setErrorMessage(e.toString());
      });
  };


  return (
    <div>
      <p>{errorMessage}</p>
      {
          articles.map((article, i) => {
              return (
                <div key={i}>
                  <Link to={`/article/${article.id}`}><li>{article.title}</li></Link>
                  <p>{article.body} </p>
                  <a onClick={() => deleteArticle(article.id)}>削除</a>
                  <Link to={`/update_article/${article.id}`}>編集</Link>
                </div>
              );
          })
      }
    </div>
  );
};

export default IndexArticles;