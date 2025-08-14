import axios from "axios";
import ButtonCP from "../../components/_common/ButtonCP";
import InputCP from "../../components/_common/InputCP";
import { useInput } from "../../hooks/useInput";
import MainLayOut from "../../layout/MainLayOut";
import { LoginPageMainStyle } from "./style";
import { encrypt, hash } from "../../util/crypto";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const nav = useNavigate();

  const [id, onChangeId, setId] = useInput("");
  const [pw, onChangePw, setPw] = useInput("");

  /**
   * 로그인 핸들러
   * 사용자가 입력한 ID와 PW를 암호화하여 서버에 로그인 요청을 보내는 함수
   *
   * @api id {string} - 사용자가 입력한 ID
   * @api pw {string} - 사용자가 입력한 PW (SHA-256 해시값)
   * @returns {void} - 로그인 성공 시 알림을 띄우고, 로컬 스토리지에 사용자 정보를 저장하며, 메인 페이지로 리다이렉트
   */
  const onLoginHandler = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      params.append("username", id);
      params.append("password", pw);
      await axios
        .post(`${import.meta.env.VITE_API_URL}/login`, params, { headers: { "Content-Type": "application/x-www-form-urlencoded" } }, { withCredentials: true })
        .then((res) => {
          if (res.data) {
            alert("로그인 성공");
            setId("");
            setPw("");
            window.location.href = "/";
          } else {
            alert("로그인 실패: " + res.data.message);
          }
        });
    } catch (err) {
      alert("로그인 요청 실패: " + (err.response?.data?.message || err.message));
    }
  }, [id, pw]);

  return (
    <MainLayOut>
      <LoginPageMainStyle>
        <section className="flexBetweenCol">
          <h2>Login</h2>
          <div>
            <InputCP value={id} onChangeHandler={onChangeId} ex="ID" />
            <InputCP value={pw} onChangeHandler={onChangePw} ex="PW" pw="true" />
          </div>
          <div onClick={onLoginHandler}>
            <ButtonCP>로그인</ButtonCP>
            <span className="signupLink" onClick={() => nav("/sign-up")}>
              회원가입 바로가기
            </span>
          </div>
        </section>
      </LoginPageMainStyle>
    </MainLayOut>
  );
};
export default LoginPage;
