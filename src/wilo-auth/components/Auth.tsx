import React, { FC, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import {
  useJiraCurrentUser,
  useJiraAvailableDomains,
  setJiraDomain,
} from "wilo-api";
import { colorGrayLight, colorPrimaryDark } from "wilo-design";
import { delay } from "wilo-utils";
import { darken } from "polished";
import { Button } from "wilo-common";
import { TextInput } from "./TextInput";
import { useHistory } from "react-router";

const hideDuration = 400;

export const Auth: FC = function () {
  const history = useHistory();
  const [recentDomains] = useJiraAvailableDomains();
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
    if (currentUser && currentUser.displayName) {
      setJiraDomain(domain);
      if (hiding) return;
      setHiding(true);
      await delay(hideDuration);
      history.push("/dashboard");
    }
  }

  return (
    <Root hiding={hiding}>
      <Content>
        {recentDomains.length === 0 && (
          <TopContent>
            <Question>What's your Jira domain?</Question>
            <Description>
              To use this extension you must be logged-in in the Jira domain you
              want to use.
            </Description>
          </TopContent>
        )}
        {recentDomains.length > 0 && (
          <>
            <TopContent>
              <Question>What's your Jira domain?</Question>
              <Description>
                Please notice that this browser must be logged-in in the Jira
                domain that you want use.
              </Description>
            </TopContent>
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
          </>
        )}
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
  height: 100%;
  max-height: 90%;
  max-width: 80%;
`;

const TopContent = styled.div``;

const Question = styled.p`
  opacity: 0;
  font-size: 32px;
  color: #49596b;
  font-weight: 400;
  animation: ${fadeInTranslateUp} ease-in 200ms forwards;
`;

const Description = styled.p`
  opacity: 0;
  font-size: 18px;
  color: #49596b;
  color: ${darken(0.24, colorGrayLight)};
  font-weight: 300;
  animation: ${fadeInTranslateUp} ease-in 200ms forwards 100ms;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  opacity: 0;
  animation: ${fadeInTranslateUp} ease-in 200ms forwards 300ms;
`;

const Hint = styled.span<{ visible: boolean }>`
  font-size: 12px;
  margin-top: 16px;
  font-weight: 300;
  color: ${colorGrayLight};
  transition: all 200ms;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;

const HintDomain = styled.span`
  cursor: pointer;
  color: ${colorPrimaryDark};
`;
