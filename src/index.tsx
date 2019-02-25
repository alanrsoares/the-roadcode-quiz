import React, { useState } from "react";
import { render } from "react-dom";
import styled from "@emotion/styled";

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
  Hint
} from "./components";

import "./styles.css";

function QuestionItem(props) {
  const [isCorrect, setCorrect] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelection = (option: string) => () => {
    if (!!selected) return;
    const correct = option === props.correctAnswer;
    setSelected(option);
    setCorrect(correct);
    props.onSelect(correct);
  };

  return (
    <QuestionCard>
      <Question>
        <QuestionText>
          #{props.index}: {props.question}
        </QuestionText>
        <ImageWrapper>
          <Image src={props.image.uri} />
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

const INITIAL_STATE = {
  answered: 0,
  correct: 0,
  incorrect: 0
};

function App({ items }) {
  const [state, setState] = useState(INITIAL_STATE);

  const handleSelect = (isCorrect: boolean) => {
    setState({
      answered: state.answered + 1,
      correct: isCorrect ? state.correct + 1 : state.correct,
      incorrect: !isCorrect ? state.incorrect + 1 : state.incorrect
    });
  };

  const ratio = n => (n / items.length) * 100;

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
        {items.map(({ key, value }, i) => (
          <QuestionItem
            key={key}
            onSelect={handleSelect}
            index={i + 1}
            {...value}
          />
        ))}
      </AppContainer>
    </Shell>
  );
}

const rootElement = document.getElementById("root");
render(<App items={shuffle(data)} />, rootElement);
