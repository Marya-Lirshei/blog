import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./components/App/App";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
