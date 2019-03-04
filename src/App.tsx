import React, { useState, useEffect } from "react";

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
  ButtonContainer,
  Card,
  SummaryCard
} from "./components";

import "./styles.css";
import { shuffle } from "./helpers";
import { Storage } from "./Storage";

type Status = "IN_PROGRESS" | "PASSED" | "FAILED";

interface State {
  answeredCount: number;
  correctCount: number;
  incorrectCount: number;
  isDone: boolean;
  index: number;
  isAnswered: boolean;
  questions: IQuestionItem[];
  questionsSample: number;
  status: Status;
  selectedOption: string | null;
}

const INITIAL_STATE: State = {
  answeredCount: 0,
  correctCount: 0,
  incorrectCount: 0,
  isDone: false,
  index: 0,
  isAnswered: false,
  questions: [],
  questionsSample: 35,
  status: "IN_PROGRESS",
  selectedOption: null
};

interface Props {
  questions: IQuestionItem[];
}

type SetStateFn = (value: React.SetStateAction<State>) => void;

const makeHandlers = (setState: SetStateFn, questions: IQuestionItem[]) => ({
  handleNextQuestionClick() {
    setState(state =>
      state.index < state.questionsSample - 1
        ? {
            ...state,
            index: state.index + 1,
            isAnswered: false,
            selectedOption: null
          }
        : state
    );
  },
  handleResetState() {
    setState(state => ({
      ...INITIAL_STATE,
      questionsSample: state.questionsSample,
      questions: shuffle(questions).slice(0, state.questionsSample)
    }));
  },
  handleOptionSelect(selectedOption: string, isCorrect: boolean) {
    setState(state => {
      const isDone = state.index === state.questionsSample - 1;
      const incorrectCount = !isCorrect
        ? state.incorrectCount + 1
        : state.incorrectCount;
      const correctCount = isCorrect
        ? state.correctCount + 1
        : state.correctCount;
      const isFailed = incorrectCount > 3;

      return {
        ...state,
        selectedOption,
        answeredCount: state.answeredCount + 1,
        correctCount,
        incorrectCount,
        isDone: isDone || isFailed,
        isAnswered: true,
        status: isFailed ? "FAILED" : isDone ? "PASSED" : "IN_PROGRESS"
      };
    });
  }
});

export default function App(props: Props) {
  const [state, setState] = useState<State>(
    Storage.read({
      ...INITIAL_STATE,
      questions: props.questions.slice(0, INITIAL_STATE.questionsSample)
    })
  );

  useEffect(() => {
    console.log("persisting");
    Storage.persist(state);
  });

  const handlers = makeHandlers(setState, props.questions);

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
        {ratios.map(({ color, ratio }) => (
          <Progress key={color} ratio={ratio} color={color} />
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
        <Header>The Road Quiz</Header>
        {state.isDone ? (
          <SummaryCard
            color={
              state.status === "FAILED" ? colors.negative : colors.positive
            }
          >
            {state.status === "FAILED"
              ? `Sorry, you failed ${
                  state.incorrectCount
                } questions. Try again.`
              : "Congratulations, you passed the test!"}
          </SummaryCard>
        ) : (
          <QuestionItem
            key={selectedItem.key}
            onSelect={handlers.handleOptionSelect}
            index={state.index + 1}
            selected={state.selectedOption}
            {...selectedItem.value}
          />
        )}
        <ButtonContainer>
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
        </ButtonContainer>
      </AppContainer>
    </Shell>
  );
}
