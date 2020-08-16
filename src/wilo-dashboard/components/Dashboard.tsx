import React, { useState, useEffect } from "react";
import { FC } from "react";
import { Toolbar } from "./Toolbar";
import { useJiraRecentIssues, useJiraSearch } from "wilo-api";
import { Issue } from "./Issue";
import { Spinner } from "./Spinner";
import { JiraIssue } from "wilo-api/types";
import styled from "styled-components";
import { useDebounce } from "wilo-utils";

export const Dashboard: FC = function () {
  const [searchText, setSearchText] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(false);
  const debouncedSearchText = useDebounce(searchText, 500);

  const {
    error: recentIssuesError,
    data: recentIssuesData,
    loading: recentIssuesLoading,
  } = useJiraRecentIssues({ shouldCache: true }, []);

  const {
    error: searchIssuesError,
    data: searchIssuesData,
    get: fetchSearchIssues,
    loading: searchIssuesLoading,
  } = useJiraSearch(searchText, {});

  useEffect(() => {
    if (debouncedSearchText) fetchSearchIssues();
  }, [fetchSearchIssues, debouncedSearchText]);

  const handleSearchClick = () => setSearchEnabled(true);
  const handleCloseClick = () => {
    setSearchEnabled(false);
    setSearchText("");
  };
  const handleSearchInputChange = (text: string) => setSearchText(text);

  const toolbarLoading = searchEnabled
    ? searchIssuesLoading
    : recentIssuesLoading;

  return (
    <>
      <Toolbar
        loading={toolbarLoading}
        searchText={searchText}
        searchEnabled={searchEnabled}
        onSearchInputChange={handleSearchInputChange}
        onSearchClick={handleSearchClick}
        onCloseClick={handleCloseClick}
      />
      <Spinner />
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
