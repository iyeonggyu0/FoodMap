import React, { useState } from "react";
import axios from "axios";

const ApiTestPage = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});

  const baseURL = import.meta.env.VITE_API_URL;

  // 결과를 상태에 저장하는 함수
  const saveResult = (apiName, result) => {
    setResults((prev) => ({
      ...prev,
      [apiName]: result,
    }));
  };

  // 로딩 상태 관리
  const setLoadingState = (apiName, isLoading) => {
    setLoading((prev) => ({
      ...prev,
      [apiName]: isLoading,
    }));
  };

  // =================================
  // 1. 사용자 인증 관련 API
  // =================================

  // 1.1 로그인 API (LoginPage에서 발견)
  const testLogin = async () => {
    const apiName = "login";
    setLoadingState(apiName, true);
    try {
      const params = new URLSearchParams();
      params.append("username", "testuser456");
      params.append("password", "testpass456");

      const response = await axios.post(`${baseURL}/login`, params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      });
      console.log("[login] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[login] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 1.2 로그인 상태 확인 API (useLoginCheck, privateRoute에서 발견)
  const testLoginCheck = async () => {
    const apiName = "loginCheck";
    setLoadingState(apiName, true);
    try {
      const response = await axios.get(`${baseURL}/login/check`, { withCredentials: true });
      console.log("[loginCheck] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[loginCheck] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 1.3 로그아웃 API (MyPage에서 발견)
  const testLogout = async () => {
    const apiName = "logout";
    setLoadingState(apiName, true);
    try {
      const response = await axios.post(`${baseURL}/logout`, { withCredentials: true });
      console.log("[logout] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[logout] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // =================================
  // 2. 회원가입 관련 API (실제 코드 기반)
  // =================================

  // 2.1 회원가입 API (SignUpPage에서 발견)
  const testSignup = async () => {
    const apiName = "signup";
    setLoadingState(apiName, true);
    try {
      const params = new URLSearchParams();
      params.append("username", "testuser456");
      params.append("password", "testpass456");
      params.append("nickname", "테스트유저");
      params.append("email", "test@example.com");
      params.append("role", "user");
      params.append("phone", "01012345678");

      const response = await axios.post(`${baseURL}/member`, params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      });
      console.log("[signup] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[signup] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // =================================
  // 3. SMS 인증 관련 API (실제 코드 기반)
  // =================================

  // 3.1 SMS 발송 API (SignUpPage, MyPageInfoCP에서 발견)
  const testSmsSend = async () => {
    const apiName = "smsSend";
    setLoadingState(apiName, true);
    try {
      const params = new URLSearchParams();
      params.append("phone", "01012345678");

      const response = await axios.post(`${baseURL}/api/sms/send`, params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      });
      console.log("[smsSend] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[smsSend] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 3.2 SMS 인증 확인 API - 회원가입용 (SignUpPage에서 발견)
  const testSmsVerifySignup = async () => {
    const apiName = "smsVerifySignup";
    setLoadingState(apiName, true);
    try {
      const params = new URLSearchParams();
      params.append("phone", "01012345678");
      params.append("code", "123456");

      const response = await axios.post(`${baseURL}/api/sms/verify`, params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      });
      console.log("[smsVerifySignup] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[smsVerifySignup] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 3.3 SMS 인증 확인 API - 마이페이지용 (MyPageInfoCP에서 발견)
  const testSmsVerifyMypage = async () => {
    const apiName = "smsVerifyMypage";
    setLoadingState(apiName, true);
    try {
      const response = await axios.post(
        `${baseURL}/api/sms/verify`,
        {
          phone: "01012345678",
          certification: "123456",
        },
        { withCredentials: true }
      );
      console.log("[smsVerifyMypage] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[smsVerifyMypage] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // =================================
  // 4. 사용자 정보 관리 API (실제 코드 기반)
  // =================================

  // 4.1 사용자 정보 조회 API (MyPage에서 발견)
  const testUserInfo = async () => {
    const apiName = "userInfo";
    setLoadingState(apiName, true);
    try {
      const response = await axios.get(`${baseURL}/user/info`, { withCredentials: true });
      console.log("[userInfo] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[userInfo] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 4.2 비밀번호 변경 API (MyPageInfoCP에서 발견)
  const testPasswordChange = async () => {
    const apiName = "passwordChange";
    setLoadingState(apiName, true);
    try {
      const response = await axios.put(
        `${baseURL}/user/password`,
        {
          password: "newpassword123",
        },
        { withCredentials: true }
      );
      console.log("[passwordChange] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[passwordChange] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 4.3 닉네임 변경 API (MyPageInfoCP에서 발견)
  const testNicknameChange = async () => {
    const apiName = "nicknameChange";
    setLoadingState(apiName, true);
    try {
      const response = await axios.put(
        `${baseURL}/user/nickname`,
        {
          nickname: "새닉네임",
        },
        { withCredentials: true }
      );
      console.log("[nicknameChange] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[nicknameChange] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 4.4 회원탈퇴 API (MyPageInfoCP에서 발견)
  const testUserSecession = async () => {
    const apiName = "userSecession";
    setLoadingState(apiName, true);
    try {
      const response = await axios.delete(`${baseURL}/user/secession`, { withCredentials: true });
      console.log("[userSecession] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[userSecession] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // =================================
  // 5. 푸드트럭 관리 API (실제 코드 기반)
  // =================================

  // 5.1 푸드트럭 정보 조회 API (MyFTCP에서 발견)
  const testFoodtruckGet = async () => {
    const apiName = "foodtruckGet";
    setLoadingState(apiName, true);
    try {
      const response = await axios.get(`${baseURL}/user/foodtruck`, { withCredentials: true });
      console.log("[foodtruckGet] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[foodtruckGet] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 5.2 푸드트럭 정보 수정 API (MyFTCP에서 발견)
  const testFoodtruckUpdate = async () => {
    const apiName = "foodtruckUpdate";
    setLoadingState(apiName, true);
    try {
      const response = await axios.put(
        `${baseURL}/user/foodtruck`,
        {
          name: "맛있는 푸드트럭",
          category: "분식",
          intro: "맛있는 음식을 제공합니다",
          operatorNum: "123-45-67890",
          menu: [
            {
              name: "떡볶이",
              price: "4000",
              info: "매콤달콤한 떡볶이",
              num: "1",
            },
          ],
          schedule: [
            {
              day: "월",
              holiday: false,
              start: "10:00",
              end: "20:00",
              mapAddress: "서울시 강남구",
              userAddress: "강남역 근처",
            },
          ],
        },
        { withCredentials: true }
      );
      console.log("[foodtruckUpdate] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[foodtruckUpdate] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // =================================
  // 6. 지도/푸드트럭 목록 API (실제 코드 기반)
  // =================================

  // 6.1 푸드트럭 목록 조회 API (MapPage에서 발견)
  const testFoodtruckList = async () => {
    const apiName = "foodtruckList";
    setLoadingState(apiName, true);
    try {
      const filter = "분식"; // 테스트용 필터
      const response = await axios.get(`${baseURL}/map/ft/${encodeURIComponent(filter)}`, { withCredentials: true });
      console.log("[foodtruckList] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[foodtruckList] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // =================================
  // 7. 찜하기 관련 API (실제 코드 기반)
  // =================================

  // 7.1 찜하기 추가 API (MapPage, MyLikeCP에서 발견)
  const testLikeAdd = async () => {
    const apiName = "likeAdd";
    setLoadingState(apiName, true);
    try {
      const response = await axios.post(
        `${baseURL}/map/ft/like`,
        {
          ftId: "test-foodtruck-id",
        },
        { withCredentials: true }
      );
      console.log("[likeAdd] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[likeAdd] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 7.2 찜하기 삭제 API (MapPage, MyLikeCP에서 발견)
  const testLikeDelete = async () => {
    const apiName = "likeDelete";
    setLoadingState(apiName, true);
    try {
      const ftId = "test-foodtruck-id";
      const response = await axios.delete(`${baseURL}/map/ft/like/${ftId}`, { withCredentials: true });
      console.log("[likeDelete] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[likeDelete] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 7.3 찜 목록 조회 API (MyLikeCP에서 발견)
  const testLikeList = async () => {
    const apiName = "likeList";
    setLoadingState(apiName, true);
    try {
      const response = await axios.get(`${baseURL}/ft/like`, { withCredentials: true });
      console.log("[likeList] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[likeList] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // =================================
  // 8. SMS 알림 관련 API (실제 코드 기반)
  // =================================

  // 8.1 SMS 알림 추가 API (MapPage, MyLikeCP에서 발견)
  const testSmsAdd = async () => {
    const apiName = "smsAdd";
    setLoadingState(apiName, true);
    try {
      const response = await axios.post(
        `${baseURL}/map/ft/sms`,
        {
          ftId: "test-foodtruck-id",
          day: "월",
        },
        { withCredentials: true }
      );
      console.log("[smsAdd] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[smsAdd] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 8.2 SMS 알림 삭제 API (MapPage, MyLikeCP에서 발견)
  const testSmsDelete = async () => {
    const apiName = "smsDelete";
    setLoadingState(apiName, true);
    try {
      const ftId = "test-foodtruck-id";
      const day = "월";
      const response = await axios.delete(`${baseURL}/map/ft/sms/${ftId}/${day}`, { withCredentials: true });
      console.log("[smsDelete] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[smsDelete] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // =================================
  // 9. 리뷰 관련 API (실제 코드 기반)
  // =================================

  // 9.1 리뷰 작성 API (ReviewCP, PcReviewCP에서 발견)
  const testReviewCreate = async () => {
    const apiName = "reviewCreate";
    setLoadingState(apiName, true);
    try {
      const response = await axios.post(
        `${baseURL}/review`,
        {
          content: "맛있었습니다!",
          rating: 5,
          ftId: "test-foodtruck-id",
        },
        { withCredentials: true }
      );
      console.log("[reviewCreate] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[reviewCreate] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 9.2 리뷰 목록 조회 API (MyReviewCP에서 발견)
  const testReviewList = async () => {
    const apiName = "reviewList";
    setLoadingState(apiName, true);
    try {
      const response = await axios.get(`${baseURL}/user/review`, { withCredentials: true });
      console.log("[reviewList] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[reviewList] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 9.3 리뷰 수정 API (MyReviewCP에서 발견)
  const testReviewUpdate = async () => {
    const apiName = "reviewUpdate";
    setLoadingState(apiName, true);
    try {
      const response = await axios.put(
        `${baseURL}/review`,
        {
          id: "test-review-id",
          content: "수정된 리뷰 내용입니다.",
          rating: 4,
        },
        { withCredentials: true }
      );
      console.log("[reviewUpdate] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[reviewUpdate] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 9.4 리뷰 삭제 API (MyReviewCP에서 발견)
  const testReviewDelete = async () => {
    const apiName = "reviewDelete";
    setLoadingState(apiName, true);
    try {
      const reviewId = "test-review-id";
      const response = await axios.delete(`${baseURL}/review/${reviewId}`, { withCredentials: true });
      console.log("[reviewDelete] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[reviewDelete] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // =================================
  // 10. 기타 API (실제 코드 기반)
  // =================================

  // 10.1 FAQ 문의 API (FaqPage에서 발견)
  const testFaqCreate = async () => {
    const apiName = "faqCreate";
    setLoadingState(apiName, true);
    try {
      const response = await axios.post(
        `${baseURL}/faq`,
        {
          askCategory: "기타",
          askTitle: "테스트 문의",
          askContent: "테스트 문의 내용입니다.",
          askContact: "test@example.com",
        },
        { withCredentials: true }
      );
      console.log("[faqCreate] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[faqCreate] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 결과 표시 컴포넌트
  const ResultDisplay = ({ result }) => {
    if (!result) return null;

    return (
      <div
        style={{
          marginTop: "10px",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          backgroundColor: result.success ? "#f0f8ff" : "#ffe4e1",
        }}>
        <strong>결과:</strong>
        <pre style={{ fontSize: "12px", whiteSpace: "pre-wrap" }}>{JSON.stringify(result, null, 2)}</pre>
      </div>
    );
  };

  // 버튼 스타일
  const buttonStyle = {
    padding: "8px 16px",
    margin: "5px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#6c757d",
    cursor: "not-allowed",
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>API 테스트 페이지 (실제 소스코드 기반)</h1>
      <p>Base URL: {baseURL}</p>
      <div style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
        <strong>📝 실제 src/ 폴더에서 발견된 API들만 포함</strong>
        <br />총 {Object.keys(results).length > 0 ? Object.keys(results).length : "23"}개의 실제 사용 중인 API
      </div>

      <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#fff3cd", borderRadius: "4px", border: "1px solid #ffeaa7" }}>
        <h3 style={{ color: "#856404", margin: "0 0 10px 0" }}>🔧 Spring Security 호환성 수정</h3>
        <p style={{ margin: "0", color: "#856404" }}>
          <strong>로그인, 회원가입, SMS 인증</strong> API들은 Spring Security의 기본 설정에 맞춰
          <code style={{ backgroundColor: "#f8f9fa", padding: "2px 4px", borderRadius: "3px" }}>application/x-www-form-urlencoded</code>
          형식으로 요청을 보내도록 수정되었습니다.
        </p>
      </div>

      {/* 1. 사용자 인증 관련 API */}
      <section style={{ marginBottom: "30px" }}>
        <h2>🔐 1. 사용자 인증 관련 API</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3>1.1 로그인 API</h3>
          <p>
            <strong>POST /login</strong> (LoginPage.jsx에서 발견)
            <br />
            <span style={{ fontSize: "12px", color: "#6c757d" }}>📋 form-urlencoded: username, password</span>
          </p>
          <button style={loading.login ? disabledButtonStyle : buttonStyle} onClick={testLogin} disabled={loading.login}>
            {loading.login ? "로딩중..." : "로그인 테스트"}
          </button>
          <ResultDisplay result={results.login} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>1.2 로그인 상태 확인 API</h3>
          <p>
            <strong>GET /login/check</strong> (useLoginCheck.js, privateRoute.jsx에서 발견)
          </p>
          <button style={loading.loginCheck ? disabledButtonStyle : buttonStyle} onClick={testLoginCheck} disabled={loading.loginCheck}>
            {loading.loginCheck ? "로딩중..." : "로그인 상태 확인 테스트"}
          </button>
          <ResultDisplay result={results.loginCheck} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>1.3 로그아웃 API</h3>
          <p>
            <strong>POST /logout</strong> (MyPage.jsx에서 발견)
          </p>
          <button style={loading.logout ? disabledButtonStyle : buttonStyle} onClick={testLogout} disabled={loading.logout}>
            {loading.logout ? "로딩중..." : "로그아웃 테스트"}
          </button>
          <ResultDisplay result={results.logout} />
        </div>
      </section>

      {/* 2. 회원가입 관련 API */}
      <section style={{ marginBottom: "30px" }}>
        <h2>👤 2. 회원가입 관련 API</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3>2.1 회원가입 API</h3>
          <p>
            <strong>POST /member</strong> (SignUpPage.jsx에서 발견)
            <br />
            <span style={{ fontSize: "12px", color: "#6c757d" }}>📋 form-urlencoded: username, password, nickname, email, role, phone</span>
          </p>
          <button style={loading.signup ? disabledButtonStyle : buttonStyle} onClick={testSignup} disabled={loading.signup}>
            {loading.signup ? "로딩중..." : "회원가입 테스트"}
          </button>
          <ResultDisplay result={results.signup} />
        </div>
      </section>

      {/* 3. SMS 인증 관련 API */}
      <section style={{ marginBottom: "30px" }}>
        <h2>📱 3. SMS 인증 관련 API</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3>3.1 SMS 발송 API</h3>
          <p>
            <strong>POST /api/sms/send</strong> (SignUpPage.jsx, MyPageInfoCP.jsx에서 발견)
            <br />
            <span style={{ fontSize: "12px", color: "#6c757d" }}>📋 form-urlencoded: phone</span>
          </p>
          <button style={loading.smsSend ? disabledButtonStyle : buttonStyle} onClick={testSmsSend} disabled={loading.smsSend}>
            {loading.smsSend ? "로딩중..." : "SMS 발송 테스트"}
          </button>
          <ResultDisplay result={results.smsSend} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>3.2 SMS 인증 확인 API (회원가입)</h3>
          <p>
            <strong>POST /api/sms/verify</strong> (SignUpPage.jsx에서 발견)
            <br />
            <span style={{ fontSize: "12px", color: "#6c757d" }}>📋 form-urlencoded: phone, code</span>
          </p>
          <button style={loading.smsVerifySignup ? disabledButtonStyle : buttonStyle} onClick={testSmsVerifySignup} disabled={loading.smsVerifySignup}>
            {loading.smsVerifySignup ? "로딩중..." : "SMS 인증 테스트 (회원가입)"}
          </button>
          <ResultDisplay result={results.smsVerifySignup} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>3.3 SMS 인증 확인 API (마이페이지)</h3>
          <p>
            <strong>PUT /api/sms/verify</strong> (MyPageInfoCP.jsx에서 발견)
          </p>
          <button style={loading.smsVerifyMypage ? disabledButtonStyle : buttonStyle} onClick={testSmsVerifyMypage} disabled={loading.smsVerifyMypage}>
            {loading.smsVerifyMypage ? "로딩중..." : "SMS 인증 테스트 (마이페이지)"}
          </button>
          <ResultDisplay result={results.smsVerifyMypage} />
        </div>
      </section>

      {/* 4. 사용자 정보 관리 API */}
      <section style={{ marginBottom: "30px" }}>
        <h2>👨‍💼 4. 사용자 정보 관리 API</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3>4.1 사용자 정보 조회 API</h3>
          <p>
            <strong>GET /user/info</strong> (MyPage.jsx에서 발견)
          </p>
          <button style={loading.userInfo ? disabledButtonStyle : buttonStyle} onClick={testUserInfo} disabled={loading.userInfo}>
            {loading.userInfo ? "로딩중..." : "사용자 정보 조회 테스트"}
          </button>
          <ResultDisplay result={results.userInfo} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>4.2 비밀번호 변경 API</h3>
          <p>
            <strong>PUT /user/password</strong> (MyPageInfoCP.jsx에서 발견)
          </p>
          <button style={loading.passwordChange ? disabledButtonStyle : buttonStyle} onClick={testPasswordChange} disabled={loading.passwordChange}>
            {loading.passwordChange ? "로딩중..." : "비밀번호 변경 테스트"}
          </button>
          <ResultDisplay result={results.passwordChange} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>4.3 닉네임 변경 API</h3>
          <p>
            <strong>PUT /user/nickname</strong> (MyPageInfoCP.jsx에서 발견)
          </p>
          <button style={loading.nicknameChange ? disabledButtonStyle : buttonStyle} onClick={testNicknameChange} disabled={loading.nicknameChange}>
            {loading.nicknameChange ? "로딩중..." : "닉네임 변경 테스트"}
          </button>
          <ResultDisplay result={results.nicknameChange} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>4.4 회원탈퇴 API</h3>
          <p>
            <strong>DELETE /user/secession</strong> (MyPageInfoCP.jsx에서 발견)
          </p>
          <button style={loading.userSecession ? disabledButtonStyle : buttonStyle} onClick={testUserSecession} disabled={loading.userSecession}>
            {loading.userSecession ? "로딩중..." : "회원탈퇴 테스트"}
          </button>
          <ResultDisplay result={results.userSecession} />
        </div>
      </section>

      {/* 5. 푸드트럭 관리 API */}
      <section style={{ marginBottom: "30px" }}>
        <h2>🚚 5. 푸드트럭 관리 API</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3>5.1 푸드트럭 정보 조회 API</h3>
          <p>
            <strong>GET /user/foodtruck</strong> (MyFTCP.jsx에서 발견)
          </p>
          <button style={loading.foodtruckGet ? disabledButtonStyle : buttonStyle} onClick={testFoodtruckGet} disabled={loading.foodtruckGet}>
            {loading.foodtruckGet ? "로딩중..." : "푸드트럭 정보 조회 테스트"}
          </button>
          <ResultDisplay result={results.foodtruckGet} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>5.2 푸드트럭 정보 수정 API</h3>
          <p>
            <strong>PUT /user/foodtruck</strong> (MyFTCP.jsx에서 발견)
          </p>
          <button style={loading.foodtruckUpdate ? disabledButtonStyle : buttonStyle} onClick={testFoodtruckUpdate} disabled={loading.foodtruckUpdate}>
            {loading.foodtruckUpdate ? "로딩중..." : "푸드트럭 정보 수정 테스트"}
          </button>
          <ResultDisplay result={results.foodtruckUpdate} />
        </div>
      </section>

      {/* 6. 지도/푸드트럭 목록 API */}
      <section style={{ marginBottom: "30px" }}>
        <h2>🗺️ 6. 지도/푸드트럭 목록 API</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3>6.1 푸드트럭 목록 조회 API</h3>
          <p>
            <strong>GET /map/ft/분식</strong> (MapPage.jsx에서 발견)
          </p>
          <button style={loading.foodtruckList ? disabledButtonStyle : buttonStyle} onClick={testFoodtruckList} disabled={loading.foodtruckList}>
            {loading.foodtruckList ? "로딩중..." : "푸드트럭 목록 조회 테스트"}
          </button>
          <ResultDisplay result={results.foodtruckList} />
        </div>
      </section>

      {/* 7. 찜하기 관련 API */}
      <section style={{ marginBottom: "30px" }}>
        <h2>❤️ 7. 찜하기 관련 API</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3>7.1 찜하기 추가 API</h3>
          <p>
            <strong>POST /map/ft/like</strong> (MapPage.jsx, MyLikeCP.jsx에서 발견)
          </p>
          <button style={loading.likeAdd ? disabledButtonStyle : buttonStyle} onClick={testLikeAdd} disabled={loading.likeAdd}>
            {loading.likeAdd ? "로딩중..." : "찜하기 추가 테스트"}
          </button>
          <ResultDisplay result={results.likeAdd} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>7.2 찜하기 삭제 API</h3>
          <p>
            <strong>DELETE /map/ft/like/test-foodtruck-id</strong> (MapPage.jsx, MyLikeCP.jsx에서 발견)
          </p>
          <button style={loading.likeDelete ? disabledButtonStyle : buttonStyle} onClick={testLikeDelete} disabled={loading.likeDelete}>
            {loading.likeDelete ? "로딩중..." : "찜하기 삭제 테스트"}
          </button>
          <ResultDisplay result={results.likeDelete} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>7.3 찜 목록 조회 API</h3>
          <p>
            <strong>GET /ft/like</strong> (MyLikeCP.jsx에서 발견)
          </p>
          <button style={loading.likeList ? disabledButtonStyle : buttonStyle} onClick={testLikeList} disabled={loading.likeList}>
            {loading.likeList ? "로딩중..." : "찜 목록 조회 테스트"}
          </button>
          <ResultDisplay result={results.likeList} />
        </div>
      </section>

      {/* 8. SMS 알림 관련 API */}
      <section style={{ marginBottom: "30px" }}>
        <h2>🔔 8. SMS 알림 관련 API</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3>8.1 SMS 알림 추가 API</h3>
          <p>
            <strong>POST /map/ft/sms</strong> (MapPage.jsx, MyLikeCP.jsx에서 발견)
          </p>
          <button style={loading.smsAdd ? disabledButtonStyle : buttonStyle} onClick={testSmsAdd} disabled={loading.smsAdd}>
            {loading.smsAdd ? "로딩중..." : "SMS 알림 추가 테스트"}
          </button>
          <ResultDisplay result={results.smsAdd} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>8.2 SMS 알림 삭제 API</h3>
          <p>
            <strong>DELETE /map/ft/sms/test-foodtruck-id/월</strong> (MapPage.jsx, MyLikeCP.jsx에서 발견)
          </p>
          <button style={loading.smsDelete ? disabledButtonStyle : buttonStyle} onClick={testSmsDelete} disabled={loading.smsDelete}>
            {loading.smsDelete ? "로딩중..." : "SMS 알림 삭제 테스트"}
          </button>
          <ResultDisplay result={results.smsDelete} />
        </div>
      </section>

      {/* 9. 리뷰 관련 API */}
      <section style={{ marginBottom: "30px" }}>
        <h2>⭐ 9. 리뷰 관련 API</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3>9.1 리뷰 작성 API</h3>
          <p>
            <strong>POST /review</strong> (ReviewCP.jsx, PcReviewCP.jsx에서 발견)
          </p>
          <button style={loading.reviewCreate ? disabledButtonStyle : buttonStyle} onClick={testReviewCreate} disabled={loading.reviewCreate}>
            {loading.reviewCreate ? "로딩중..." : "리뷰 작성 테스트"}
          </button>
          <ResultDisplay result={results.reviewCreate} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>9.2 리뷰 목록 조회 API</h3>
          <p>
            <strong>GET /user/review</strong> (MyReviewCP.jsx에서 발견)
          </p>
          <button style={loading.reviewList ? disabledButtonStyle : buttonStyle} onClick={testReviewList} disabled={loading.reviewList}>
            {loading.reviewList ? "로딩중..." : "리뷰 목록 조회 테스트"}
          </button>
          <ResultDisplay result={results.reviewList} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>9.3 리뷰 수정 API</h3>
          <p>
            <strong>PUT /review</strong> (MyReviewCP.jsx에서 발견)
          </p>
          <button style={loading.reviewUpdate ? disabledButtonStyle : buttonStyle} onClick={testReviewUpdate} disabled={loading.reviewUpdate}>
            {loading.reviewUpdate ? "로딩중..." : "리뷰 수정 테스트"}
          </button>
          <ResultDisplay result={results.reviewUpdate} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>9.4 리뷰 삭제 API</h3>
          <p>
            <strong>DELETE /review/test-review-id</strong> (MyReviewCP.jsx에서 발견)
          </p>
          <button style={loading.reviewDelete ? disabledButtonStyle : buttonStyle} onClick={testReviewDelete} disabled={loading.reviewDelete}>
            {loading.reviewDelete ? "로딩중..." : "리뷰 삭제 테스트"}
          </button>
          <ResultDisplay result={results.reviewDelete} />
        </div>
      </section>

      {/* 10. 기타 API */}
      <section style={{ marginBottom: "30px" }}>
        <h2>❓ 10. 기타 API</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3>10.1 FAQ 문의 API</h3>
          <p>
            <strong>POST /faq</strong> (FaqPage.jsx에서 발견)
          </p>
          <button style={loading.faqCreate ? disabledButtonStyle : buttonStyle} onClick={testFaqCreate} disabled={loading.faqCreate}>
            {loading.faqCreate ? "로딩중..." : "FAQ 문의 테스트"}
          </button>
          <ResultDisplay result={results.faqCreate} />
        </div>
      </section>

      {/* 전체 결과 요약 */}
      <section style={{ marginTop: "40px", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        <h2>📊 테스트 결과 요약</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
          {Object.entries(results).map(([apiName, result]) => (
            <div
              key={apiName}
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: result.success ? "#d4edda" : "#f8d7da",
                color: result.success ? "#155724" : "#721c24",
              }}>
              <strong>{apiName}</strong>: {result.success ? "성공" : "실패"}
            </div>
          ))}
        </div>
        {Object.keys(results).length === 0 && (
          <div style={{ textAlign: "center", color: "#6c757d", fontStyle: "italic" }}>아직 테스트된 API가 없습니다. 위의 버튼들을 눌러 테스트해보세요!</div>
        )}
      </section>
    </div>
  );
};

export default ApiTestPage;
