export interface IQuestion {
  question: string;
  correctAnswer: string;
  image: {
    uri: string;
  };
  answers: { [key: string]: string };
  roadCodePage: string;
}

export interface IQuestionItem {
  key: string;
  value: IQuestion;
}
