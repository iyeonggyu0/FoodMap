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

  // 1.1 로그인 API
  const testLogin = async () => {
    const apiName = "login";
    setLoadingState(apiName, true);
    try {
      const response = await axios.post(`${baseURL}/login`, {
        id: "testuser",
        pw: "testpassword",
      });
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 1.2 회원가입 API
  const testSignup = async () => {
    const apiName = "signup";
    setLoadingState(apiName, true);
    try {
      const response = await axios.post(`${baseURL}/signup`, {
        username: "testuser123",
        password: "testpass123",
        email: "test@example.com",
        nickname: "테스트유저",
        role: "user",
        phone: "01012345678",
      });
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 1.3 로그인 상태 확인 API
  const testLoginCheck = async () => {
    const apiName = "loginCheck";
    setLoadingState(apiName, true);
    try {
      const response = await axios.get(`${baseURL}/login/check`, { withCredentials: true });
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // =================================
  // 2. 인증번호 관련 API
  // =================================

  // 2.1 인증번호 발송 API
  const testSmsSend = async () => {
    const apiName = "smsSend";
    setLoadingState(apiName, true);
    try {
      const response = await axios.post(`${baseURL}/api/sms/send`, {
        phone: "01012345678",
      });
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 2.2 인증번호 확인 API (회원가입용)
  const testSmsVerifySignup = async () => {
    const apiName = "smsVerifySignup";
    setLoadingState(apiName, true);
    try {
      const response = await axios.post(`${baseURL}/api/sms/verify`, {
        phone: "01012345678",
        certification: "123456",
      });
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 2.3 인증번호 확인 API (마이페이지용)
  const testSmsVerifyMypage = async () => {
    const apiName = "smsVerifyMypage";
    setLoadingState(apiName, true);
    try {
      const response = await axios.put(`${baseURL}/api/sms/verify`, {
        phone: "01012345678",
        certification: "123456",
      });
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // =================================
  // 3. 사용자 정보 관리 API
  // =================================

  // 3.1 비밀번호 변경 API
  const testPasswordChange = async () => {
    const apiName = "passwordChange";
    setLoadingState(apiName, true);
    try {
      const response = await axios.put(`${baseURL}/user/password`, {
        password: "newpassword123",
      });
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 3.2 닉네임 변경 API
  const testNicknameChange = async () => {
    const apiName = "nicknameChange";
    setLoadingState(apiName, true);
    try {
      const response = await axios.put(`${baseURL}/user/nickname`, {
        nickname: "새닉네임",
      });
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 3.3 회원탈퇴 API
  const testUserSecession = async () => {
    const apiName = "userSecession";
    setLoadingState(apiName, true);
    try {
      const response = await axios.delete(`${baseURL}/user/secession`);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // =================================
  // 4. 푸드트럭 관련 API
  // =================================

  // 4.1 푸드트럭 정보 조회 API
  const testFoodtruckGet = async () => {
    const apiName = "foodtruckGet";
    setLoadingState(apiName, true);
    try {
      const response = await axios.get(`${baseURL}/user/foodtruck`);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 4.2 푸드트럭 정보 수정 API
  const testFoodtruckUpdate = async () => {
    const apiName = "foodtruckUpdate";
    setLoadingState(apiName, true);
    try {
      const response = await axios.put(`${baseURL}/user/foodtruck`, {
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
      });
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 4.3 푸드트럭 목록 조회 API
  const testFoodtruckList = async () => {
    const apiName = "foodtruckList";
    setLoadingState(apiName, true);
    try {
      const filter = "분식"; // 테스트용 필터
      const response = await axios.get(`${baseURL}/map/ft/${encodeURIComponent(filter)}`);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // =================================
  // 5. 찜하기/알림 관련 API
  // =================================

  // 5.1 찜하기 추가 API
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
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 5.2 찜하기 삭제 API
  const testLikeDelete = async () => {
    const apiName = "likeDelete";
    setLoadingState(apiName, true);
    try {
      const ftId = "test-foodtruck-id";
      const response = await axios.delete(`${baseURL}/map/ft/like/${ftId}`, { withCredentials: true });
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 5.3 SMS 알림 추가 API
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
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 5.4 SMS 알림 삭제 API
  const testSmsDelete = async () => {
    const apiName = "smsDelete";
    setLoadingState(apiName, true);
    try {
      const ftId = "test-foodtruck-id";
      const day = "월";
      const response = await axios.delete(`${baseURL}/map/ft/sms/${ftId}/${day}`, { withCredentials: true });
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 5.5 찜 목록 조회 API
  const testLikeList = async () => {
    const apiName = "likeList";
    setLoadingState(apiName, true);
    try {
      const response = await axios.get(`${baseURL}/ft/like`);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // =================================
  // 6. 리뷰 관련 API
  // =================================

  // 6.1 사용자 리뷰 목록 조회 API
  const testReviewList = async () => {
    const apiName = "reviewList";
    setLoadingState(apiName, true);
    try {
      const response = await axios.get(`${baseURL}/user/review`);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 6.2 리뷰 수정 API
  const testReviewUpdate = async () => {
    const apiName = "reviewUpdate";
    setLoadingState(apiName, true);
    try {
      const response = await axios.put(`${baseURL}/review`, {
        id: "test-review-id",
        content: "수정된 리뷰 내용입니다.",
        rating: 4,
      });
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
      saveResult(apiName, { success: false, error: error.response?.data || error.message });
    }
    setLoadingState(apiName, false);
  };

  // 6.3 리뷰 삭제 API
  const testReviewDelete = async () => {
    const apiName = "reviewDelete";
    setLoadingState(apiName, true);
    try {
      const reviewId = "test-review-id";
      const response = await axios.delete(`${baseURL}/review/${reviewId}`);
      saveResult(apiName, { success: true, data: response.data });
    } catch (error) {
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
      <h1>API 테스트 페이지</h1>
      <p>Base URL: {baseURL}</p>

      {/* 1. 사용자 인증 관련 API */}
      <section style={{ marginBottom: "30px" }}>
        <h2>1. 사용자 인증 관련 API</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3>1.1 로그인 API</h3>
          <p>POST /login</p>
          <button style={loading.login ? disabledButtonStyle : buttonStyle} onClick={testLogin} disabled={loading.login}>
            {loading.login ? "로딩중..." : "로그인 테스트"}
          </button>
          <ResultDisplay result={results.login} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>1.2 회원가입 API</h3>
          <p>POST /signup</p>
          <button style={loading.signup ? disabledButtonStyle : buttonStyle} onClick={testSignup} disabled={loading.signup}>
            {loading.signup ? "로딩중..." : "회원가입 테스트"}
          </button>
          <ResultDisplay result={results.signup} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>1.3 로그인 상태 확인 API</h3>
          <p>GET /login/check</p>
          <button style={loading.loginCheck ? disabledButtonStyle : buttonStyle} onClick={testLoginCheck} disabled={loading.loginCheck}>
            {loading.loginCheck ? "로딩중..." : "로그인 상태 확인 테스트"}
          </button>
          <ResultDisplay result={results.loginCheck} />
        </div>
      </section>

      {/* 2. 인증번호 관련 API */}
      <section style={{ marginBottom: "30px" }}>
        <h2>2. 인증번호 관련 API</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3>2.1 인증번호 발송 API</h3>
          <p>POST /api/sms/send</p>
          <button style={loading.smsSend ? disabledButtonStyle : buttonStyle} onClick={testSmsSend} disabled={loading.smsSend}>
            {loading.smsSend ? "로딩중..." : "SMS 발송 테스트"}
          </button>
          <ResultDisplay apiName="smsSend" result={results.smsSend} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>2.2 인증번호 확인 API (회원가입)</h3>
          <p>POST /api/sms/verify</p>
          <button style={loading.smsVerifySignup ? disabledButtonStyle : buttonStyle} onClick={testSmsVerifySignup} disabled={loading.smsVerifySignup}>
            {loading.smsVerifySignup ? "로딩중..." : "SMS 인증 테스트 (회원가입)"}
          </button>
          <ResultDisplay apiName="smsVerifySignup" result={results.smsVerifySignup} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>2.3 인증번호 확인 API (마이페이지)</h3>
          <p>PUT /api/sms/verify</p>
          <button style={loading.smsVerifyMypage ? disabledButtonStyle : buttonStyle} onClick={testSmsVerifyMypage} disabled={loading.smsVerifyMypage}>
            {loading.smsVerifyMypage ? "로딩중..." : "SMS 인증 테스트 (마이페이지)"}
          </button>
          <ResultDisplay apiName="smsVerifyMypage" result={results.smsVerifyMypage} />
        </div>
      </section>

      {/* 3. 사용자 정보 관리 API */}
      <section style={{ marginBottom: "30px" }}>
        <h2>3. 사용자 정보 관리 API</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3>3.1 비밀번호 변경 API</h3>
          <p>PUT /user/password</p>
          <button style={loading.passwordChange ? disabledButtonStyle : buttonStyle} onClick={testPasswordChange} disabled={loading.passwordChange}>
            {loading.passwordChange ? "로딩중..." : "비밀번호 변경 테스트"}
          </button>
          <ResultDisplay apiName="passwordChange" result={results.passwordChange} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>3.2 닉네임 변경 API</h3>
          <p>PUT /user/nickname</p>
          <button style={loading.nicknameChange ? disabledButtonStyle : buttonStyle} onClick={testNicknameChange} disabled={loading.nicknameChange}>
            {loading.nicknameChange ? "로딩중..." : "닉네임 변경 테스트"}
          </button>
          <ResultDisplay apiName="nicknameChange" result={results.nicknameChange} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>3.3 회원탈퇴 API</h3>
          <p>DELETE /user/secession</p>
          <button style={loading.userSecession ? disabledButtonStyle : buttonStyle} onClick={testUserSecession} disabled={loading.userSecession}>
            {loading.userSecession ? "로딩중..." : "회원탈퇴 테스트"}
          </button>
          <ResultDisplay apiName="userSecession" result={results.userSecession} />
        </div>
      </section>

      {/* 4. 푸드트럭 관련 API */}
      <section style={{ marginBottom: "30px" }}>
        <h2>4. 푸드트럭 관련 API</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3>4.1 푸드트럭 정보 조회 API</h3>
          <p>GET /user/foodtruck</p>
          <button style={loading.foodtruckGet ? disabledButtonStyle : buttonStyle} onClick={testFoodtruckGet} disabled={loading.foodtruckGet}>
            {loading.foodtruckGet ? "로딩중..." : "푸드트럭 정보 조회 테스트"}
          </button>
          <ResultDisplay apiName="foodtruckGet" result={results.foodtruckGet} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>4.2 푸드트럭 정보 수정 API</h3>
          <p>PUT /user/foodtruck</p>
          <button style={loading.foodtruckUpdate ? disabledButtonStyle : buttonStyle} onClick={testFoodtruckUpdate} disabled={loading.foodtruckUpdate}>
            {loading.foodtruckUpdate ? "로딩중..." : "푸드트럭 정보 수정 테스트"}
          </button>
          <ResultDisplay apiName="foodtruckUpdate" result={results.foodtruckUpdate} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>4.3 푸드트럭 목록 조회 API</h3>
          <p>GET /map/ft/분식</p>
          <button style={loading.foodtruckList ? disabledButtonStyle : buttonStyle} onClick={testFoodtruckList} disabled={loading.foodtruckList}>
            {loading.foodtruckList ? "로딩중..." : "푸드트럭 목록 조회 테스트"}
          </button>
          <ResultDisplay apiName="foodtruckList" result={results.foodtruckList} />
        </div>
      </section>

      {/* 5. 찜하기/알림 관련 API */}
      <section style={{ marginBottom: "30px" }}>
        <h2>5. 찜하기/알림 관련 API</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3>5.1 찜하기 추가 API</h3>
          <p>POST /map/ft/like</p>
          <button style={loading.likeAdd ? disabledButtonStyle : buttonStyle} onClick={testLikeAdd} disabled={loading.likeAdd}>
            {loading.likeAdd ? "로딩중..." : "찜하기 추가 테스트"}
          </button>
          <ResultDisplay apiName="likeAdd" result={results.likeAdd} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>5.2 찜하기 삭제 API</h3>
          <p>DELETE /map/ft/like/test-foodtruck-id</p>
          <button style={loading.likeDelete ? disabledButtonStyle : buttonStyle} onClick={testLikeDelete} disabled={loading.likeDelete}>
            {loading.likeDelete ? "로딩중..." : "찜하기 삭제 테스트"}
          </button>
          <ResultDisplay apiName="likeDelete" result={results.likeDelete} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>5.3 SMS 알림 추가 API</h3>
          <p>POST /map/ft/sms</p>
          <button style={loading.smsAdd ? disabledButtonStyle : buttonStyle} onClick={testSmsAdd} disabled={loading.smsAdd}>
            {loading.smsAdd ? "로딩중..." : "SMS 알림 추가 테스트"}
          </button>
          <ResultDisplay apiName="smsAdd" result={results.smsAdd} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>5.4 SMS 알림 삭제 API</h3>
          <p>DELETE /map/ft/sms/test-foodtruck-id/월</p>
          <button style={loading.smsDelete ? disabledButtonStyle : buttonStyle} onClick={testSmsDelete} disabled={loading.smsDelete}>
            {loading.smsDelete ? "로딩중..." : "SMS 알림 삭제 테스트"}
          </button>
          <ResultDisplay apiName="smsDelete" result={results.smsDelete} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>5.5 찜 목록 조회 API</h3>
          <p>GET /ft/like</p>
          <button style={loading.likeList ? disabledButtonStyle : buttonStyle} onClick={testLikeList} disabled={loading.likeList}>
            {loading.likeList ? "로딩중..." : "찜 목록 조회 테스트"}
          </button>
          <ResultDisplay apiName="likeList" result={results.likeList} />
        </div>
      </section>

      {/* 6. 리뷰 관련 API */}
      <section style={{ marginBottom: "30px" }}>
        <h2>6. 리뷰 관련 API</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3>6.1 사용자 리뷰 목록 조회 API</h3>
          <p>GET /user/review</p>
          <button style={loading.reviewList ? disabledButtonStyle : buttonStyle} onClick={testReviewList} disabled={loading.reviewList}>
            {loading.reviewList ? "로딩중..." : "리뷰 목록 조회 테스트"}
          </button>
          <ResultDisplay apiName="reviewList" result={results.reviewList} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>6.2 리뷰 수정 API</h3>
          <p>PUT /review</p>
          <button style={loading.reviewUpdate ? disabledButtonStyle : buttonStyle} onClick={testReviewUpdate} disabled={loading.reviewUpdate}>
            {loading.reviewUpdate ? "로딩중..." : "리뷰 수정 테스트"}
          </button>
          <ResultDisplay apiName="reviewUpdate" result={results.reviewUpdate} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>6.3 리뷰 삭제 API</h3>
          <p>DELETE /review/test-review-id</p>
          <button style={loading.reviewDelete ? disabledButtonStyle : buttonStyle} onClick={testReviewDelete} disabled={loading.reviewDelete}>
            {loading.reviewDelete ? "로딩중..." : "리뷰 삭제 테스트"}
          </button>
          <ResultDisplay apiName="reviewDelete" result={results.reviewDelete} />
        </div>
      </section>

      {/* 전체 결과 요약 */}
      <section style={{ marginTop: "40px", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        <h2>테스트 결과 요약</h2>
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
      </section>
    </div>
  );
};

export default ApiTestPage;
