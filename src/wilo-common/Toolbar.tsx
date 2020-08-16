import React, { FC } from "react";
import styled from "styled-components";
import { colorPrimary } from "wilo-design";
import logoInvertedImage from "./logo-inverted.png";
import { ProgressBar } from "./ProgressBar";

interface Props {
  loading?: boolean;
  title?: string;
}

export const Toolbar: FC<Props> = function ({ loading, title, children }) {
  return (
    <Root>
      {loading ? (
        <ProgressBarWrapper>
          <ProgressBar />
        </ProgressBarWrapper>
      ) : undefined}
      <Logo src={logoInvertedImage} />
      {title && <Title>{title}</Title>}
      {children}
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${colorPrimary};
  padding: 8px;
  align-items: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  z-index: 2;
  position: relative;
`;

const Logo = styled.img`
  color: white;
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;

const ProgressBarWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
`;

const Title = styled.p`
  color: white;
  font-size: 15px;
  margin: 0px;
  flex-grow: 1;
`;
