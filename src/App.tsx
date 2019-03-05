import React, { useEffect, useState } from "react";

import { IQuestionItem } from "./types";

import {
  AppContainer,
  ButtonContainer,
  colors,
  Header,
  NextButton,
  Progress,
  QuestionItem,
  Shell,
  SummaryCard,
} from "./components";

import { ratio, shuffle } from "./helpers";
import Storage from "./Storage";
import "./styles.css";

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
  selectedOption: null,
};

interface Props {
  questions: IQuestionItem[];
}

type SetStateFn = (value: React.SetStateAction<State>) => void;

const makeActionHandlers = (
  setState: SetStateFn,
  questions: IQuestionItem[],
) => ({
  onNextQuestionClick() {
    setState((state) =>
      state.index < state.questionsSample - 1
        ? {
            ...state,
            index: state.index + 1,
            isAnswered: false,
            selectedOption: null,
          }
        : state,
    );
  },
  onResetState() {
    setState((state) => ({
      ...INITIAL_STATE,
      questionsSample: state.questionsSample,
      questions: shuffle(questions).slice(0, state.questionsSample),
    }));
  },
  onOptionSelection(selectedOption: string, isCorrect: boolean) {
    setState((state) => {
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
        status: isFailed ? "FAILED" : isDone ? "PASSED" : "IN_PROGRESS",
      };
    });
  },
});

export default function App(props: Props) {
  const defaultState = {
    ...INITIAL_STATE,
    questions: props.questions.slice(0, INITIAL_STATE.questionsSample),
  };

  const [state, setState] = useState<State>(Storage.read(defaultState));

  useEffect(() => Storage.persist(state));

  const actions = makeActionHandlers(setState, props.questions);

  const selectedItem = state.questions[state.index];

  return (
    <Shell>
      <Progress
        questionsCount={state.answeredCount}
        incorrectCount={state.incorrectCount}
        correctCount={state.correctCount}
      />
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
            onSelect={actions.onOptionSelection}
            index={state.index + 1}
            selected={state.selectedOption}
            {...selectedItem.value}
          />
        )}
        <ButtonContainer>
          {!!state.isAnswered &&
            (state.isDone ? (
              <NextButton onClick={actions.onResetState}>Play again</NextButton>
            ) : (
              <NextButton onClick={actions.onNextQuestionClick}>
                Next question
              </NextButton>
            ))}
        </ButtonContainer>
      </AppContainer>
    </Shell>
  );
}
