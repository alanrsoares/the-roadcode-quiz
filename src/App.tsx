import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { IQuestionItem } from "types";

import {
  AppContainer,
  AppHeader,
  ButtonIcon,
  Footer,
  NextButton,
  Shell,
  SummaryCard
} from "ui/components";
import { Progress, QuestionItem } from "ui/compounds";

import { shuffle } from "helpers";
import useUpdateChecker from "lib/useUpdateChecker";
import Storage from "StorageAdapter";
import "styles.css";

type Status = "IN_PROGRESS" | "PASSED" | "FAILED";

interface State {
  answeredCount: number;
  correctCount: number;
  incorrectCount: number;
  isDone: boolean;
  index: number;
  isAnswered: boolean;
  questions: IQuestionItem[];
  questionsAmount: number;
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
  questionsAmount: 35,
  status: "IN_PROGRESS",
  selectedOption: null
};

interface Props {
  questions: IQuestionItem[];
}

function useActionHandlers(
  setState: Dispatch<SetStateAction<State>>,
  questions: IQuestionItem[]
) {
  return {
    onNextQuestionClick() {
      setState((state: State) =>
        state.index < state.questionsAmount - 1
          ? {
              ...state,
              index: state.index + 1,
              isAnswered: false,
              selectedOption: null
            }
          : state
      );
    },
    onResetState() {
      setState((state: State) => ({
        ...INITIAL_STATE,
        questionsAmount: state.questionsAmount,
        questions: shuffle(questions).slice(0, state.questionsAmount)
      }));
    },
    onOptionSelection(selectedOption: string, isCorrect: boolean) {
      setState((state: State) => {
        const isDone = state.index === state.questionsAmount - 1;
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
  };
}

export default function App(props: Props) {
  const defaultState = {
    ...INITIAL_STATE,
    questions: props.questions.slice(0, INITIAL_STATE.questionsAmount)
  };

  const [state, setState] = useState<State>(Storage.read(defaultState));

  useEffect(() => Storage.persist(state));

  useUpdateChecker();

  const actions = useActionHandlers(setState, props.questions);

  const selectedItem = state.questions[state.index];

  return (
    <Shell>
      <Progress
        questionsCount={state.questionsAmount}
        incorrectCount={state.incorrectCount}
        correctCount={state.correctCount}
      />
      <AppContainer>
        <AppHeader>NZ Road Code Quiz</AppHeader>
        <main>
          {state.isDone ? (
            <SummaryCard
              color={state.status === "FAILED" ? "negative" : "positive"}
            >
              {state.status === "FAILED" ? (
                <>
                  {`Oh no! You failed ${state.incorrectCount} questions`}.
                  <br />
                  Don't give up just yet, go and try again.
                </>
              ) : (
                <>Awesome, you passed the test!</>
              )}
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
        </main>
        <Footer>
          {!!state.isAnswered &&
            (state.isDone ? (
              <NextButton
                onClick={actions.onResetState}
                onTouchEnd={actions.onResetState}
                color="positive"
              >
                Play again!
              </NextButton>
            ) : (
              <NextButton
                onClick={actions.onNextQuestionClick}
                onTouchEnd={actions.onNextQuestionClick}
              >
                <span style={{ marginTop: "-0.2em" }}>Next question</span>
                <ButtonIcon>
                  <span style={{ marginTop: "-0.2em" }}>»</span>
                </ButtonIcon>
              </NextButton>
            ))}
        </Footer>
      </AppContainer>
    </Shell>
  );
}
