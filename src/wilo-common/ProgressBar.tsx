import React from "react";
import styled, { keyframes } from "styled-components";
import { FC } from "react";

interface Props {
  color?: string;
}

export const ProgressBar: FC<Props> = function ({ color = "white" }) {
  return <Root color={color} />;
};

const Progress = keyframes`
0% {
  transform: scaleX(1) translateX(-100%);
}

100% {
  transform: scaleX(1) translateX(100%);
}
`;

const Root = styled.div<Props>`
  height: 2px;

  &::before {
    background-color: ${(props) => props.color};
    position: absolute;
    content: "";
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    transform: scaleX(0) translateX(0%);
    animation: ${Progress} 1s cubic-bezier(0.694, 0.0482, 0.335, 1) infinite;
  }
`;
