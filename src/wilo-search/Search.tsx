import React, { useState, useEffect } from "react";
import { FC } from "react";
import { Issue } from "wilo-common";
import { useJiraSearch } from "wilo-api";
import { JiraIssue } from "wilo-api/types";
import styled from "styled-components";
import { useDebounce } from "wilo-utils";
import { SearchToolbar } from "./SearchToolbar";
import { useHistory } from "react-router-dom";
import { colorGrayLight } from "wilo-design";
import { darken } from "polished";

export const Search: FC = function () {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const searchIssuesStatus = useJiraSearch(debouncedSearchText, {});

  const {
    error: searchIssuesError,
    data: searchIssuesData,
    get: fetchSearchIssues,
    loading: searchIssuesLoading,
  } = searchIssuesStatus;

  useEffect(() => {
    if (debouncedSearchText.length > 2) fetchSearchIssues();
  }, [fetchSearchIssues, debouncedSearchText]);

  const hasResults =
    Object.keys(searchIssuesData).length > 0 && searchIssuesData.total > 0;

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
      {searchIssuesError && (
        <ErrorWrapper>{JSON.stringify(searchIssuesError)}</ErrorWrapper>
      )}
      {!hasResults && !searchIssuesError && debouncedSearchText.length < 2 && (
        <EmptyWrapper>
          <EmptyText>Search for Jira issues by ID or by description.</EmptyText>
        </EmptyWrapper>
      )}
      {!hasResults &&
        !searchIssuesError &&
        debouncedSearchText.length > 2 &&
        !searchIssuesLoading && (
          <NoResultWrapper>
            <NoResultText>No result.</NoResultText>
          </NoResultWrapper>
        )}
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

const NoResultWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const NoResultText = styled.p`
  font-size: 18px;
  color: ${darken(0.24, colorGrayLight)};
  font-weight: 300;
  text-align: center;
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  max-width: 70%;
`;

const EmptyText = styled.p`
  font-size: 18px;
  color: ${darken(0.24, colorGrayLight)};
  font-weight: 300;
  text-align: center;
  max-width: 70%;
`;
