import React from "react";
import { Button } from "semantic-ui-react";

import { API_HOST } from "../config";

function HomePage({ setIsAuthorized, setPage, showMessage }) {
  const checkHandler = () => {
    fetch(`${API_HOST}/is-logged-in`, {
      method: "GET",
      headers: {
        Authorization:
          localStorage.getItem("token") || sessionStorage.getItem("token"),
        Accept: "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          localStorage.clear();
          sessionStorage.clear();
          setIsAuthorized(false);
          setPage("Register");
          return Promise.reject(response);
        }
        return response.json();
      })
      .then(({ login }) => showMessage(`You logged in as ${login}`, true))
      .catch(async response => {
        const { message } = await response.json();
        showMessage(message, false);
      });
  };

  return <Button onClick={checkHandler}>Check is Logged in</Button>;
}

export default HomePage;
