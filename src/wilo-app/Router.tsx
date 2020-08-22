import React, { useRef } from "react";
import { MemoryRouter, Switch, Route } from "react-router-dom";
import { Auth } from "wilo-auth";
import { Dashboard } from "wilo-dashboard";
import { Search } from "wilo-search";
import { getCurrentJiraDomain } from "wilo-api";
import { Settings } from "wilo-settings";

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
