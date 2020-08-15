import React from "react";
import styled from "styled-components";
import { MemoryRouter, Switch, Route } from "react-router-dom";
import { Auth } from "wilo-auth";
import { Dashboard } from "wilo-dashboard";
import { GlobalStyle } from "wilo-design";
import { getJiraDomain } from "wilo-api";

function getInitialEntries() {
  const domain = getJiraDomain();
  return domain ? ["/dashboard"] : ["/auth/onboarding"];
}

const initialEntries = getInitialEntries();

export function App() {
  return (
    <>
      <GlobalStyle />
      <Root>
        <MemoryRouter initialEntries={initialEntries}>
          <Switch>
            <Route path="/auth">
              <Auth />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </MemoryRouter>
      </Root>
    </>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 600px;
  max-height: 600px;
  background-color: white;

  &::-webkit-scrollbar {
    display: none;
  }
`;
