import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  icon: any;
  onClick?: () => void;
}

export const IconButton: FC<Props> = function ({
  icon,
  onClick = () => undefined,
}) {
  const Icon = icon;
  return (
    <Root onClick={onClick}>
      <Icon />
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  &::before {
    content: "";
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    transform: scale(0.75);
    opacity: 0;
    background: rgba(21, 24, 31, 0.25);
    border-radius: 50%;
    transition: all 0.2s cubic-bezier(0.2, 0.91, 0.85, 0.96) 0s;
  }

  &:hover::before {
    opacity: 0.5;
    transform: scale(1.3);
  }

  svg {
    width: 22px;
    height: 22px;
    color: white;
  }
`;
