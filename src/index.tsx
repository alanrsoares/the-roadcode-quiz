import React, { StrictMode } from "react";
import { render } from "react-dom";

import registerServiceWorker from "./registerServiceWorker";
import { shuffle } from "./helpers";
import { cache as data } from "./db.json";

import "./styles.css";
import { IQuestionItem } from "./types";

import App from "./App";

const rootElement = document.getElementById("root");

const app = (
  <StrictMode>
    <App items={shuffle<IQuestionItem>(data).slice(0, 40)} />
  </StrictMode>
);

render(app, rootElement);

registerServiceWorker();
