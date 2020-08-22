import React, { useRef } from "react";
import { MemoryRouter, Switch, Route } from "react-router-dom";
import { Auth } from "jexp-auth";
import { Dashboard } from "jexp-dashboard";
import { Search } from "jexp-search";
import { getCurrentJiraDomain } from "jexp-api";
import { Settings } from "jexp-settings";

function getInitialRouterEntries() {
  const domain = getCurrentJiraDomain();
  return domain ? ["/dashboard"] : ["/auth/onboarding"];
}

export function Router() {
  const initialRouterEntriesRef = useRef(getInitialRouterEntries());
  return (
    <MemoryRouter initialEntries={initialRouterEntriesRef.current}>
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
      </Switch>
    </MemoryRouter>
  );
}
