import React from "react";
import { FC } from "react";
import { Toolbar } from "./Toolbar";
import { RecentIssues } from "./RecentIssues";

export const Dashboard: FC = function() {
  return (
    <>
      <Toolbar />
      <RecentIssues />
    </>
  );
};
