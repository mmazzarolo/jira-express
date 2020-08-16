import React, { FC } from "react";
import styled, { keyframes } from "styled-components";
import logo from "./logo.png";

interface Props {}

export const PulsatingLogo: FC<Props> = function () {
  return <Logo src={logo} />;
};

const Ping = keyframes`
0% {
  transform: scale(0.2);
  opacity: 0.8;
}
80% {
  transform: scale(1.2);
  opacity: 0;
}
100% {
  transform: scale(2.2);
  opacity: 0;
}
`;

export const Logo = styled.img`
  animation: ${Ping} 1.4s ease-in-out infinite both;
  width: 80px;
  height: 80px;
`;
