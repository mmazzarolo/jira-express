import React, { useState, useEffect } from "react";
import { FC } from "react";
import { Toolbar } from "./Toolbar";
import { useJiraRecentIssues, useJiraSearch } from "wilo-api";
import { Issue } from "./Issue";
import { JiraIssue } from "wilo-api/types";
import styled from "styled-components";

export const Dashboard: FC = function () {
  const [searchText, setSearchText] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(false);
  const {
    error: recentIssuesError,
    data: recentIssuesData,
  } = useJiraRecentIssues({ shouldCache: true }, []);
  const {
    error: searchIssuesError,
    data: searchIssuesData,
    get: fetchSearchIssues,
  } = useJiraSearch(searchText, {});
  useEffect(() => {
    if (searchText) fetchSearchIssues();
  }, [fetchSearchIssues, searchText]);
  const handleSearchClick = () => setSearchEnabled(true);
  const handleCloseClick = () => {
    setSearchEnabled(false);
    setSearchText("");
  };
  const handleSearchInputChange = (text: string) => setSearchText(text);
  return (
    <>
      <Toolbar
        searchText={searchText}
        searchEnabled={searchEnabled}
        onSearchInputChange={handleSearchInputChange}
        onSearchClick={handleSearchClick}
        onCloseClick={handleCloseClick}
      />
      {!searchEnabled && (
        <IssuesList>
          {recentIssuesError && `Error ${recentIssuesError.message}`}
          {recentIssuesData?.issues?.map((issue: JiraIssue) => (
            <Issue data={issue} key={issue.key} />
          ))}
        </IssuesList>
      )}
      {searchEnabled && (
        <IssuesList>
          {searchIssuesError && `Error ${searchIssuesError.message}`}
          {searchIssuesData?.issues?.map((issue: JiraIssue) => (
            <Issue data={issue} key={issue.key} />
          ))}
        </IssuesList>
      )}
    </>
  );
};

const IssuesList = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
