import React, { FC } from "react";
import { Toolbar, IconButton, Spacer } from "wilo-common";
import { Search } from "@styled-icons/ionicons-solid";
import { Settings } from "@styled-icons/material";

interface Props {
  loading?: boolean;
  onSearchClick: () => void;
  onSettingsClick: () => void;
}

export const DashboardToolbar: FC<Props> = function ({
  loading,
  onSearchClick,
  onSettingsClick,
}) {
  return (
    <Toolbar loading={loading} title="Recent Jira issues">
      <IconButton icon={Settings} onClick={onSettingsClick} />
      <Spacer orientation="vertical" />
      <IconButton icon={Search} onClick={onSearchClick} />
    </Toolbar>
  );
};
