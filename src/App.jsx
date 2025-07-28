import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "./style/globalStyle";
import ScrollToTop from "./hooks/useScrollTop";

// 페이지 모음
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ScrollToTop />
      <Routes>
        {/* 메인 */}
        <Route path="/" element={<MainPage />} />

        {/* 푸드트럭 등록 */}
        {/* FIXME: 로그인 확인 기능 만들기 */}
        <Route path="/register" element={<RegisterPage />} />

        {/* 약관 */}
        <Route path="/terms" element={<TermsPage />} />
        {/* 개인정보처리방침 */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
