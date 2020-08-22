import React, { FC } from "react";
import { Toolbar, IconButton } from "jexp-common";
import { Close } from "@styled-icons/ionicons-solid";

interface Props {
  loading?: boolean;
  onCloseClick: () => void;
}

export const SettingsToolbar: FC<Props> = function ({ loading, onCloseClick }) {
  return (
    <Toolbar loading={loading} title="Settings">
      <IconButton icon={Close} onClick={onCloseClick} />
    </Toolbar>
  );
};
