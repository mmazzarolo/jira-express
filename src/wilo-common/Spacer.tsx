import styled from "styled-components";

interface Props {
  orientation?: "vertical" | "horizontal";
}

export const Spacer = styled.div<Props>`
  ${(props) =>
    props.orientation === "vertical" ? `width: 12px` : `height: 12px`};
`;
