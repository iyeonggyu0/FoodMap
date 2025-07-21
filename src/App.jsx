import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "./style/globalStyle";
import useScrollTop from "./hooks/useScrollTop";

function App() {
  useScrollTop();
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
