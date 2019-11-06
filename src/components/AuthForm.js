import React, { useState } from "react";
import { Form, Header } from "semantic-ui-react";

import { API_HOST } from "../config";

function AuthForm({ page, setIsAuthorized, showMessage }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const submitHandler = async () => {
    const response = await fetch(`${API_HOST}/${page}`, {
      method: "POST",
      body: JSON.stringify({ login, password }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      const { message } = await response.json();
      return showMessage(message, false);
    }

    const { token } = await response.json();

    if (token) {
      rememberMe
        ? localStorage.setItem("token", token)
        : sessionStorage.setItem("token", token);

      setIsAuthorized(true);
      showMessage(
        `You was succesfuly ${
          page === "Register" ? "registred" : "logged in"
        }!`,
        true
      );
    }
  };

  return (
    <>
      <Header as="h2">{page}</Header>
      <Form onSubmit={submitHandler}>
        <Form.Input
          required
          placeholder="Login"
          name="login"
          label="Login:"
          value={login}
          onChange={(e, { value }) => setLogin(value)}
        />
        <Form.Input
          required
          placeholder="Password"
          name="password"
          label="Password:"
          value={password}
          onChange={(e, { value }) => setPassword(value)}
          type="password"
        />
        <Form.Checkbox
          name="rememberMe"
          label="Remember me"
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
        />
        <Form.Button content="Submit" />
      </Form>
    </>
  );
}

export default AuthForm;
