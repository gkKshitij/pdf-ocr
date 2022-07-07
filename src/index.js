import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { DataContextProvider } from "./store/pdf-data";
import App from "./App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <DataContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DataContextProvider>,
  rootElement
);
