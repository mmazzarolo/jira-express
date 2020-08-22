import React from "react";
import { FC } from "react";
import { Issue } from "wilo-common";
import { useJiraRecentIssues } from "wilo-api";
import { JiraIssue } from "wilo-api/types";
import styled from "styled-components";
import { DashboardToolbar } from "./DashboardToolbar";
import { useHistory } from "react-router-dom";
import { PulsatingLogo } from "wilo-common";
import { UseFetch } from "use-http";

enum DashboardStatus {
  Error,
  InitialLoading,
  RefreshingContent,
  Ready,
}

const getDashboardStatus = ({ error, data, loading }: UseFetch<any>) => {
  const hasResults = Object.keys(data || {}).length > 0 && data.total > 0;
  if (error) {
    return DashboardStatus.Error;
  } else if (!hasResults && loading) {
    return DashboardStatus.InitialLoading;
  } else if (loading) {
    return DashboardStatus.RefreshingContent;
  } else {
    return DashboardStatus.Ready;
  }
};

export const Dashboard: FC = function () {
  const history = useHistory();
  const recentIssuesStatus = useJiraRecentIssues({ persist: true }, []);
  const dashboardStatus = getDashboardStatus(recentIssuesStatus);
  const {
    error: recentIssuesError,
    data: recentIssuesData,
  } = recentIssuesStatus;

  const handleSearchClick = () => {
    history.push("/search");
  };

  const handleSettingsClick = () => {
    history.push("/settings");
  };

  return (
    <>
      <DashboardToolbar
        loading={dashboardStatus === DashboardStatus.RefreshingContent}
        onSearchClick={handleSearchClick}
        onSettingsClick={handleSettingsClick}
      />
      {dashboardStatus === DashboardStatus.InitialLoading && (
        <LoadingWrapper>
          <PulsatingLogo />
        </LoadingWrapper>
      )}
      {dashboardStatus === DashboardStatus.Error && (
        <ErrorWrapper></ErrorWrapper>
      )}
      {(dashboardStatus === DashboardStatus.Ready ||
        dashboardStatus === DashboardStatus.RefreshingContent) && (
        <IssuesList>
          {recentIssuesError && `Error ${recentIssuesError.message}`}
          {recentIssuesData?.issues?.map((issue: JiraIssue) => (
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

const LoadingWrapper = styled.div`
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
