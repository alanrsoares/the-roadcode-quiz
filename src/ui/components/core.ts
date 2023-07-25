import styled, { css, getColor, getRadius, getShadow } from "ui/styled";
import { Color } from "ui/theme";

export const icons = {
  // tslint:disable-next-line:max-line-length
  check: `50% no-repeat url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjIwLjM0OXB4IiBoZWlnaHQ9IjE1LjgyNnB4IiB2aWV3Qm94PSIwIDAgMjAuMzQ5IDE1LjgyNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAuMzQ5IDE1LjgyNiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+IDxwb2x5Z29uIGZpbGw9IiNmZmZmZmYiIHBvaW50cz0iMTguMjI4LDAgMjAuMzQ5LDIuMTIyIDYuNjQ0LDE1LjgyNiAwLDkuMTgyIDIuMTIyLDcuMDYxIDYuNjQ0LDExLjU4MyAiLz4gPC9zdmc+)`,
  // tslint:disable-next-line:max-line-length
  cross: `50% no-repeat  url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE1Ljg3M3B4IiBoZWlnaHQ9IjE1Ljg5MXB4IiB2aWV3Qm94PSIwIDAgMTUuODczIDE1Ljg5MSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTUuODczIDE1Ljg5MSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+IDxwb2x5Z29uIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSIjZGE0MTIxIiBwb2ludHM9IjE0LjE4NiwwIDE1Ljg3MywxLjc0IDkuNjg2LDcuOTYzIDE1LjgzOCwxNC4xNSAxNC4xNSwxNS44OTEgNy45MjgsOS43MjEgMS44MTEsMTUuODkxIDAuMDM1LDE0LjE1IDYuMTg4LDcuOTYzIDAsMS43NzUgMS43NTgsMCA3Ljk2Myw2LjI0ICIvPiA8L3N2Zz4=)`,
};

export const Shell = styled.div`
  display: flex;
  background-color: ${getColor("light")};
  font-family: Lato, Arial, Helvetica, sans-serif;
  color: ${getColor("black")};
  min-height: 100vh;
  min-height: 100dvh;
  font-size: 18px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("background.svg");
  background-position: bottom;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @media screen and (max-height: 823px) {
    font-size: 16px;
    background-size: contain;
  }
  @media screen and (max-height: 700px) {
    font-size: 15px;
  }
  @media screen and (max-height: 600px) {
    font-size: 14px;
  }
`;

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-top: 1.8rem;
  max-width: 414px;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

export const AppHeader = styled.header`
  font-size: 2rem;
  text-align: center;
  color: ${getColor("white")};
  font-weight: 900;
  padding: 0.6rem;
  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
    color: ${getColor("white")};
    background-color: ${getColor("secondary")};
    padding: 0.4rem;
    width: 100%;
  }
`;

interface CardProps {
  color?: Color;
}

export const Card = styled.div<CardProps>`
  display: flex;
  flex-direction: column;
  min-height: 10vh;
  margin: 1em 0;
  padding: 0.4rem;
  border-radius: ${getRadius("lg")};
  background-color: white;
  box-shadow: ${getShadow("default")};
  @media screen and (max-width: 600px) {
    margin: 1rem 0.8rem;
  }
`;

export const SummaryCard = styled(Card)`
  justify-content: center;
  align-items: center;
  min-height: 10vh;
  font-weight: bold;
  color: ${getColor("white")};
  font-size: 1.2rem;
  line-height: 1.6rem;
  background-color: ${getColor((props) => props.color ?? "white")};
  text-align: center;
`;

export const QuestionContainer = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  background: ${getColor("primary")};
  padding: 0.3rem;
  border-radius: ${getRadius("md")};
  display: flex;
  justify-content: space-between;
  color: #333;
  margin-bottom: 0.2rem;
`;

export const QuestionNumber = styled.div`
  background-color: ${getColor("white")};
  width: 1.75rem;
  height: 1.75rem;
  border-radius: ${getRadius("round")};
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  padding: ${(props) => (String(props.children).length > 1 ? "0.2em" : "")};
  font-size: ${(props) =>
    String(props.children).length > 1 ? "1em" : "1.2em"};
`;

export const QuestionText = styled.div`
  margin: 0.2rem;
  margin-right: 0.1rem;
`;

export const Image = styled.img<{ round?: boolean }>`
  width: 8rem;
  height: 8rem;
  overflow: hidden;
  border-radius: ${getRadius((props) => (props.round ? "round" : "md"))};
  border: solid 0.2rem ${getColor("white")};
  transition: border-radius 0.2s linear;
`;

export const ImageWrapper = styled.div``;

interface OptionProps {
  isSelected: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
}

export const Option = styled.div<OptionProps>`
  display: ${(props) =>
    props.isAnswered
      ? props.isSelected || props.isCorrect
        ? "flex"
        : "none"
      : "flex"};
  padding: 0.6rem 0.4em;
  margin: 0.2rem 0;
  font-weight: bold;
  align-items: center;
  border-radius: ${getRadius("md")};
  cursor: ${(props) => (props.isAnswered ? "" : "pointer")};
  background-color: ${getColor((props) =>
    props.isAnswered && props.isSelected
      ? props.isCorrect
        ? "positive"
        : "negative"
      : "muted"
  )};
  color: ${getColor((props) =>
    props.isAnswered && props.isSelected ? "white" : "black"
  )};
  transition: background-color 0.3s;
  :hover {
    background-color: ${(props) =>
      props.isAnswered ? "" : props.theme.colors.gray};
  }
  :last-of-type {
    margin-bottom: 0;
  }
`;

export const Hint = styled.div`
  color: #666;
  padding: 0.75rem 0.25rem;
`;

export const HintHighlight = styled.p`
  color: ${getColor("negative")};
  font-weight: bold;
`;

interface PillProps {
  isSelected: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
}

const pillBackground = css<PillProps>`
  ${(props) =>
    props.isAnswered && (props.isSelected || props.isCorrect)
      ? props.isCorrect
        ? `${props.theme.colors.positive} ${icons.check}`
        : `${props.theme.colors.white} ${icons.cross}`
      : props.theme.colors.primary}
`;

const pillBorder = css<PillProps>`
  ${(props) =>
    props.isAnswered && (props.isSelected || props.isCorrect)
      ? props.isCorrect
        ? `solid 0.1em ${props.theme.colors.white}`
        : "none"
      : `solid 0.1em ${props.theme.colors.black}`}
`;

export const Pill = styled.div<PillProps>`
  border-radius: ${getRadius("round")};
  min-width: 2rem;
  min-height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.4rem;
  margin-left: 0.1rem;
  font-weight: bold;
  padding: 0.2rem;
  background: ${pillBackground};
  border: ${pillBorder};
`;

export const Footer = styled.footer`
  display: flex;
  justify-self: flex-end;
  align-self: flex-end;
  width: 100%;
  @media screen and (max-width: 600px) {
    flex: 1;
  }
`;

export const ButtonIcon = styled.div`
  position: absolute;
  right: 0;
  margin-right: 0.3rem;
  width: 2rem;
  height: 2rem;
  padding: 0.08rem;
  vertical-align: middle;
  color: ${getColor("secondary")};
  background: ${getColor("white")};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${getRadius("round")};
  font-weight: bold;
  font-size: 1.75rem;
`;

export const NextButton = styled.button<{ color?: Color }>`
  background-color: ${getColor((props) => props.color ?? "secondary")};
  font-size: 1.75rem;
  color: white;
  border: none;
  border-radius: 1rem;
  padding: 0.25rem 0.5rem;
  height: 3.25rem;
  flex: 1;
  transition: opacity 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  outline: none;
  user-select: none;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    align-self: flex-end;
    position: fixed;
    bottom: 1rem;
    width: 92%;
    margin: 0 1rem;
    box-shadow: ${getShadow("default")};
    opacity: 0.95;
  }
  &:active {
    opacity: 0.9;
  }
`;
