import React, { StrictMode } from "react";
import { render } from "react-dom";

import { cache as questions } from "./db.json";
import registerServiceWorker from "./registerServiceWorker";

import App from "./App";

const rootElement = document.getElementById("root");

const app = (
  <StrictMode>
    <App questions={questions} />
  </StrictMode>
);

render(app, rootElement);

registerServiceWorker();
