import React from "react";
import styled, { keyframes } from "styled-components";
import { FC } from "react";

interface Props {
  color?: string;
  size?: number;
}

export const Spinner: FC<Props> = function ({ color = "white", size = 22 }) {
  return <Root color={color} size={size}></Root>;
};

const Ping = keyframes`
0% {
  transform: scale(1);
  opacity: 1;
}
80% {
  transform: scale(2);
  opacity: 0;
}
100% {
  transform: scale(2.4);
  opacity: 0;
}
`;

const Root = styled.div`
  animation: ${Ping} 0.8s ease-in-out infinite both;
  background: white;
  width: 12px;
  height: 12px;
  border-radius: 50%;
`;

// const Content = styled.div<{ color: string; size: number }>`
//   &::before {
//     content: "";
//     box-sizing: border-box;
//     position: absolute;
//     width: ${(props) => props.size}px;
//     height: ${(props) => props.size}px;
//     margin-top: -4px;
//     margin-left: -4px;
//     border-radius: 50%;
//     border-top: 3px solid ${(props) => props.color};
//     border-right: 3px solid transparent;
//     animation: ${Spin} 0.6s linear infinite;
//   }
// `;
