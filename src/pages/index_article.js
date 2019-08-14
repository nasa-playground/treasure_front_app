import React from "react";
import { useState, useEffect } from "react";
import { getArticles } from "../api";
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

  return (
    <div>
      <p>{errorMessage}</p>
      {
          articles.map((article, i) => {
              return (
                <div key={i}>
                  <Link to={`/article/${article.id}`}><li>{article.title}</li></Link>
                  <p>{article.body} </p>
                </div>
              );
          })
      }
    </div>
  );
};

export default IndexArticles;