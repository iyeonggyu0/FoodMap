import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "./style/globalStyle";
import ScrollToTop from "./hooks/useScrollTop";

import MainPage from "./pages/MainPage";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
