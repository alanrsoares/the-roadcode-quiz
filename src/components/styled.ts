import styled from "@emotion/styled";

export const colors = {
  primary: "#ffd400",
  secondary: "#3482b9",
  positive: "#49c04a",
  negative: "#d03930",
  neutral: "#aaa"
};

export const icons = {
  check: `${
    colors.positive
  } 50% no-repeat url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjIwLjM0OXB4IiBoZWlnaHQ9IjE1LjgyNnB4IiB2aWV3Qm94PSIwIDAgMjAuMzQ5IDE1LjgyNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAuMzQ5IDE1LjgyNiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+IDxwb2x5Z29uIGZpbGw9IiNmZmZmZmYiIHBvaW50cz0iMTguMjI4LDAgMjAuMzQ5LDIuMTIyIDYuNjQ0LDE1LjgyNiAwLDkuMTgyIDIuMTIyLDcuMDYxIDYuNjQ0LDExLjU4MyAiLz4gPC9zdmc+)`,
  cross: `white 50% no-repeat  url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE1Ljg3M3B4IiBoZWlnaHQ9IjE1Ljg5MXB4IiB2aWV3Qm94PSIwIDAgMTUuODczIDE1Ljg5MSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTUuODczIDE1Ljg5MSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+IDxwb2x5Z29uIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSIjZGE0MTIxIiBwb2ludHM9IjE0LjE4NiwwIDE1Ljg3MywxLjc0IDkuNjg2LDcuOTYzIDE1LjgzOCwxNC4xNSAxNC4xNSwxNS44OTEgNy45MjgsOS43MjEgMS44MTEsMTUuODkxIDAuMDM1LDE0LjE1IDYuMTg4LDcuOTYzIDAsMS43NzUgMS43NTgsMCA3Ljk2Myw2LjI0ICIvPiA8L3N2Zz4=)`
};

export const Shell = styled.div`
  background-color: #dedede;
  font-family: Roboto, sans-serif;
  color: #333;
  min-height: 100vh;
`;

export const AppContainer = styled.div`
  margin: 0 auto;
  padding-top 40px;
  max-width: 400px;
`;

export const Header = styled.header`
  font-size: 2em;
  text-align: center;
  color: ${colors.secondary};
  font-weight: bold;
`;

export const ProgressBar = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  background-color: ${colors.neutral};
  height: 1.8em;
  width: 100%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
`;

export const Progress = styled.div<{ ratio: number; color: string }>`
  height: 1.8em;
  background-color: ${props => props.color};
  width: ${props => props.ratio}%;
`;

export const ProgressText = styled.div`
  font-size: 1em;
  font-weight: bold;
  text-align: right;
  position: fixed;
  top: 0;
  right: 0.1em;
  height: 1.8em;
  color: white;
  padding: 0.3em 0.4em;
`;

export const QuestionCard = styled.div`
  margin: 1em auto;
  padding: 0.3em;
  border-radius: 0.2em;
  max-width: 400px;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
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

export const Option = styled.div<{
  isSelected: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
}>`
  display: flex;
  padding: 0.6em 0.2em;
  margin: 0.4em 0;
  align-items: center;
  border-radius: 0.2em;
  cursor: ${props => (props.isAnswered ? "" : "pointer")};
  background-color: ${props =>
    props.isAnswered && props.isSelected
      ? props.isCorrect
        ? colors.positive
        : colors.negative
      : "#eaeaea"};
  color: ${props => (props.isAnswered && props.isSelected ? "#fff" : "#333")};
  :hover {
    background-color: ${props => (props.isAnswered ? "" : "#ccc")};
  }
`;

export const Hint = styled.div`
  color: #666;
  padding: 0.2em;
`;

export const Pill = styled.span<{
  isSelected: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
}>`
  border-radius: 50%;
  min-width: 1.4em;
  min-height: 1.4em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.4em;
  margin-left: 0.1em;
  font-weight: bold;
  border: solid
    ${props =>
      props.isAnswered && (props.isSelected || props.isCorrect)
        ? props.isCorrect
          ? `.1em white`
          : `0`
        : "0.1em #333"};
  padding: 0.2em;
  background: ${props =>
    props.isAnswered && (props.isSelected || props.isCorrect)
      ? props.isCorrect
        ? icons.check
        : icons.cross
      : colors.primary};
`;

export const NextButton = styled.button`
  flex: 1;
  background-color: ${colors.secondary};
  font-size: 1.8em;
  color: white;
  margin: auto;
  border-radius: 0.2em;
  border: none;
  padding: 0.2em 0.4em;
  cursor: pointer;
`;
