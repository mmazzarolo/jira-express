import React, { FC } from "react";
import styled from "styled-components";
import { useJiraRecentIssues } from "wilo-api";
import { JiraIssue } from "wilo-api/types";
import { Issue } from "./Issue";

export const RecentIssues: FC = function() {
  const { error, data } = useJiraRecentIssues({
    onMount: true,
    shouldCache: true
  });

  return (
    <Root>
      {error && `Error ${error.message}`}
      {data &&
        data.issues &&
        data.issues.map((issue: JiraIssue) => (
          <Issue data={issue} key={issue.key} />
        ))}
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
