import { ToastContainer } from "react-toastify";
import "./App.css"
// import { Provider } from "react-redux";
// import { store } from "./app/store";

import AppRouter from "./router/AppRouter.jsx";

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  );
}

export default App;
