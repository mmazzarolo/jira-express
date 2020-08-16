import React, { FC } from "react";
import styled, { keyframes } from "styled-components";
import { logoImage } from "wilo-assets";

interface Props {
  size?: number;
}

export const PulsatingLogo: FC<Props> = function ({ size = 80 }) {
  return <Logo src={logoImage} size={size} />;
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

export const Logo = styled.img<{ size: number }>`
  animation: ${Ping} 1400ms ease-in-out infinite both;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;
