import React, { useState, StrictMode } from "react";

import {
  colors,
  Card,
  Question,
  QuestionText,
  ImageWrapper,
  Pill,
  Image,
  Option,
  Hint
} from "./styled";

import { IQuestion } from "../types";

interface Props extends IQuestion {
  index: number;
  selected: string | null;
  onSelect(selectedOption: string, isCorrect: boolean): void;
}

export default function QuestionItem(props: Props) {
  const handleSelection = (option: string) => () => {
    if (!!props.selected) return;

    props.onSelect(option, option === props.correctAnswer);
  };

  return (
    <Card>
      <Question>
        <QuestionText>
          #{props.index}: {props.question}
        </QuestionText>
        <ImageWrapper>
          <Image alt="question's image" src={props.image.uri} />
        </ImageWrapper>
      </Question>
      {Object.keys(props.answers).map(key => (
        <Option
          key={key}
          onClick={handleSelection(key)}
          isAnswered={!!props.selected}
          isCorrect={key === props.correctAnswer}
          isSelected={key === props.selected}
        >
          <Pill
            isAnswered={!!props.selected}
            isCorrect={key === props.correctAnswer}
            isSelected={key === props.selected}
          >
            {!!props.selected &&
            (key === props.selected || key === props.correctAnswer)
              ? ""
              : key}
          </Pill>
          <div>{props.answers[key]}</div>
        </Option>
      ))}
      {!!props.selected && (
        <Hint>
          {props.selected !== props.correctAnswer && (
            <p style={{ color: colors.negative }}>
              Correct Answer: {props.correctAnswer}
            </p>
          )}
          {`For more information about this question refer to page ${
            props.roadCodePage
          } of the Official New Zealand Road Code.`}
        </Hint>
      )}
    </Card>
  );
}