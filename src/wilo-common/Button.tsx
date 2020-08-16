import styled from "styled-components";
import { darken, transparentize } from "polished";
import { colorPrimary } from "wilo-design";

interface Props {}

export const Button = styled.button<Props>`
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
