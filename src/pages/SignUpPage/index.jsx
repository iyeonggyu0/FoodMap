import MainLayOut from "../../layout/MainLayOut";
import { SignUpPageMainStyle } from "./style";
import InputCP from "../../components/_common/InputCP";
import { useInput } from "../../hooks/useInput";
import SelectInputCP from "../../components/_common/SelectInputCP";
import ButtonCP from "../../components/_common/ButtonCP";
import OutLineButtonCP from "../../components/_common/OutLineButtonCP";
import axios from "axios";
import { useState } from "react";

const SignUpPage = () => {
  // 아이디 입력값 상태 관리
  const [username, onChangeUsername, setUsername] = useInput("");
  // 비밀번호 입력값 상태 관리
  const [password, onChangePassword, setPassword] = useInput("");
  const [confirmPassword, onChangeConfirmPassword, setConfirmPassword] = useInput("");
  // 이메일 입력값 상태 관리
  const [email, onChangeEmail, setEmail] = useInput("");
  // 닉네임 입력값 상태 관리
  const [nickname, onChangeNickname, setNickname] = useInput("");
  // 역할 입력값 상태 관리
  const [role, onChangeRole, setRole] = useInput("");
  // 전화번호 입력값 상태 관리
  const [phone, onChangePhone, setPhone] = useInput("");
  // 인증번호 입력값 상태 관리
  const [certification, onChangeCertification, setCertification] = useInput("");

  // 각 입력값별 에러 상태 관리
  const [idError, setIdError] = useState(false);
  const [pwError, setPwError] = useState(false);
  const [pwConfirmError, setPwConfirmError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [certificationError, setCertificationError] = useState(false);

  // 인증번호 발송 여부
  const [isCertificationSent, setIsCertificationSent] = useState(false);

  const roleOptions = [
    { value: "user", data: "손님" },
    { value: "president", data: "사장님" },
  ];

  // 인증번호 발송로직
  const onCertificationSent = async () => {
    // 전화번호: 숫자만, 9~11자
    const phoneRegex = /^010\d{8}$/;
    if (!phoneRegex.test(phone)) {
      return setPhoneError(true);
    } else {
      setPhoneError(false);
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/sms/send`, { phone });
        if (res.data.success) {
          alert("인증번호가 발송되었습니다.");
          setIsCertificationSent(true);
        } else {
          alert("인증번호 발송에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        alert("인증번호 발송 중 오류가 발생했습니다. 다시 시도해주세요.");
        console.error("인증번호 발송 에러:", error);
      }
    }
  };

  // 회원가입 폼 유효성 검사 함수
  const validateSignUpForm = async () => {
    let valid = true;
    // 아이디: 5~20자
    if (username.length < 5 || username.length > 20) {
      setIdError(true);
      valid = false;
    } else {
      setIdError(false);
    }
    // 비밀번호: 8~20자
    if (password.length < 8 || password.length > 20) {
      setPwError(true);
      valid = false;
    } else {
      setPwError(false);
    }
    // 비밀번호 확인: 일치 여부
    if (password !== confirmPassword || confirmPassword === "") {
      setPwConfirmError(true);
      valid = false;
    } else {
      setPwConfirmError(false);
    }
    // 이메일: 간단한 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    const filtered = nickname.replace(/[^a-zA-Z0-9가-힣]/g, "");
    if (filtered !== nickname) {
      setNickname(filtered);
      return alert("닉네임은 한글, 영어, 숫자만 입력 가능합니다.");
    }

    // 닉네임: 2~10자
    if (nickname.length < 2 || nickname.length > 10) {
      setNicknameError(true);
      valid = false;
    } else {
      setNicknameError(false);
    }

    // 역할: 필수
    if (!role) {
      setRoleError(true);
      valid = false;
    } else {
      setRoleError(false);
    }
    // 전화번호: 숫자만, 9~11자
    const phoneRegex = /^010\d{8}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError(true);
      valid = false;
    } else {
      setPhoneError(false);
    }

    // 인증번호 확인 로직
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/sms/verify`, { phone, code: certification });
      if (res.data.success) {
        setCertificationError(false);
        valid = false;
      } else {
        setCertificationError(true);
      }
    } catch (error) {
      setCertificationError(true);
      console.error("인증번호 확인 중 에러:", error);
    }

    // 모든 유효성 검사 통과 시 회원가입 처리
    if (valid) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/member`, {
          username: username,
          password: password,
          nickname: nickname,
          email: email,
          role: role,
          phone: phone,
        })
        .then((res) => {
          if (res.data.success) {
            alert("회원가입 성공");
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setEmail("");
            setNickname("");
            setRole("");
            setPhone("");
            setCertification("");
            window.location.href = "/login";
          } else {
            alert("회원가입 실패: " + res.data.message);
          }
        });
    }
  };

  return (
    <MainLayOut>
      <SignUpPageMainStyle>
        <section className="flexCol">
          <h2>Sign Up</h2>
          <div className="flexCol">
            <div className="col">
              <InputCP title="아이디" essential={true} value={username} onChangeHandler={onChangeUsername} ex="5자 이상 20자 이하" />
              <span className="error" style={{ visibility: idError ? "visible" : "hidden" }}>
                아이디는 5자 이상 20자 이하로 입력해야 합니다.
              </span>
            </div>
            <div className="col">
              <InputCP title="비밀번호" essential={true} value={password} onChangeHandler={onChangePassword} pw={true} ex="8자 이상 20자 이하" />
              <span className="error" style={{ visibility: pwError ? "visible" : "hidden" }}>
                비밀번호는 8자 이상 20자 이하로 입력해야 합니다.
              </span>
            </div>
            <div className="col">
              <InputCP title="비밀번호 확인" essential={true} value={confirmPassword} onChangeHandler={onChangeConfirmPassword} pw={true} />
              <span className="error" style={{ visibility: pwConfirmError ? "visible" : "hidden" }}>
                비밀번호가 일치하지 않습니다.
              </span>
            </div>
            <div className="col">
              <InputCP title="Email" essential={true} value={email} onChangeHandler={onChangeEmail} />
              <span className="error" style={{ visibility: emailError ? "visible" : "hidden" }}>
                이메일 형식이 올바르지 않습니다.
              </span>
            </div>
            <div className="col">
              <InputCP title="닉네임" essential={true} value={nickname} onChangeHandler={onChangeNickname} ex="2자 이상 10자 이하" />
              <span className="error" style={{ visibility: nicknameError ? "visible" : "hidden" }}>
                닉네임은 2자 이상 10자 이하로 입력해야 합니다.
              </span>
            </div>
            <div className="col">
              <SelectInputCP title="역할" essential={true} value={role} onChangeHandler={onChangeRole} listData={roleOptions} />
              <span className="error" style={{ visibility: roleError ? "visible" : "hidden" }}>
                역할을 선택하세요.
              </span>
            </div>
            <div className="col">
              <InputCP title="전화번호" essential={true} value={phone} onChangeHandler={onChangePhone} ex="숫자만 입력하세요" />
              <span className="error" style={{ visibility: phoneError ? "visible" : "hidden" }} lock={isCertificationSent}>
                전화번호 형식이 올바르지 않습니다.
              </span>
              {!isCertificationSent && (
                <div style={{ marginTop: "4px" }} onClick={onCertificationSent}>
                  <OutLineButtonCP color="#A47764">인증번호 발송</OutLineButtonCP>
                </div>
              )}

              {isCertificationSent && (
                <div style={{ marginTop: "10px" }}>
                  <InputCP title="" essential={true} value={certification} onChangeHandler={onChangeCertification} ex="인증번호" />
                  <span className="error" style={{ visibility: certificationError ? "visible" : "hidden" }}>
                    인증번호가 일치하지 않습니다.
                  </span>
                </div>
              )}
            </div>
            <div onClick={validateSignUpForm}>
              <ButtonCP>회원가입</ButtonCP>
            </div>
          </div>
        </section>
      </SignUpPageMainStyle>
    </MainLayOut>
  );
};
export default SignUpPage;
