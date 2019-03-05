import styled from "@emotion/styled";

export const colors = {
  primary: "#ffd400",
  secondary: "#3482b9",
  positive: "#49c04a",
  negative: "#d03930",
  neutral: "#aaa",
  muted: "#eaeaea",
  hotpink: "#FC8BA4",
  black: "#333",
  white: "#fff",
  gray: "#ccc",
  // alternative pallette
  lightbrown: "#AD5114",
  darkbrown: "#663210",
  asphaltgrey: "#415E6D",
  lightgrey: "#A0AEB6",
  lightgreen: "#75B600",
  olivegreen: "#46600E",
};

export const icons = {
  check: `${
    colors.positive
  } 50% no-repeat url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjIwLjM0OXB4IiBoZWlnaHQ9IjE1LjgyNnB4IiB2aWV3Qm94PSIwIDAgMjAuMzQ5IDE1LjgyNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAuMzQ5IDE1LjgyNiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+IDxwb2x5Z29uIGZpbGw9IiNmZmZmZmYiIHBvaW50cz0iMTguMjI4LDAgMjAuMzQ5LDIuMTIyIDYuNjQ0LDE1LjgyNiAwLDkuMTgyIDIuMTIyLDcuMDYxIDYuNjQ0LDExLjU4MyAiLz4gPC9zdmc+)`,
  cross: `white 50% no-repeat  url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE1Ljg3M3B4IiBoZWlnaHQ9IjE1Ljg5MXB4IiB2aWV3Qm94PSIwIDAgMTUuODczIDE1Ljg5MSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTUuODczIDE1Ljg5MSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+IDxwb2x5Z29uIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSIjZGE0MTIxIiBwb2ludHM9IjE0LjE4NiwwIDE1Ljg3MywxLjc0IDkuNjg2LDcuOTYzIDE1LjgzOCwxNC4xNSAxNC4xNSwxNS44OTEgNy45MjgsOS43MjEgMS44MTEsMTUuODkxIDAuMDM1LDE0LjE1IDYuMTg4LDcuOTYzIDAsMS43NzUgMS43NTgsMCA3Ljk2Myw2LjI0ICIvPiA8L3N2Zz4=)`,
};

export const Shell = styled.div`
  display: flex;
  background-color: #dedede;
  font-family: Roboto, sans-serif;
  color: ${colors.black};
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
  color: ${colors.secondary};
  font-weight: bold;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 10vh;
  margin: 1em 0;
  padding: 0.3em;
  border-radius: 0.2em;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  @media screen and (max-width: 600px) {
    margin: 1em 0.4em;
  }
`;

export const SummaryCard = styled(Card)`
  justify-content: center;
  align-items: center;
  min-height: 10vh;
  font-weight: bold;
  color: ${colors.white};
  font-size: 1.2em;
  background-color: ${(props) => props.color};
`;

export const Question = styled.div`
  font-size: 16px;
  font-weight: bold;
  background: ${colors.primary};
  padding: 0.3em;
  border-radius: 0.2em;
  display: flex;
  justify-content: space-between;
`;

export const QuestionText = styled.div`
  margin: 0.2em;
  margin-right: 0.1em;
`;

export const Image = styled.img`
  width: 8em;
  height: 8em;
  overflow: hidden;
  border-radius: 50%;
  border: solid 0.2em white;
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

const getOptionBackgroundColor = (props: OptionProps) =>
  props.isAnswered && props.isSelected
    ? props.isCorrect
      ? colors.positive
      : colors.negative
    : colors.muted;

export const Option = styled.div<OptionProps>`
  display: ${getOptionDisplay};
  padding: 0.6em 0.2em;
  margin: 0.4em 0;
  align-items: center;
  border-radius: 0.2em;
  cursor: ${(props) => (props.isAnswered ? "" : "pointer")};
  background-color: ${getOptionBackgroundColor};
  color: ${(props) =>
    props.isAnswered && props.isSelected ? colors.white : colors.black};
  :hover {
    background-color: ${(props) => (props.isAnswered ? "" : colors.gray)};
  }
`;

export const Hint = styled.div`
  color: #666;
  padding: 0.2em;
`;

interface PillProps {
  isSelected: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
}

const getPillBackground = (props: PillProps) =>
  props.isAnswered && (props.isSelected || props.isCorrect)
    ? props.isCorrect
      ? icons.check
      : icons.cross
    : colors.primary;

const getPillBorder = (props: PillProps) =>
  props.isAnswered && (props.isSelected || props.isCorrect)
    ? props.isCorrect
      ? `solid 0.1em ${colors.white}`
      : `none`
    : `solid 0.1em ${colors.black}`;

export const Pill = styled.span<PillProps>`
  border-radius: 50%;
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

export const ButtonContainer = styled.div`
  display: flex;
  justify-self: flex-end;
  align-self: flex-end;
  width: 100%;
  @media screen and (max-width: 600px) {
    flex: 1;
  }
`;

export const NextButton = styled.button`
  background-color: ${colors.secondary};
  font-size: 1.8em;
  color: white;
  border: none;
  border-radius: 0.1em;
  padding: 0.3em 0.6em;
  flex: 1;
  @media screen and (max-width: 600px) {
    align-self: flex-end;
    border-radius: 0;
  }
`;
