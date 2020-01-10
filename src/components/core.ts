import styled, {
  Color,
  getColor,
  getRadius,
  getShadow,
  ThemedProps
} from "./styled";

export const icons = {
  // tslint:disable-next-line:max-line-length
  check: `50% no-repeat url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjIwLjM0OXB4IiBoZWlnaHQ9IjE1LjgyNnB4IiB2aWV3Qm94PSIwIDAgMjAuMzQ5IDE1LjgyNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAuMzQ5IDE1LjgyNiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+IDxwb2x5Z29uIGZpbGw9IiNmZmZmZmYiIHBvaW50cz0iMTguMjI4LDAgMjAuMzQ5LDIuMTIyIDYuNjQ0LDE1LjgyNiAwLDkuMTgyIDIuMTIyLDcuMDYxIDYuNjQ0LDExLjU4MyAiLz4gPC9zdmc+)`,
  // tslint:disable-next-line:max-line-length
  cross: `50% no-repeat  url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE1Ljg3M3B4IiBoZWlnaHQ9IjE1Ljg5MXB4IiB2aWV3Qm94PSIwIDAgMTUuODczIDE1Ljg5MSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTUuODczIDE1Ljg5MSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+IDxwb2x5Z29uIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSIjZGE0MTIxIiBwb2ludHM9IjE0LjE4NiwwIDE1Ljg3MywxLjc0IDkuNjg2LDcuOTYzIDE1LjgzOCwxNC4xNSAxNC4xNSwxNS44OTEgNy45MjgsOS43MjEgMS44MTEsMTUuODkxIDAuMDM1LDE0LjE1IDYuMTg4LDcuOTYzIDAsMS43NzUgMS43NTgsMCA3Ljk2Myw2LjI0ICIvPiA8L3N2Zz4=)`
};

export const Shell = styled.div`
  display: flex;
  background-color: #dedede;
  font-family: Roboto, sans-serif;
  color: ${getColor("black")};
  min-height: 100vh;
`;

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-top: 40px;
  max-width: 400px;
  flex-grow: 1;
`;

export const Header = styled.header`
  font-size: 2em;
  text-align: center;
  color: ${getColor("secondary")};
  font-weight: bold;
`;

interface CardProps {
  color?: Color;
}

export const Card = styled.div<CardProps>`
  display: flex;
  flex-direction: column;
  min-height: 10vh;
  margin: 1em 0;
  padding: 0.4em;
  border-radius: ${getRadius("lg")};
  background-color: white;
  box-shadow: ${getShadow("default")};
  @media screen and (max-width: 600px) {
    margin: 1em 0.8em;
  }
`;

export const SummaryCard = styled(Card)`
  justify-content: center;
  align-items: center;
  min-height: 10vh;
  font-weight: bold;
  color: ${getColor("white")};
  font-size: 1.2em;
  line-height: 1.6em;
  background-color: ${props => props.theme.colors[props.color ?? "white"]};
  text-align: center;
`;

export const Question = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  background: ${getColor("primary")};
  padding: 0.3em;
  border-radius: ${getRadius("md")};
  display: flex;
  justify-content: space-between;
  color: #333;
  margin-bottom: 0.2em;
`;

export const QuestionText = styled.div`
  margin: 0.2em;
  margin-right: 0.1em;
`;

export const Image = styled.img<{ round?: boolean }>`
  width: 8em;
  height: 8em;
  overflow: hidden;
  border-radius: ${props =>
    props.round ? props.theme.radii.round : props.theme.radii.md};
  border: solid 0.2em ${getColor("white")};
  transition: border-radius 0.2s linear;
`;

export const ImageWrapper = styled.div``;

interface OptionProps {
  isSelected: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
}

const getOptionDisplay = (props: OptionProps) =>
  props.isAnswered
    ? props.isSelected || props.isCorrect
      ? "flex"
      : "none"
    : "flex";

const getOptionBackgroundColor = (props: ThemedProps<OptionProps>) =>
  getColor(
    props.isAnswered && props.isSelected
      ? props.isCorrect
        ? "positive"
        : "negative"
      : "muted"
  )(props);

export const Option = styled.div<OptionProps>`
  display: ${getOptionDisplay};
  padding: 0.6em 0.4em;
  margin: 0.2em 0;
  align-items: center;
  border-radius: ${getRadius("md")};
  cursor: ${props => (props.isAnswered ? "" : "pointer")};
  background-color: ${getOptionBackgroundColor};
  color: ${props =>
    props.isAnswered && props.isSelected
      ? props.theme.colors.white
      : props.theme.colors.black};
  transition: background-color 0.3s;
  :hover {
    background-color: ${props =>
      props.isAnswered ? "" : props.theme.colors.gray};
  }
  :last-of-type {
    margin-bottom: 0;
  }
`;

export const Hint = styled.div`
  color: #666;
  padding: 0.2em;
`;

export const HintHighlight = styled.p`
  color: ${getColor("negative")};
`;

interface PillProps {
  isSelected: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
}

const getPillBackground = (props: ThemedProps<PillProps>) =>
  props.isAnswered && (props.isSelected || props.isCorrect)
    ? props.isCorrect
      ? `${props.theme.colors.positive} ${icons.check}`
      : `${props.theme.colors.white} ${icons.cross}`
    : props.theme.colors.primary;

const getPillBorder = (props: ThemedProps<PillProps>) =>
  props.isAnswered && (props.isSelected || props.isCorrect)
    ? props.isCorrect
      ? `solid 0.1em ${props.theme.colors.white}`
      : "none"
    : `solid 0.1em ${props.theme.colors.black}`;

export const Pill = styled.span<PillProps>`
  border-radius: ${getRadius("round")};
  min-width: 1.4em;
  min-height: 1.4em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.4em;
  margin-left: 0.1em;
  font-weight: bold;
  padding: 0.2em;
  background: ${getPillBackground};
  border: ${getPillBorder};
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

export const NextButton = styled.button`
  background-color: ${getColor("secondary")};
  font-size: 1.8em;
  color: white;
  border: none;
  border-radius: ${getRadius("md")};
  padding: 0.3em 0.6em;
  flex: 1;
  @media screen and (max-width: 600px) {
    align-self: flex-end;
    position: fixed;
    width: 100%;
    border-radius: 0;
  }
`;
