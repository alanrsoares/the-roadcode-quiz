import React, { useCallback, useEffect, useState } from "react";

import { History, IQuestionItem } from "./types";

import {
  AppContainer,
  colors,
  Footer,
  Header,
  NextButton,
  Progress,
  QuestionItem,
  Shell,
  SummaryCard
} from "./components";
import ProgressHistory from "./components/ProgressHistory";

import { shuffle } from "./helpers";
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

type SetStateFn = (value: React.SetStateAction<State>) => void;

const makeActionHandlers = (
  setState: SetStateFn,
  questions: IQuestionItem[]
) => ({
  onNextQuestionClick() {
    setState(state =>
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
    setState(state => {
      const entry = {
        correct: state.correctCount,
        incorrect: state.incorrectCount,
        total: state.questionsAmount
      };
      const history: History = Storage.read([], "/history");
      Storage.persist<History>([...history.slice(0, 4), entry], "/history");

      return {
        ...INITIAL_STATE,
        questionsAmount: state.questionsAmount,
        questions: shuffle(questions).slice(0, state.questionsAmount)
      };
    });
  },
  onOptionSelection(selectedOption: string, isCorrect: boolean) {
    setState(state => {
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
});

const useHandlers = (setState: SetStateFn, props: Props) => {
  const make = useCallback(
    () => makeActionHandlers(setState, props.questions),
    []
  );

  return make();
};

export default function App(props: Props) {
  const defaultState = {
    ...INITIAL_STATE,
    questions: props.questions.slice(0, INITIAL_STATE.questionsAmount)
  };

  const [state, setState] = useState<State>(Storage.read(defaultState));

  useEffect(() => {
    Storage.persist(state);
  });

  const actions = useHandlers(setState, props);

  const selectedItem = state.questions[state.index];

  return (
    <Shell>
      <Progress
        questionsCount={state.questionsAmount}
        incorrectCount={state.incorrectCount}
        correctCount={state.correctCount}
      />
      <AppContainer>
        <Header>The Road Quiz</Header>
        <main>
          {state.isDone ? (
            <>
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
              <ProgressHistory
                history={Storage.read<History>([], "/history")}
              />
            </>
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
              <NextButton onClick={actions.onResetState}>Play again</NextButton>
            ) : (
              <NextButton onClick={actions.onNextQuestionClick}>
                Next question
              </NextButton>
            ))}
        </Footer>
      </AppContainer>
    </Shell>
  );
}
