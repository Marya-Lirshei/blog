import { createRoot } from "react-dom/client";
// import { Provider } from "react-redux";
import App from "./components/App/App";


const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(
  // <Provider store={store}>
    <App />
  // </Provider>
);