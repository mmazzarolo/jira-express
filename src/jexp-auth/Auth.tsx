import React, { FC, useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import {
  useJiraCurrentUser,
  useJiraAvailableDomains,
  setCurrentJiraDomain,
} from "jexp-api";
import { colorGrayLight, colorPrimary } from "jexp-design";
import { useHistory } from "react-router";
import { delay } from "jexp-utils";
import { darken } from "polished";
import { Button, Spacer } from "jexp-common";
import { openLink } from "jexp-utils/openLink";
import { TextInput } from "./TextInput";
import { DomainHint } from "./DomainHint";

const hideDuration = 200;

export const Auth: FC = function () {
  const history = useHistory();
  const [availableDomains] = useJiraAvailableDomains();
  const [selectedDomain, setSelectedDomain] = useState("");
  const [hiding, setHiding] = useState(false);
  const { get, loading, error } = useJiraCurrentUser({
    domain: selectedDomain,
  });
  const [loginError, setLoginError] = useState<Error | null>(null);

  useEffect(() => {
    setLoginError(error);
  }, [error]);

  function handleTextInputChange(text: string) {
    setLoginError(null);
    setSelectedDomain(text);
  }

  function handleHintedDomainClick(domain: string) {
    setSelectedDomain(domain);
  }

  async function handleButtonClick() {
    if (loading || hiding) return;
    const currentUser = await get();
    if (currentUser && currentUser.displayName) {
      await setCurrentJiraDomain(selectedDomain);
      if (hiding) return;
      setHiding(true);
      await delay(hideDuration);
      history.push("/dashboard");
    }
  }

  function handleLoginLinkClick() {
    openLink("https://id.atlassian.com/login");
    window.close();
  }

  return (
    <Root hiding={hiding}>
      <Content>
        {availableDomains.length === 0 && (
          <>
            <TopContent>
              <Question>What's your Jira account?</Question>
              <Description>
                To use this extension your browser must be logged-in to the Jira
                account you want to use.
              </Description>
            </TopContent>
            <JiraRedirectLink onClick={handleLoginLinkClick}>
              Log in to your account.
            </JiraRedirectLink>
            <Spacer />
          </>
        )}
        {availableDomains.length > 0 && (
          <>
            <TopContent>
              <Question>What's your Jira account?</Question>
              <Description>
                Please notice that this browser must be logged-in to the Jira
                account that you want use.
              </Description>
            </TopContent>
            <Form>
              <TextInput
                value={selectedDomain}
                onChange={handleTextInputChange}
              />
              {!loginError && (
                <DomainHint
                  availableDomains={availableDomains}
                  visible={!selectedDomain}
                  onDomainClick={handleHintedDomainClick}
                />
              )}
              {loginError && (
                <LoginError>
                  <b>⚠️ Unable to access this account.</b>
                  <br />
                  Make sure this browser is logged-in to {selectedDomain} or try
                  again later.
                </LoginError>
              )}
            </Form>
            <Button disabled={!selectedDomain} onClick={handleButtonClick}>
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
  color: ${darken(0.24, colorGrayLight)};
  font-weight: 300;
  animation: ${fadeInTranslateUp} ease-in 200ms forwards 100ms;
`;

const JiraRedirectLink = styled.div`
  opacity: 0;
  font-size: 18px;
  color: ${colorPrimary};
  cursor: pointer;
  font-weight: 400;
  animation: ${fadeInTranslateUp} ease-in 200ms forwards 300ms;
  text-decoration: underline;
  &:hover {
    color: ${darken(0.1, colorPrimary)};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  opacity: 0;
  animation: ${fadeInTranslateUp} ease-in 200ms forwards 300ms;
`;

const LoginError = styled.p`
  font-size: 14px;
  color: ${darken(0.3, colorGrayLight)};
  font-weight: 300;
`;
