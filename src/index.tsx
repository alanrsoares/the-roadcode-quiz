import React, { useState } from "react";
import { render } from "react-dom";

import registerServiceWorker from "./registerServiceWorker";
import { shuffle } from "./helpers";
import { cache as data } from "./db.json";

import {
  colors,
  Shell,
  ProgressBar,
  Progress,
  ProgressText,
  AppContainer,
  Header,
  QuestionCard,
  Question,
  QuestionText,
  ImageWrapper,
  Pill,
  Image,
  Option,
  Hint,
  NextButton
} from "./components";

import "./styles.css";

interface QuestionItemProps extends IQuestion {
  index: number;
  onSelect(isCorrect: boolean): void;
  onNextClick(): void;
}

function QuestionItem(props: QuestionItemProps) {
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
        <>
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
          <div style={{ display: "flex", marginTop: ".4em" }}>
            <NextButton
              onClick={props.onNextClick}
              onTouchEnd={props.onNextClick}
            >
              Next question
            </NextButton>
          </div>
        </>
      )}
    </QuestionCard>
  );
}

const INITIAL_STATE = {
  answered: 0,
  correct: 0,
  incorrect: 0
};

interface IQuestion {
  question: string;
  correctAnswer: string;
  image: {
    uri: string;
  };
  answers: { [key: string]: string };
  roadCodePage: string;
}

interface IQuestionItem {
  key: string;
  value: IQuestion;
}

function App(props: { items: IQuestionItem[] }) {
  const [state, setState] = useState(INITIAL_STATE);
  const [index, setIndex] = useState(0);

  const handleSelect = (isCorrect: boolean) => {
    setState({
      answered: state.answered + 1,
      correct: isCorrect ? state.correct + 1 : state.correct,
      incorrect: !isCorrect ? state.incorrect + 1 : state.incorrect
    });
  };

  const handleNextClick = () => setIndex(index + 1);

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
        {state.answered} of {data.length} ({Math.round(progressRatio)}%)
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

const rootElement = document.getElementById("root");

render(<App items={shuffle<IQuestionItem>(data)} />, rootElement);

registerServiceWorker();
