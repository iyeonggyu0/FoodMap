import React, { useState } from "react";
import axios from "axios";
import { useInput } from "./hooks/useInput";

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
  // 1. 사용자 관리 API (UserController)
  // =================================

  // 1.1 전체 사용자 조회 API
  const testUsersGet = async () => {
    const apiName = "usersGet";
    setLoadingState(apiName, true);
    try {
      const response = await axios.get(`${baseURL}/api/users`, { withCredentials: true });
      console.log("[usersGet] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[usersGet] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 1.2 사용자 생성 API
  const testUserCreate = async () => {
    const apiName = "userCreate";
    setLoadingState(apiName, true);
    try {
      const params = new URLSearchParams();
      params.append("username", "newuser456");
      params.append("password", "password123");
      params.append("email", "new@example.com");
      params.append("nickname", "새사용자");
      params.append("phone", "010-1111-2222");
      params.append("role", "USER");
      const response = await axios.post(`${baseURL}/api/users`, params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      });
      console.log("[userCreate] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[userCreate] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // =================================
  // 2. 로그인/회원가입 관련 API (MemberController)
  // =================================

  // 2.1 로그인 API
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

  // 2.2 로그인 상태 확인 API
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

  // 2.3 로그아웃 API
  const testLogout = async () => {
    const apiName = "logout";
    setLoadingState(apiName, true);
    try {
      const response = await axios.post(`${baseURL}/logout`, null, { withCredentials: true });
      console.log("[logout] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[logout] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 2.4 회원가입 API (JSON)
  const testSignupJson = async () => {
    const apiName = "signupJson";
    setLoadingState(apiName, true);
    try {
      const params = new URLSearchParams();
      params.append("username", "testuser789");
      params.append("password", "password123");
      params.append("nickname", "테스트유저");
      params.append("email", "test789@example.com");
      params.append("phone", "010-1234-5678");
      params.append("role", "user");
      params.append("smsCode", "123456");
      const response = await axios.post(`${baseURL}/member/json`, params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      });
      console.log("[signupJson] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[signupJson] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 2.5 비밀번호 변경 API (쿼리 파라미터)
  const testPasswordChange = async () => {
    const apiName = "passwordChange";
    setLoadingState(apiName, true);
    try {
      const response = await axios.put(`${baseURL}/user/password?newPassword=newpassword123`, null, { withCredentials: true });
      console.log("[passwordChange] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[passwordChange] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 2.6 닉네임 변경 API (쿼리 파라미터)
  const testNicknameChange = async () => {
    const apiName = "nicknameChange";
    setLoadingState(apiName, true);
    try {
      const response = await axios.put(`${baseURL}/user/nickname?newNickname=새닉네임`, null, { withCredentials: true });
      console.log("[nicknameChange] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[nicknameChange] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 2.7 회원탈퇴 API
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
  // 3. 인증번호 관련 API (SignSmsController)
  // =================================

  // 3.1 인증번호 발송 API
  const testSmsSend = async () => {
    const apiName = "smsSend";
    setLoadingState(apiName, true);
    try {
      const params = new URLSearchParams();
      params.append("phone", "01012345678");
      const response = await axios.post(`${baseURL}/certification/send`, params, {
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

  const [testCertification1, onChangeCertification1, setTestCertification1] = useInput("");

  // 3.2 인증번호 확인 API - 회원가입용
  const testSmsVerifySignup = async () => {
    const apiName = "smsVerifySignup";
    setLoadingState(apiName, true);
    try {
      const params = new URLSearchParams();
      params.append("phone", "01012345678");
      params.append("certification", testCertification1);
      const response = await axios.post(`${baseURL}/certification/check`, params, {
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

  const [testCertification2, onChangeCertification2, setTestCertification2] = useInput("");

  // 3.3 인증번호 확인 API - 마이페이지용
  const testSmsVerifyMypage = async () => {
    const apiName = "smsVerifyMypage";
    setLoadingState(apiName, true);
    try {
      const params = new URLSearchParams();
      params.append("phone", "01012345678");
      params.append("certification", testCertification2);
      const response = await axios.put(`${baseURL}/certification/check`, params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      });
      console.log("[smsVerifyMypage] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[smsVerifyMypage] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // =================================
  // 4. 지도/푸드트럭 관련 API (MapController)
  // =================================

  // 4.1 푸드트럭 찜 토글 API (쿼리 파라미터)
  const testLikeToggle = async () => {
    const apiName = "likeToggle";
    setLoadingState(apiName, true);
    try {
      const foodtruckId = "test-foodtruck-id";
      const response = await axios.post(`${baseURL}/map/ft/like?foodtruckId=${foodtruckId}`, null, { withCredentials: true });
      console.log("[likeToggle] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[likeToggle] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 4.2 찜 목록 조회 API
  const testLikeList = async () => {
    const apiName = "likeList";
    setLoadingState(apiName, true);
    try {
      const response = await axios.get(`${baseURL}/map/ft/like`, { withCredentials: true });
      console.log("[likeList] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[likeList] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 4.3 SMS 토글 API (쿼리 파라미터)
  const testSmsToggle = async () => {
    const apiName = "smsToggle";
    setLoadingState(apiName, true);
    try {
      const storeId = "test-store-id";
      const day = "월";
      const response = await axios.post(`${baseURL}/map/ft/sms?storeId=${storeId}&day=${day}`, null, { withCredentials: true });
      console.log("[smsToggle] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[smsToggle] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 4.4 SMS 삭제 API
  const testSmsDelete = async () => {
    const apiName = "smsDelete";
    setLoadingState(apiName, true);
    try {
      const foodtruckId = "test-foodtruck-id";
      const day = "월";
      const response = await axios.delete(`${baseURL}/map/ft/sms/${foodtruckId}/${day}`, { withCredentials: true });
      console.log("[smsDelete] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[smsDelete] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // =================================
  // 5. 푸드트럭 관리 API (RegisterController)
  // =================================

  // 5.1 푸드트럭 등록 API (JSON)
  const testFoodtruckCreate = async () => {
    const apiName = "foodtruckCreate";
    setLoadingState(apiName, true);
    try {
      const params = new URLSearchParams();
      params.append("name", "맛있는 푸드트럭");
      params.append("category", "한식");
      params.append("menu", JSON.stringify([{ name: "김밥", price: 3000, info: "맛있어요", num: 1 }]));
      params.append(
        "schedule",
        JSON.stringify([
          {
            dayOfWeek: "월",
            isOpen: true,
            openTime: "10:00",
            closeTime: "18:00",
            location: "서울",
          },
        ])
      );
      const response = await axios.post(`${baseURL}/user/foodtruck`, params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      });
      console.log("[foodtruckCreate] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[foodtruckCreate] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 5.2 푸드트럭 상세 조회 API
  const testFoodtruckGetApi = async () => {
    const apiName = "foodtruckGetApi";
    setLoadingState(apiName, true);
    try {
      const id = "1"; // 테스트용 ID
      const response = await axios.get(`${baseURL}/user/foodtruck/${id}/api`, { withCredentials: true });
      console.log("[foodtruckGetApi] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[foodtruckGetApi] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 5.3 푸드트럭 수정 API
  const testFoodtruckUpdate = async () => {
    const apiName = "foodtruckUpdate";
    setLoadingState(apiName, true);
    try {
      const id = "1"; // 테스트용 ID
      const params = new URLSearchParams();
      params.append("name", "수정된 푸드트럭");
      params.append("category", "분식");
      params.append("menu", JSON.stringify([{ name: "떡볶이", price: 4000, info: "매콤해요", num: 1 }]));
      params.append(
        "schedule",
        JSON.stringify([
          {
            dayOfWeek: "화",
            isOpen: true,
            openTime: "11:00",
            closeTime: "19:00",
            location: "부산",
          },
        ])
      );
      const response = await axios.put(`${baseURL}/user/foodtruck/${id}`, params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      });
      console.log("[foodtruckUpdate] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[foodtruckUpdate] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 5.4 푸드트럭 삭제 API
  const testFoodtruckDelete = async () => {
    const apiName = "foodtruckDelete";
    setLoadingState(apiName, true);
    try {
      const id = "1"; // 테스트용 ID
      const response = await axios.delete(`${baseURL}/user/foodtruck/${id}`, { withCredentials: true });
      console.log("[foodtruckDelete] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[foodtruckDelete] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // =================================
  // 6. 리뷰 관련 API (ReviewPostController)
  // =================================

  // 6.1 리뷰 목록 조회 API
  const testReviewListApi = async () => {
    const apiName = "reviewListApi";
    setLoadingState(apiName, true);
    try {
      const response = await axios.get(`${baseURL}/api/review`, { withCredentials: true });
      console.log("[reviewListApi] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[reviewListApi] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 6.2 리뷰 단건 조회 API
  const testReviewGetApi = async () => {
    const apiName = "reviewGetApi";
    setLoadingState(apiName, true);
    try {
      const id = "1"; // 테스트용 리뷰 ID
      const response = await axios.get(`${baseURL}/api/review/${id}`, { withCredentials: true });
      console.log("[reviewGetApi] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[reviewGetApi] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 6.3 리뷰 생성 API
  const testReviewCreateApi = async () => {
    const apiName = "reviewCreateApi";
    setLoadingState(apiName, true);
    try {
      const params = new URLSearchParams();
      params.append("truckId", "2");
      params.append("nickName", "종휘");
      params.append("content", "정말 맛있어요!");
      params.append("rating", "4.5");
      const response = await axios.post(`${baseURL}/api/review`, params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      });
      console.log("[reviewCreateApi] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[reviewCreateApi] 실패", error);
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 6.4 리뷰 삭제 API
  const testReviewDeleteApi = async () => {
    const apiName = "reviewDeleteApi";
    setLoadingState(apiName, true);
    try {
      const id = "5"; // 테스트용 리뷰 ID
      const response = await axios.delete(`${baseURL}/api/review/${id}`, { withCredentials: true });
      console.log("[reviewDeleteApi] 성공", response);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      console.log("[reviewDeleteApi] 실패", error);
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
      <h1>API 테스트 페이지 (노션 최신 버전 기준)</h1>
      <p>Base URL: {baseURL}</p>
      <div style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
        <strong>📝 노션 API 명세 기준으로 전면 수정</strong>
        <br />총 {Object.keys(results).length > 0 ? Object.keys(results).length : "20+"}개의 최신 API 포함
      </div>

      {/* 1. 사용자 관리 API */}
      <section style={{ marginBottom: "30px" }}>
        <h2>👥 1. 사용자 관리 API (UserController)</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3>1.1 전체 사용자 조회 API</h3>
          <p>
            <strong>GET /api/users</strong>
          </p>
          <button style={loading.usersGet ? disabledButtonStyle : buttonStyle} onClick={testUsersGet} disabled={loading.usersGet}>
            {loading.usersGet ? "로딩중..." : "사용자 조회 테스트"}
          </button>
          <ResultDisplay result={results.usersGet} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>1.2 사용자 생성 API</h3>
          <p>
            <strong>POST /api/users</strong>
          </p>
          <button style={loading.userCreate ? disabledButtonStyle : buttonStyle} onClick={testUserCreate} disabled={loading.userCreate}>
            {loading.userCreate ? "로딩중..." : "사용자 생성 테스트"}
          </button>
          <ResultDisplay result={results.userCreate} />
        </div>
      </section>

      {/* 2. 로그인/회원가입 관련 API */}
      <section style={{ marginBottom: "30px" }}>
        <h2>🔐 2. 로그인/회원가입 관련 API (MemberController)</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3>2.1 로그인 API</h3>
          <p>
            <strong>POST /login</strong>
            <br />
            <span style={{ fontSize: "12px", color: "#6c757d" }}>📋 JSON: username, password</span>
          </p>
          <button style={loading.login ? disabledButtonStyle : buttonStyle} onClick={testLogin} disabled={loading.login}>
            {loading.login ? "로딩중..." : "로그인 테스트"}
          </button>
          <ResultDisplay result={results.login} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>2.2 로그인 상태 확인 API</h3>
          <p>
            <strong>GET /login/check</strong>
          </p>
          <button style={loading.loginCheck ? disabledButtonStyle : buttonStyle} onClick={testLoginCheck} disabled={loading.loginCheck}>
            {loading.loginCheck ? "로딩중..." : "로그인 상태 확인 테스트"}
          </button>
          <ResultDisplay result={results.loginCheck} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>2.3 로그아웃 API</h3>
          <p>
            <strong>POST /logout</strong>
          </p>
          <button style={loading.logout ? disabledButtonStyle : buttonStyle} onClick={testLogout} disabled={loading.logout}>
            {loading.logout ? "로딩중..." : "로그아웃 테스트"}
          </button>
          <ResultDisplay result={results.logout} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>2.4 회원가입 API (JSON)</h3>
          <p>
            <strong>POST /member/json</strong>
            <br />
            <span style={{ fontSize: "12px", color: "#6c757d" }}>📋 JSON: username, password, nickname, email, phone, role, smsCode</span>
          </p>
          <button style={loading.signupJson ? disabledButtonStyle : buttonStyle} onClick={testSignupJson} disabled={loading.signupJson}>
            {loading.signupJson ? "로딩중..." : "회원가입 테스트 (JSON)"}
          </button>
          <ResultDisplay result={results.signupJson} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>2.5 비밀번호 변경 API</h3>
          <p>
            <strong>PUT /user/password?newPassword={"{newPassword}"}</strong>
          </p>
          <button style={loading.passwordChange ? disabledButtonStyle : buttonStyle} onClick={testPasswordChange} disabled={loading.passwordChange}>
            {loading.passwordChange ? "로딩중..." : "비밀번호 변경 테스트"}
          </button>
          <ResultDisplay result={results.passwordChange} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>2.6 닉네임 변경 API</h3>
          <p>
            <strong>PUT /user/nickname?newNickname={"{newNickname}"}</strong>
          </p>
          <button style={loading.nicknameChange ? disabledButtonStyle : buttonStyle} onClick={testNicknameChange} disabled={loading.nicknameChange}>
            {loading.nicknameChange ? "로딩중..." : "닉네임 변경 테스트"}
          </button>
          <ResultDisplay result={results.nicknameChange} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>2.7 회원탈퇴 API</h3>
          <p>
            <strong>DELETE /user/secession</strong>
          </p>
          <button style={loading.userSecession ? disabledButtonStyle : buttonStyle} onClick={testUserSecession} disabled={loading.userSecession}>
            {loading.userSecession ? "로딩중..." : "회원탈퇴 테스트"}
          </button>
          <ResultDisplay result={results.userSecession} />
        </div>
      </section>

      {/* 3. 인증번호 관련 API */}
      <section style={{ marginBottom: "30px" }}>
        <h2>� 3. 인증번호 관련 API (SignSmsController)</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3>3.1 인증번호 발송 API</h3>
          <p>
            <strong>POST /certification/send</strong>
            <br />
            <span style={{ fontSize: "12px", color: "#6c757d" }}>📋 JSON: phone</span>
          </p>
          <button style={loading.smsSend ? disabledButtonStyle : buttonStyle} onClick={testSmsSend} disabled={loading.smsSend}>
            {loading.smsSend ? "로딩중..." : "SMS 발송 테스트"}
          </button>
          <ResultDisplay result={results.smsSend} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>3.2 인증번호 확인 API (회원가입)</h3>
          <p>
            <strong>POST /certification/check</strong>
            <br />
            <span style={{ fontSize: "12px", color: "#6c757d" }}>📋 JSON: phone, certification</span>
          </p>
          <input
            type="text"
            value={testCertification1}
            onChange={onChangeCertification1}
            placeholder="인증 코드 입력"
            style={{ marginBottom: "10px", padding: "5px", width: "200px" }}
          />
          <br />
          <button style={loading.smsVerifySignup ? disabledButtonStyle : buttonStyle} onClick={testSmsVerifySignup} disabled={loading.smsVerifySignup}>
            {loading.smsVerifySignup ? "로딩중..." : "SMS 인증 테스트 (회원가입)"}
          </button>
          <ResultDisplay result={results.smsVerifySignup} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>3.3 인증번호 확인 API (마이페이지)</h3>
          <p>
            <strong>PUT /certification/check</strong>
          </p>
          <input
            type="text"
            value={testCertification2}
            onChange={onChangeCertification2}
            placeholder="인증 코드 입력"
            style={{ marginBottom: "10px", padding: "5px", width: "200px" }}
          />
          <br />
          <button style={loading.smsVerifyMypage ? disabledButtonStyle : buttonStyle} onClick={testSmsVerifyMypage} disabled={loading.smsVerifyMypage}>
            {loading.smsVerifyMypage ? "로딩중..." : "SMS 인증 테스트 (마이페이지)"}
          </button>
          <ResultDisplay result={results.smsVerifyMypage} />
        </div>
      </section>

      {/* 4. 지도/푸드트럭 관련 API */}
      <section style={{ marginBottom: "30px" }}>
        <h2>�️ 4. 지도/푸드트럭 관련 API (MapController)</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3>4.1 푸드트럭 찜 토글 API</h3>
          <p>
            <strong>POST /map/ft/like?foodtruckId={"{id}"}</strong>
          </p>
          <button style={loading.likeToggle ? disabledButtonStyle : buttonStyle} onClick={testLikeToggle} disabled={loading.likeToggle}>
            {loading.likeToggle ? "로딩중..." : "찜 토글 테스트"}
          </button>
          <ResultDisplay result={results.likeToggle} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>4.2 찜 목록 조회 API</h3>
          <p>
            <strong>GET /map/ft/like</strong>
          </p>
          <button style={loading.likeList ? disabledButtonStyle : buttonStyle} onClick={testLikeList} disabled={loading.likeList}>
            {loading.likeList ? "로딩중..." : "찜 목록 조회 테스트"}
          </button>
          <ResultDisplay result={results.likeList} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>4.3 SMS 토글 API</h3>
          <p>
            <strong>
              POST /map/ft/sms?storeId={"{id}"}&day={"{day}"}
            </strong>
          </p>
          <button style={loading.smsToggle ? disabledButtonStyle : buttonStyle} onClick={testSmsToggle} disabled={loading.smsToggle}>
            {loading.smsToggle ? "로딩중..." : "SMS 토글 테스트"}
          </button>
          <ResultDisplay result={results.smsToggle} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>4.4 SMS 삭제 API</h3>
          <p>
            <strong>
              DELETE /map/ft/sms/{"{foodtruckId}"}/{"{day}"}
            </strong>
          </p>
          <button style={loading.smsDelete ? disabledButtonStyle : buttonStyle} onClick={testSmsDelete} disabled={loading.smsDelete}>
            {loading.smsDelete ? "로딩중..." : "SMS 삭제 테스트"}
          </button>
          <ResultDisplay result={results.smsDelete} />
        </div>
      </section>

      {/* 5. 푸드트럭 관리 API */}
      <section style={{ marginBottom: "30px" }}>
        <h2>🚚 5. 푸드트럭 관리 API (RegisterController)</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3>5.1 푸드트럭 등록 API</h3>
          <p>
            <strong>POST /user/foodtruck</strong>
          </p>
          <button style={loading.foodtruckCreate ? disabledButtonStyle : buttonStyle} onClick={testFoodtruckCreate} disabled={loading.foodtruckCreate}>
            {loading.foodtruckCreate ? "로딩중..." : "푸드트럭 등록 테스트"}
          </button>
          <ResultDisplay result={results.foodtruckCreate} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>5.2 푸드트럭 상세 조회 API</h3>
          <p>
            <strong>GET /user/foodtruck/{"{id}"}/api</strong>
          </p>
          <button style={loading.foodtruckGetApi ? disabledButtonStyle : buttonStyle} onClick={testFoodtruckGetApi} disabled={loading.foodtruckGetApi}>
            {loading.foodtruckGetApi ? "로딩중..." : "푸드트럭 상세 조회 테스트"}
          </button>
          <ResultDisplay result={results.foodtruckGetApi} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>5.3 푸드트럭 수정 API</h3>
          <p>
            <strong>PUT /user/foodtruck/{"{id}"}</strong>
          </p>
          <button style={loading.foodtruckUpdate ? disabledButtonStyle : buttonStyle} onClick={testFoodtruckUpdate} disabled={loading.foodtruckUpdate}>
            {loading.foodtruckUpdate ? "로딩중..." : "푸드트럭 수정 테스트"}
          </button>
          <ResultDisplay result={results.foodtruckUpdate} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>5.4 푸드트럭 삭제 API</h3>
          <p>
            <strong>DELETE /user/foodtruck/{"{id}"}</strong>
          </p>
          <button style={loading.foodtruckDelete ? disabledButtonStyle : buttonStyle} onClick={testFoodtruckDelete} disabled={loading.foodtruckDelete}>
            {loading.foodtruckDelete ? "로딩중..." : "푸드트럭 삭제 테스트"}
          </button>
          <ResultDisplay result={results.foodtruckDelete} />
        </div>
      </section>

      {/* 6. 리뷰 관련 API */}
      <section style={{ marginBottom: "30px" }}>
        <h2>⭐ 6. 리뷰 관련 API (ReviewPostController)</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3>6.1 리뷰 목록 조회 API</h3>
          <p>
            <strong>GET /api/review</strong>
          </p>
          <button style={loading.reviewListApi ? disabledButtonStyle : buttonStyle} onClick={testReviewListApi} disabled={loading.reviewListApi}>
            {loading.reviewListApi ? "로딩중..." : "리뷰 목록 조회 테스트"}
          </button>
          <ResultDisplay result={results.reviewListApi} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>6.2 리뷰 단건 조회 API</h3>
          <p>
            <strong>GET /api/review/{"{id}"}</strong>
          </p>
          <button style={loading.reviewGetApi ? disabledButtonStyle : buttonStyle} onClick={testReviewGetApi} disabled={loading.reviewGetApi}>
            {loading.reviewGetApi ? "로딩중..." : "리뷰 단건 조회 테스트"}
          </button>
          <ResultDisplay result={results.reviewGetApi} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>6.3 리뷰 생성 API</h3>
          <p>
            <strong>POST /api/review</strong>
          </p>
          <button style={loading.reviewCreateApi ? disabledButtonStyle : buttonStyle} onClick={testReviewCreateApi} disabled={loading.reviewCreateApi}>
            {loading.reviewCreateApi ? "로딩중..." : "리뷰 생성 테스트"}
          </button>
          <ResultDisplay result={results.reviewCreateApi} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>6.4 리뷰 삭제 API</h3>
          <p>
            <strong>DELETE /api/review/{"{id}"}</strong>
          </p>
          <button style={loading.reviewDeleteApi ? disabledButtonStyle : buttonStyle} onClick={testReviewDeleteApi} disabled={loading.reviewDeleteApi}>
            {loading.reviewDeleteApi ? "로딩중..." : "리뷰 삭제 테스트"}
          </button>
          <ResultDisplay result={results.reviewDeleteApi} />
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
