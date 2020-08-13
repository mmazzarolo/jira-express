import React, { FC, ChangeEvent, useRef, useEffect } from "react";
import styled from "styled-components";
import { colorPrimary, colorPrimaryDark, colorGrayLight } from "wilo-design";
import logoImage from "../assets/logo.png";
import logoInvertedImage from "../assets/logo-inverted.png";
import { Close, Search } from "@styled-icons/ionicons-solid";

interface Props {
  searchText: string;
  searchEnabled: boolean;
  onSearchInputChange: (text: string) => void;
  onSearchClick: () => void;
  onCloseClick: () => void;
}

export const Toolbar: FC<Props> = function ({
  searchText,
  searchEnabled,
  onSearchInputChange,
  onSearchClick,
  onCloseClick,
}) {
  const inputRef = useRef<any>(null);
  useEffect(() => {
    if (searchEnabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchEnabled]);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchInputChange(e.target.value);
  };
  return (
    <Root searchEnabled={searchEnabled}>
      {searchEnabled && (
        <>
          <Logo src={logoImage} />
          <Input
            ref={inputRef}
            placeholder={"Search..."}
            value={searchText}
            onChange={handleInputChange}
          />
          <IconWrapper onClick={onCloseClick}>
            <CloseIcon />
          </IconWrapper>
        </>
      )}
      {!searchEnabled && (
        <>
          <Logo src={logoInvertedImage} />
          <Title>Recent issues</Title>
          <IconWrapper onClick={onSearchClick}>
            <SearchIcon />
          </IconWrapper>
        </>
      )}
    </Root>
  );
};

const Root = styled.div<{ searchEnabled: boolean }>`
  display: flex;
  flex-direction: row;
  background-color: ${(props) =>
    props.searchEnabled ? "white" : colorPrimary};
  padding: 8px;
  align-items: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

const Logo = styled.img`
  color: white;
  width: 24px;
  height: 24px;
  margin-right: 6px;
`;

const Title = styled.p`
  color: white;
  font-size: 14px;
  margin: 0px 6px;
  flex-grow: 1;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  font-size: 14px;
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

const IconWrapper = styled.div`
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
`;

const SearchIcon = styled(Search)`
  width: 22px;
  height: 22px;
  color: white;
`;

const CloseIcon = styled(Close)`
  width: 22px;
  height: 22px;
  color: ${colorPrimaryDark};
`;
