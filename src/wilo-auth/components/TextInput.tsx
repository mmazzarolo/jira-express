import React, { ChangeEvent, FC } from "react";
import styled from "styled-components/macro";
import { colorPrimaryDark, colorGrayLight, colorPrimary } from "wilo-design";

interface Props {
  value: string;
  onChange: (query: string) => void;
}

export const TextInput: FC<Props> = function({ value, onChange }) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <Root>
      <Input
        placeholder="your-domain.atlassian.net"
        type="text"
        onChange={handleInputChange}
        value={value}
      />
      {value && (
        <InputMask>
          <InputMaskHidden>{value}</InputMaskHidden>.atlassian.net
        </InputMask>
      )}
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  width: 90%;
  height: 32px;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  font-size: 18px;
  transition: all 0.6s ease-out;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid white;
  border-bottom-color: ${colorGrayLight};
  outline: 0;
  color: ${colorPrimaryDark};
  padding: 0;

  &:hover:focus {
    outline: 0;
    border: none;
    border-bottom: 1px solid white;
    border-bottom-color: blue;
  }

  &:focus {
    border: none;
    border-bottom: 1px solid white;
    border-bottom-color: ${colorPrimary};
  }

  &:hover::placeholder {
  }

  &::placeholder {
    color: ${colorGrayLight};
  }
`;

const InputMask = styled.span`
  display: flex;
  align-items: center;
  height: 32px;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  font-size: 18px;
  color: ${colorGrayLight};
  z-index: -1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const InputMaskHidden = styled.span`
  visibility: hidden;
`;
