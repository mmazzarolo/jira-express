import React, { useState, useEffect } from "react";
import { FC } from "react";
import { Issue } from "wilo-common";
import { useJiraSearch } from "wilo-api";
import { JiraIssue } from "wilo-api/types";
import styled from "styled-components";
import { useDebounce } from "wilo-utils";
import { SearchToolbar } from "./SearchToolbar";
import { useHistory } from "react-router-dom";

export const Search: FC = function () {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const searchIssuesStatus = useJiraSearch(searchText, {});

  const {
    error: searchIssuesError,
    data: searchIssuesData,
    get: fetchSearchIssues,
    loading: searchIssuesLoading,
  } = searchIssuesStatus;

  useEffect(() => {
    if (debouncedSearchText) fetchSearchIssues();
  }, [fetchSearchIssues, debouncedSearchText]);

  const hasResults = Object.keys(searchIssuesData).length > 0;

  const handleCloseClick = () => {
    history.goBack();
  };
  const handleSearchInputChange = (text: string) => setSearchText(text);

  return (
    <>
      <SearchToolbar
        loading={searchIssuesLoading}
        searchText={searchText}
        onSearchInputChange={handleSearchInputChange}
        onCloseClick={handleCloseClick}
      />
      {searchIssuesError && <ErrorWrapper></ErrorWrapper>}
      {!hasResults && !searchIssuesError && <EmptyWrapper></EmptyWrapper>}
      {hasResults && (
        <IssuesList>
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

const EmptyWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
