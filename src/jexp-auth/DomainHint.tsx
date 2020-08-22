import React, { FC } from "react";
import styled from "styled-components";
import { colorGrayLight, colorPrimaryDark } from "jexp-design";

interface Props {
  availableDomains?: string[];
  visible?: boolean;
  onDomainClick?: (domain: string) => void;
}

export const DomainHint: FC<Props> = function ({
  availableDomains = [],
  visible = false,
  onDomainClick = () => undefined,
}) {
  return (
    <Root visible={visible}>
      {availableDomains.length === 1 && (
        <>
          Could it be{" "}
          <HintDomain onClick={() => onDomainClick(availableDomains[0])}>
            {availableDomains[0]}
            <HintDomainDimmed>.atlassian.net</HintDomainDimmed>
          </HintDomain>
          ?
        </>
      )}
      {availableDomains.length > 1 && (
        <>
          Could it be one of the following?
          <br />
          {availableDomains.map((domain) => (
            <HintDomain onClick={() => onDomainClick(domain)} key={domain}>
              <HintDomainDimmed>-</HintDomainDimmed> {domain}
              <HintDomainDimmed>.atlassian.net</HintDomainDimmed>
              <br />
            </HintDomain>
          ))}
        </>
      )}
    </Root>
  );
};

const Root = styled.span<{ visible: boolean }>`
  font-size: 14px;
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

const HintDomainDimmed = styled.span`
  color: ${colorGrayLight};
`;
