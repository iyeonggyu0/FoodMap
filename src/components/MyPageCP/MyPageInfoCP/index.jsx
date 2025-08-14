import { useCallback, useEffect, useState } from "react";
import { useInput } from "../../../hooks/useInput";
import ButtonCP from "../../_common/ButtonCP";
import InputCP from "../../_common/InputCP";
import OutLineButtonCP from "../../_common/OutLineButtonCP";
import { MyPageInfoCPMainStyle } from "./style";
import axios from "axios";
import { useMedia } from "../../../hooks/useMedia";

const MyPageInfoCP = ({ userData }) => {
  console.log(userData);
  // 기본 정보
  const [nickName, onChangeNickName, setNickName] = useInput();
  const [nickNameError, setNickNameError] = useState(false);
  const [phone, onChangePhone, setPhone] = useInput();

  // 인증/비밀번호 관련
  const [certification, onChangeCertification, setCertification] = useInput(""); // 인증번호 입력

  const [password, onChangePassword, setPassword] = useInput("");
  const [confirmPassword, onChangeConfirmPassword, setConfirmPassword] = useInput("");
  const [pwError, setPwError] = useState(false);
  const [pwConfirmError, setPwConfirmError] = useState(false);

  // 에러/상태 관련
  const [certificationError, setCertificationError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [isCertificationSent, setIsCertificationSent] = useState(false); // 인증번호 발송 여부

  const isPc = useMedia().isPc;

  useEffect(() => {
    setNickName(userData.nickname);
    setPhone(userData.phone);
    setCertification("");
    setPassword("");
    setConfirmPassword("");
  }, [userData]);

  /**
   * 인증번호 발송 함수
   * - 전화번호 형식(010으로 시작, 11자리) 검증
   * - 인증번호 발송 API 호출
   * - 성공 시 인증번호 발송 상태 변경 및 알림
   */
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

  /**
   * 전화번호 변경 함수
   * - 변경된 전화번호와 인증번호를 검증
   * - 인증번호 확인 API 호출
   * - 성공 시 전화번호 변경 및 페이지 새로고침
   */
  const onUpdataPhone = useCallback(async () => {
    if (userData.phone === phone) return alert("변경된 전화번호가 없습니다.");

    // 전화번호: 숫자만, 9~11자
    const phoneRegex = /^010\d{8}$/;
    if (!phoneRegex.test(phone)) {
      return setPhoneError(true);
    } else {
      setPhoneError(false);

      // 인증번호 확인 로직
      try {
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/sms/verify`, { phone, certification });
        if (res.data.success) {
          setCertificationError(false);
          alert("전화번호가 변경되었습니다.");
          return window.location.reload();
        } else {
          setCertificationError(true);
          alert("인증번호가 일치하지 않습니다.");
        }
      } catch (error) {
        setCertificationError(true);
        console.error("인증번호 확인 중 에러:", error);
      }
    }
  }, [phone]);

  /**
   * 비밀번호 변경 함수
   * - 비밀번호 길이 및 일치 여부 검증
   * - 비밀번호 변경 API 호출
   * - 성공 시 알림 및 페이지 새로고침
   */
  const onUpdatePassword = () => {
    let valid = true;
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
    if (valid) {
      axios
        .put(`${import.meta.env.VITE_API_URL}/user/password`, { password })
        .then((res) => {
          if (res.data.success) {
            alert("비밀번호가 변경되었습니다.");
            window.location.reload();
          } else {
            alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
          }
        })
        .catch((err) => {
          console.error("비밀번호 변경 중 오류 발생:", err);
          alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
        });
    }
  };

  /**
   * 닉네임 변경 함수
   * - 닉네임 형식(한글, 영어, 숫자만, 2~10자) 검증
   * - 닉네임 변경 API 호출
   * - 성공 시 알림 및 페이지 새로고침
   */
  const onUpdateNickName = async () => {
    let valid = true;
    const filtered = nickName.replace(/[^a-zA-Z0-9가-힣]/g, "");
    if (filtered !== nickName) {
      setNickName(filtered);
      return alert("닉네임은 한글, 영어, 숫자만 입력 가능합니다.");
    }

    // 닉네임: 2~10자
    if (nickName.length < 2 || nickName.length > 10) {
      setNickNameError(true);
      valid = false;
    } else {
      setNickNameError(false);
    }

    // 모든 유효성 검사 통과 시 회원가입 처리
    if (valid) {
      axios
        .put(`${import.meta.env.VITE_API_URL}/user/nickname`, { nickname: nickName })
        .then((res) => {
          if (res.data.success) {
            alert("닉네임이 변경되었습니다.");
            window.location.reload();
          } else {
            alert("닉네임 변경에 실패했습니다. 다시 시도해주세요.");
          }
        })
        .catch((err) => {
          console.error("닉네임 변경 중 오류 발생:", err);
          alert("닉네임 변경에 실패했습니다. 다시 시도해주세요.");
        });
    }
  };

  /**
   * 회원탈퇴 함수
   * - 회원탈퇴 여부 확인 후 API 호출
   * - 성공 시 알림 및 메인 페이지 이동
   */
  const onSecession = () => {
    if (window.confirm("정말로 회원탈퇴를 하시겠습니까?")) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/user/secession`)
        .then((res) => {
          if (res.data.success) {
            alert("회원탈퇴가 완료되었습니다.");
            window.location.href = "/";
          } else {
            alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
          }
        })
        .catch((err) => {
          console.error("회원탈퇴 중 오류 발생:", err);
          alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
        });
    }
  };

  return (
    <MyPageInfoCPMainStyle isPc={isPc}>
      <h2>내 정보</h2>
      <div>
        <InputCP title={"사용자 이름"} value={userData.username} lock={true} />
        <InputCP title={"e-mail"} value={userData.email} lock={true} />
        <div>
          <InputCP title={"닉네임"} onChangeHandler={onChangeNickName} value={nickName} />
          <span className="error" style={{ visibility: nickNameError ? "visible" : "hidden" }}>
            닉네임은 2자 이상 10자 이하로 입력해야 합니다.
          </span>
          {userData.nickname !== nickName && (
            <div style={{ marginTop: "4px" }} onClick={onUpdateNickName}>
              <OutLineButtonCP color="#A47764">넥네임 변경 </OutLineButtonCP>
            </div>
          )}
        </div>
        <InputCP title={"역할"} value={userData.role} lock={true} />

        <div className="col">
          <InputCP title="전화번호" value={phone} onChangeHandler={onChangePhone} ex="숫자만 입력하세요" />
          <span className="error" style={{ visibility: phoneError ? "visible" : "hidden" }} lock={isCertificationSent}>
            전화번호 형식이 올바르지 않습니다.
          </span>
          {!isCertificationSent && userData.phone !== phone && (
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

          {isCertificationSent && (
            <div style={{ marginTop: "4px" }} onClick={onUpdataPhone}>
              <OutLineButtonCP color="#A47764">핸드폰 번호 변경 </OutLineButtonCP>
            </div>
          )}
        </div>

        <div>
          <InputCP title="비밀번호" value={password} onChangeHandler={onChangePassword} pw={true} ex="8자 이상 20자 이하" />
          <span className="error" style={{ visibility: pwError ? "visible" : "hidden" }}>
            비밀번호는 8자 이상 20자 이하로 입력해야 합니다.
          </span>

          <InputCP title="비밀번호 확인" value={confirmPassword} onChangeHandler={onChangeConfirmPassword} pw={true} />
          <span className="error" style={{ visibility: pwConfirmError ? "visible" : "hidden" }}>
            비밀번호가 일치하지 않습니다.
          </span>
          {password && confirmPassword && (
            <div style={{ marginTop: "4px" }} onClick={onUpdatePassword}>
              <OutLineButtonCP color="#A47764">비밀번호 변경</OutLineButtonCP>
            </div>
          )}
        </div>

        <div className="secession" onClick={onSecession}>
          <ButtonCP color={"--red"}>회원탈퇴</ButtonCP>
        </div>
      </div>
    </MyPageInfoCPMainStyle>
  );
};
export default MyPageInfoCP;
