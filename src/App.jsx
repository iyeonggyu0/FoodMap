import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "./style/globalStyle";
import ScrollToTop from "./hooks/useScrollTop";

// 페이지 모음
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import FaqPage from "./pages/FaqPage";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ScrollToTop />
      <Routes>
        {/* 메인 */}
        <Route path="/" element={<MainPage />} />

        {/* 푸드트럭 등록 */}
        <Route path="/register" element={<RegisterPage />} />

        {/* FAQ 페이지 */}
        <Route path="/faq" element={<FaqPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
