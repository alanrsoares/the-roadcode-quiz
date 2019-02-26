import React, { useState } from "react";

import {
  colors,
  Shell,
  ProgressBar,
  Progress,
  ProgressText,
  AppContainer,
  Header
} from "./components";

import "./styles.css";
import { IQuestionItem } from "./types";
import QuestionItem from "./components/QuestionItem";

const INITIAL_STATE = {
  answered: 0,
  correct: 0,
  incorrect: 0
};

export default function App(props: { items: IQuestionItem[] }) {
  const [state, setState] = useState(INITIAL_STATE);
  const [index, setIndex] = useState(0);

  const handleSelect = (isCorrect: boolean) => {
    setState({
      answered: state.answered + 1,
      correct: isCorrect ? state.correct + 1 : state.correct,
      incorrect: !isCorrect ? state.incorrect + 1 : state.incorrect
    });
  };

  const handleNextClick = () => {
    if (index < props.items.length - 1) {
      setIndex(index + 1);
    }
  };

  const ratio = (n: number) => (n / props.items.length) * 100;

  const progressRatio = ratio(state.answered);
  const correctRatio = ratio(state.correct);
  const incorrectRatio = ratio(state.incorrect);

  const ratios = [
    {
      ratio: incorrectRatio,
      color: colors.negative
    },
    {
      ratio: correctRatio,
      color: colors.positive
    }
  ];

  const selectedItem = props.items[index];

  return (
    <Shell>
      <ProgressBar>
        {ratios.map(radio => (
          <Progress key={radio.color} ratio={radio.ratio} color={radio.color} />
        ))}
      </ProgressBar>
      <ProgressText>
        {state.answered} of {props.items.length} ({Math.round(progressRatio)}%)
        {!!state.incorrect &&
          ` / ${state.incorrect} wrong answer${state.incorrect > 1 ? "s" : ""}`}
      </ProgressText>
      <AppContainer>
        <Header>The Road Code</Header>
        <QuestionItem
          key={selectedItem.key}
          onSelect={handleSelect}
          onNextClick={handleNextClick}
          index={index + 1}
          {...selectedItem.value}
        />
      </AppContainer>
    </Shell>
  );
}
