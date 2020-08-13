import React, { FC, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { delay } from "wilo-utils";
import { useHistory } from "react-router-dom";
import { Button } from "./Button";
import dogDoodleImage from "../assets/dog-doodle.png";

const hideDuration = 400;

export const Onboarding: FC = function () {
  const [hiding, setHiding] = useState(false);
  const history = useHistory();

  async function handleButtonClick() {
    if (hiding) return;
    setHiding(true);
    await delay(hideDuration);
    history.push("/auth/domain");
  }

  return (
    <Root hiding={hiding}>
      <Content>
        <Top>
          <Title>Meet Wilo</Title>
          <Subtitle>
            Jira's best companion.
            <br />
            Your favourite time saver.
          </Subtitle>
        </Top>
        <Doodle src={dogDoodleImage} />
        <Button onClick={handleButtonClick}>Setup your domain</Button>
      </Content>
    </Root>
  );
};

const fadeInTranslateUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const fadeOutTranslateUp = keyframes`
  from {
    opacity: 1;
    transform: translateY(0px);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const Root = styled.div<{ hiding: boolean }>`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-height: 100%;
  background: white;
  ${({ hiding }) =>
    hiding &&
    css`
      animation: ${fadeOutTranslateUp} ease-in ${hideDuration}ms forwards;
    `}
`;

const Content = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-height: 90%;
  max-width: 90%;
`;

const Top = styled.div``;

const Title = styled.p`
  opacity: 0;
  font-size: 32px;
  color: #49596b;
  font-weight: 400;
  text-align: center;
  animation: ${fadeInTranslateUp} ease-in 400ms forwards;
`;

const Subtitle = styled.p`
  opacity: 0;
  font-size: 20px;
  font-weight: 300;
  color: #9d9eb0;
  text-align: center;
  animation: ${fadeInTranslateUp} 400ms ease-in 200ms forwards;
`;

const Doodle = styled.img`
  opacity: 0;
  max-width: 100%;
  animation: ${fadeInTranslateUp} 400ms ease-in 400ms forwards;
`;
