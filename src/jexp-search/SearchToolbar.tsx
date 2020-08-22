import React, { FC, ChangeEvent, useRef, useEffect } from "react";
import styled from "styled-components";
import { Toolbar, IconButton } from "jexp-common";
import { Close } from "@styled-icons/ionicons-solid";

interface Props {
  loading?: boolean;
  searchText: string;
  onSearchInputChange: (text: string) => void;
  onCloseClick: () => void;
}

export const SearchToolbar: FC<Props> = function ({
  loading,
  searchText,
  onSearchInputChange,
  onCloseClick,
}) {
  const inputRef = useRef<any>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchInputChange(e.target.value);
  };
  return (
    <Toolbar loading={loading}>
      <>
        <Input
          ref={inputRef}
          placeholder={"Search..."}
          value={searchText}
          onChange={handleInputChange}
        />
        <IconButton icon={Close} onClick={onCloseClick} />
      </>
    </Toolbar>
  );
};

const Input = styled.input`
  width: 100%;
  height: 100%;
  font-size: 14px;
  transition: all 0.6s ease-out;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  outline: 0;
  color: white;
  padding: 0;

  &:hover:focus {
    outline: 0;
    border: none;
    border-bottom: 1px solid white;
  }

  &:focus {
    border: none;
    border-bottom: 1px solid white;
  }

  &:hover::placeholder {
  }

  &::placeholder {
    color: white;
    opacity: 0.5;
  }
`;
