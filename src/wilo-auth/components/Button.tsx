import styled, { keyframes } from "styled-components";
import { darken, transparentize } from "polished";
import { colorPrimary } from "wilo-design";

const fadeScaleUp = keyframes`
  from {
    opacity: 0;
    transform: scale(.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Button = styled.button`
  opacity: 0;
  font-size: 16px;
  padding: 1em 3em;
  bottom: 24px;
  appearance: none;
  background-color: ${colorPrimary};
  color: white;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 400ms;
  animation: ${fadeScaleUp} 400ms ease-in 600ms forwards;

  &:focus {
    outline: 0;
  }

  &:hover {
    box-shadow: 0 3px 8px ${transparentize(0.5, colorPrimary)};
  }

  &:active {
    background-color: ${darken(0.02, colorPrimary)};
  }

  &:disabled {
    visibility: hidden;
  }
`;
