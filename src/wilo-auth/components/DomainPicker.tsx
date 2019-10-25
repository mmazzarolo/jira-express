import React, { FC, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useJiraCurrentUser, useJiraDomains } from "wilo-api";
import { colorGrayLight, colorPrimaryDark } from "wilo-design";
import { delay } from "wilo-utils";
import { Button } from "./Button";
import { TextInput } from "./TextInput";
import { useHistory } from "react-router";

const hideDuration = 400;

export const DomainPicker: FC = function() {
  const history = useHistory();
  const [recentDomains] = useJiraDomains();
  const [domain, setDomain] = useState("");
  const [hiding, setHiding] = useState(false);
  const { get, loading } = useJiraCurrentUser({ domain: domain });

  const recentDomain = recentDomains[0];

  function handleHintedDomainClick() {
    setDomain(recentDomain);
  }

  async function handleButtonClick() {
    if (loading || hiding) return;
    const currentUser = await get();
    if (currentUser && currentUser.name) {
      localStorage.setItem("domain", domain);
      if (hiding) return;
      setHiding(true);
      await delay(hideDuration);
      history.push("/dashboard");
    }
  }

  return (
    <Root hiding={hiding}>
      <Content>
        <Question>What's your Jira domain?</Question>
        <Form>
          <TextInput value={domain} onChange={setDomain} />
          <Hint visible={!!recentDomain && !domain}>
            Pssst, could it be{" "}
            <HintDomain onClick={handleHintedDomainClick}>
              {recentDomain}.atlassian.net
            </HintDomain>
            ?
          </Hint>
        </Form>
        <Button disabled={!domain} onClick={handleButtonClick}>
          Continue
        </Button>
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

const Question = styled.p`
  opacity: 0;
  font-size: 32px;
  color: #49596b;
  font-weight: 400;
  text-align: center;
  animation: ${fadeInTranslateUp} ease-in 200ms forwards 400ms;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  opacity: 0;
  animation: ${fadeInTranslateUp} ease-in 200ms forwards 600ms;
`;

const Hint = styled.span<{ visible: boolean }>`
  font-size: 12px;
  margin-top: 16px;
  font-weight: 300;
  color: ${colorGrayLight};
  width: 90%;
  transition: all 200ms;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;

const HintDomain = styled.span`
  cursor: pointer;
  color: ${colorPrimaryDark};
`;
