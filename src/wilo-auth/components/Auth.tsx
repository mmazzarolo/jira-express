import React from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import { Onboarding } from "./Onboarding";
import { DomainPicker } from "./DomainPicker";

export function Auth() {
  return (
    <Root>
      <Switch>
        <Route path="/auth/onboarding">
          <Onboarding />
        </Route>
        <Route path="/auth/domain">
          <DomainPicker />
        </Route>
      </Switch>
    </Root>
  );
}

const Root = styled.div`
  width: 320px;
  height: 600px;
  max-height: 600px;
  background: #f7f7f7;
`;
