import React from "react";
import { Container, Button } from "semantic-ui-react";

function Header({ isAuthorized, setIsAuthorized, page, setPage }) {
  const logOutHandler = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsAuthorized(false);
    setPage("Register");
  };

  return (
    <Container as="header" className="app-header">
      {isAuthorized ? (
        <Button onClick={logOutHandler}>Log Out</Button>
      ) : (
        <Button.Group>
          <Button
            onClick={() => setPage("Register")}
            active={page === "Register"}
          >
            Register
          </Button>
          <Button.Or />
          <Button onClick={() => setPage("Login")} active={page === "Login"}>
            Log In
          </Button>
        </Button.Group>
      )}
    </Container>
  );
}

export default Header;
