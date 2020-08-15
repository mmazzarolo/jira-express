import React from "react";
import styled, { keyframes } from "styled-components";
import { FC } from "react";

interface Props {
  color?: string;
}

export const Spinner: FC<Props> = function ({ color = "white" }) {
  return (
    <Root>
      <Content color={color} />
    </Root>
  );
};

const Spin = keyframes`
  to {transform: rotate(360deg);}
`;

const Root = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
`;

const Content = styled.div<Props>`
  &::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border-top: 2px solid ${(props) => props.color};
    border-right: 2px solid transparent;
    animation: ${Spin} 0.6s linear infinite;
  }
`;
