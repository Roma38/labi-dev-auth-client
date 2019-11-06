import React, { useState } from "react";
import { Container, Message } from "semantic-ui-react";

import Header from "./components/Header";
import AuthForm from "./components/AuthForm";
import HomePage from "./components/HomePage";
import "./App.css";

function App() {
  const [isAuthorized, setIsAuthorized] = useState(
    Boolean(localStorage.getItem("token") || sessionStorage.getItem("token"))
  );
  const [page, setPage] = useState(isAuthorized ? "HomePage" : "Register"); //правильно было бы реализовать с помощью react-router-dom, но заняло бы больше времени
  const [isMessageHidden, setIsMessageHidden] = useState(true);
  const [messageContent, setMessageContent] = useState("");
  const [isMessagePositive, setIsMessagePositive] = useState(true);

  const showMessage = (content, isPositive) => {
    setIsMessageHidden(false);
    setMessageContent(content);
    setIsMessagePositive(isPositive);
  };

  return (
    <div className="App">
      <Header
        isAuthorized={isAuthorized}
        setIsAuthorized={setIsAuthorized}
        page={page}
        setPage={setPage}
      />
      <Container as="main">
        {isAuthorized ? (
          <HomePage
            setIsAuthorized={setIsAuthorized}
            setPage={setPage}
            showMessage={showMessage}
          />
        ) : (
          <AuthForm
            page={page}
            setIsAuthorized={setIsAuthorized}
            showMessage={showMessage}
          />
        )}
        <Message
          onDismiss={() => setIsMessageHidden(!isMessageHidden)}
          hidden={isMessageHidden}
          content={messageContent}
          positive={isMessagePositive}
          negative={!isMessagePositive}
        />
      </Container>
    </div>
  );
}

export default App;
