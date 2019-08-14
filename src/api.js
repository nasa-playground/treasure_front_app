const API_ENDPOINT = process.env.REACT_APP_BACKEND_API_BASE;

export const getPrivateMessage = function(idToken) {
  return fetch(`${API_ENDPOINT}/private`, {
    method: "get",
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    credentials: "same-origin"
  }).then(res => {
    if (res.ok) {
      console.log(res)
      return res.json();
    } else {
      throw Error(`Request rejected with status ${res.status}`);
    }
  });
};

export const postArticle = (idToken, title, body) => {
  return fetch(`${API_ENDPOINT}/articles`, {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${idToken}`
    }),
    body: JSON.stringify({ article: { title: title, body: body } }),
    credentials: "same-origin"
  }).then(res => {
    if (!res.ok) {
      throw Error(`Request rejected with status ${res.status}`);
    }
  });
};

export const getPublicMessage = function() {
  return fetch(`${API_ENDPOINT}/public`);
};
