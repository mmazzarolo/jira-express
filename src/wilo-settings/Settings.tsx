import React from "react";
import { FC } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { SettingsToolbar } from "./SettingsToolbar";
import { Button } from "wilo-common";
import { clearJiraDomainManager, clearJiraRestApi } from "wilo-api";

export const Settings: FC = function () {
  const history = useHistory();

  const handleCloseClick = () => {
    history.goBack();
  };

  const handleDomainChangeClick = async () => {
    await clearJiraDomainManager();
    await clearJiraRestApi();
    history.replace("/auth");
  };

  return (
    <>
      <SettingsToolbar loading={false} onCloseClick={handleCloseClick} />
      <Body>
        <Button onClick={handleDomainChangeClick}>Change Jira domain</Button>
      </Body>
    </>
  );
};

const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
