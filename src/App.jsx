import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "./style/globalStyle";
import ScrollToTop from "./hooks/useScrollTop";

// 페이지 모음
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import FaqPage from "./pages/FaqPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MapPage from "./pages/MapPage";
// import PrivateRoute from "./util/privateRoute";
import ReportPage from "./pages/ReportPage";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ScrollToTop />
      <Routes>
        {/* 메인 */}
        <Route path="/" element={<MainPage />} />

        {/* FIXME: 로그인 확인 기능 켜기 */}
        {/* FIXME: <Route element={<PrivateRoute />}> */}
        {/* 푸드트럭 등록 */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/my-page" element={<>마이페이지</>} />
        {/* FIXME: </Route> */}

        {/* 지도 페이지 */}
        <Route path="/map" element={<MapPage />} />

        {/* 로그인 페이지 */}
        <Route path="/login" element={<LoginPage />} />
        {/* 회원가입페이지 */}
        <Route path="/sign-up" element={<SignUpPage />} />

        {/* 약관 */}
        <Route path="/terms" element={<TermsPage />} />
        {/* 개인정보처리방침 */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

        {/* FAQ */}
        <Route path="/faq" element={<FaqPage />} />

        {/* 푸드트럭 제보 */}
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
