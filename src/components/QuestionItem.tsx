import React, { useState, StrictMode } from "react";

import {
  colors,
  QuestionCard,
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
  onSelect(isCorrect: boolean): void;
}

export default function QuestionItem(props: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelection = (option: string) => () => {
    if (!!selected) return;
    const correct = option === props.correctAnswer;
    setSelected(option);
    props.onSelect(correct);
  };

  return (
    <QuestionCard>
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
          isAnswered={!!selected}
          isCorrect={key === props.correctAnswer}
          isSelected={key === selected}
        >
          <Pill
            isAnswered={!!selected}
            isCorrect={key === props.correctAnswer}
            isSelected={key === selected}
          >
            {!!selected && (key === selected || key === props.correctAnswer)
              ? ""
              : key}
          </Pill>
          <div>{props.answers[key]}</div>
        </Option>
      ))}
      {!!selected && (
        <Hint>
          {selected !== props.correctAnswer && (
            <p style={{ color: colors.negative }}>
              Correct Answer: {props.correctAnswer}
            </p>
          )}
          {`For more information about this question refer to page ${
            props.roadCodePage
          } of the Official New Zealand Road Code.`}
        </Hint>
      )}
    </QuestionCard>
  );
}
