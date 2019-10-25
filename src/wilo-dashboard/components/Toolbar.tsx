import React from "react";
import styled from "styled-components";
import { FC } from "react";
import { colorPrimary } from "wilo-design";
import logoImage from "../assets/logo.png";

export const Toolbar: FC = function() {
  return (
    <Root>
      <Logo src={logoImage} />
      <MenuItem selected>Recent</MenuItem>
      <MenuItem>Board</MenuItem>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${colorPrimary};
  padding: 8px;
  align-items: center;
`;

const Logo = styled.img`
  color: white;
  width: 24px;
  height: 24px;
  margin-right: 6px;
`;

const MenuItem = styled.p<{ selected?: boolean }>`
  color: white;
  margin: 0px 6px;
  font-weight: ${({ selected }) => (selected ? 500 : 400)};
  text-decoration: ${({ selected }) => (selected ? "underline" : "none")};
`;
