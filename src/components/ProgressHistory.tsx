import React from "react";

import styled from "styled-components";

import { ratio } from "../helpers";
import { History } from "../types";
import { colors } from "./styled";

const Wrapper = styled.div`
  background-color: #fff;
  display: flex;
  height: 12em;
  justify-content: space-around;
  margin-bottom: 1em;
  border-radius: 0.2em;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  overflow: hidden;
`;

const BarWrapper = styled.div`
  padding: 0.4em 1em;
  background-color: #fff;
  width: 3em;
  display: flex;
  border-right: solid 1px ${colors.gray};
  justify-content: center;
`;

const Bar = styled.div<{ value: number; total: number; color: string }>`
  background-color: ${props => props.color};
  color: ${colors.white};
  align-self: flex-end;
  height: calc(${props => ratio(props.total)(props.value)}%);
  width: calc(50%);
  border-top-right-radius: 0.2em;
  border-top-left-radius: 0.2em;
  margin: 0.1em;
  text-align: center;
  padding: 0.4em 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
`;

interface Props {
  history: History;
}

export default function ProgressHistory(props: Props) {
  return (
    <Wrapper>
      {props.history.map((entry, i) => (
        <BarWrapper key={`entry-${i}`}>
          {!!entry.correct && (
            <Bar
              color={colors.positive}
              value={entry.correct}
              total={entry.total}
            >
              {entry.correct}
            </Bar>
          )}
          {!!entry.incorrect && (
            <Bar
              color={colors.negative}
              value={entry.incorrect}
              total={entry.total}
            >
              {entry.incorrect}
            </Bar>
          )}
        </BarWrapper>
      ))}
    </Wrapper>
  );
}
