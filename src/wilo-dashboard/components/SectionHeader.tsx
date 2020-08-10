import React from "react";
import styled from "styled-components";
import { FC } from "react";
import { Spinner } from "./Spinner";

interface Props {
  label: string;
  isLoading?: boolean;
}

export const SectionHeader: FC<Props> = function ({ label, isLoading }) {
  return (
    <Root>
      <Label>{label.toUpperCase()}</Label>
      {isLoading && <Spinner />}
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

const Label = styled.p`
  font-size: 11px;
  font-weight: 600;
  color: rgb(107, 119, 140);
  color: rgb(107, 119, 140);
`;
