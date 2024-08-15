import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";

import reportWebVitals from "reportWebVitals";
import registerServiceWorker from "registerServiceWorker";

import Splash from "ui/compounds/Splash";

import pkgJson from "../package.json";

const App = React.lazy(/* webpackChunkName: "app" */ () => import("App"));

// add appVersion to global scope
global.appVersion = pkgJson.version;

const root = createRoot(document.getElementById("root")!);

root.render(
  <Suspense fallback={<Splash />}>
    <App />
  </Suspense>
);

declare global {
  interface Window {
    gtag(method: string, event: string, meta: Record<string, any>): void;
  }
}

reportWebVitals(({ id, name, value }) => {
  window.gtag("send", "event", {
    eventCategory: "Web Vitals",
    eventAction: name,
    eventValue: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
    eventLabel: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate
  });
});

registerServiceWorker();
