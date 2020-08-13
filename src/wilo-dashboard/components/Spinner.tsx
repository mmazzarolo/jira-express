import React from "react";
import styled, { keyframes } from "styled-components";
import { FC } from "react";

export const Spinner: FC = function () {
  return <Root />;
};

const Spin = keyframes`
  50% {
    border-radius: 50%;
    transform: scale(0.5) rotate(360deg);
  }
  100% {
    transform: scale(1) rotate(720deg);
  }
`;

const Root = styled.div`
  position: relative;

  :before {
    content: "";
    position: relative;
    display: block;
    animation: ${Spin} 2.5s cubic-bezier(0.75, 0, 0.5, 1) infinite normal;
    width: 1em;
    height: 1em;
    background-color: #1c78f2;
    opacity: 0.4;
  }
`;
