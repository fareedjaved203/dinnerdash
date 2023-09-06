import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import { store } from "./redux/store.js";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
);
