import React, { useState } from "react";

import { IQuestionItem } from "./types";

import {
  colors,
  Shell,
  ProgressBar,
  Progress,
  ProgressText,
  AppContainer,
  Header,
  QuestionItem,
  NextButton,
  SummaryCard
} from "./components";

import "./styles.css";
import { shuffle } from "./helpers";

interface State {
  answeredCount: number;
  correctCount: number;
  incorrectCount: number;
  isDone: boolean;
  index: number;
  isAnswered: boolean;
  questions: IQuestionItem[];
  questionsSample: number;
}

const INITIAL_STATE: State = {
  answeredCount: 0,
  correctCount: 0,
  incorrectCount: 0,
  isDone: false,
  index: 0,
  isAnswered: false,
  questions: [],
  questionsSample: 35
};

interface Props {
  items: IQuestionItem[];
}

type SetStateFn = (value: React.SetStateAction<State>) => void;

const makeHandlers = (setState: SetStateFn, allQuestions: IQuestionItem[]) => ({
  handleNextQuestionClick() {
    setState(state =>
      state.index < state.questionsSample - 1
        ? { ...state, index: state.index + 1, isAnswered: false }
        : state
    );
  },
  handleResetState() {
    setState(state => ({
      ...INITIAL_STATE,
      questionsSample: state.questionsSample,
      questions: shuffle<IQuestionItem>(allQuestions).slice(
        0,
        state.questionsSample
      )
    }));
  },

  handleOptionSelect(isCorrect: boolean) {
    setState(state => ({
      ...state,
      answeredCount: state.answeredCount + 1,
      correctCount: isCorrect ? state.correctCount + 1 : state.correctCount,
      incorrectCount: !isCorrect
        ? state.incorrectCount + 1
        : state.incorrectCount,
      isDone: state.index === state.questionsSample - 1,
      isAnswered: true
    }));
  }
});

export default function App(props: Props) {
  const [state, setState] = useState<State>({
    ...INITIAL_STATE,
    questions: shuffle(props.items).slice(0, INITIAL_STATE.questionsSample)
  });

  const handlers = makeHandlers(setState, props.items);

  const ratio = (n: number) => (n / state.questionsSample) * 100;

  const progressRatio = ratio(state.answeredCount);
  const correctRatio = ratio(state.correctCount);
  const incorrectRatio = ratio(state.incorrectCount);

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

  const selectedItem = state.questions[state.index];

  return (
    <Shell>
      <ProgressBar>
        {ratios.map(radio => (
          <Progress key={radio.color} ratio={radio.ratio} color={radio.color} />
        ))}
      </ProgressBar>
      <ProgressText>
        {state.answeredCount} of {state.questionsSample} (
        {Math.round(progressRatio)}%)
        {!!state.incorrectCount &&
          ` / ${state.incorrectCount} wrong answer${
            state.incorrectCount > 1 ? "s" : ""
          }`}
      </ProgressText>
      <AppContainer>
        <Header>The Road Code</Header>

        {state.isDone ? (
          <SummaryCard>completed</SummaryCard>
        ) : (
          <QuestionItem
            key={selectedItem.key}
            onSelect={handlers.handleOptionSelect}
            index={state.index + 1}
            {...selectedItem.value}
          />
        )}

        {!!state.isAnswered &&
          (state.isDone ? (
            <NextButton onClick={handlers.handleResetState}>
              Play again
            </NextButton>
          ) : (
            <NextButton onClick={handlers.handleNextQuestionClick}>
              Next question
            </NextButton>
          ))}
      </AppContainer>
    </Shell>
  );
}
