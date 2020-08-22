import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GlobalStyle } from "jexp-design";
import { initializeJiraDomainManager, initializeJiraRestApi } from "jexp-api";
import { Router } from "./Router";

export function App() {
  const [initialized, setInitialized] = useState(false);
  const initialize = async () => {
    await Promise.all([initializeJiraDomainManager(), initializeJiraRestApi()]);
    setInitialized(true);
  };
  useEffect(() => {
    initialize();
  }, [initialized]);
  return (
    <>
      <GlobalStyle />
      <Root>{initialized && <Router />}</Root>
    </>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 600px;
  min-width: 320px;
  max-width: 600px;
  min-height: 600px;
  max-height: 600px;
  background-color: white;

  &::-webkit-scrollbar {
    display: none;
  }
`;
