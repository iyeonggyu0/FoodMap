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

  const [password, onChangePassword, setPassword] = useInput("");
  const [confirmPassword, onChangeConfirmPassword, setConfirmPassword] = useInput("");
  const [pwError, setPwError] = useState(false);
  const [pwConfirmError, setPwConfirmError] = useState(false);

  const isPc = useMedia().isPc;

  useEffect(() => {
    setNickName(userData.nickname);
    setPhone(userData.phone);
    setPassword("");
    setConfirmPassword("");
  }, [userData]);

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
        .put(`${import.meta.env.VITE_API_URL}/user/password?newPassword=${encodeURIComponent(password)}`, null, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.message) {
            alert(res.data.message);
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
        .put(`${import.meta.env.VITE_API_URL}/user/nickname?newNickname=${encodeURIComponent(nickName)}`, null, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.message) {
            alert(res.data.message);
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
        .delete(`${import.meta.env.VITE_API_URL}/user/secession`, { withCredentials: true })
        .then((res) => {
          if (res.data.message) {
            alert(res.data.message);
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
              <OutLineButtonCP color="#A47764">닉네임 변경 </OutLineButtonCP>
            </div>
          )}
        </div>
        <InputCP title={"역할"} value={userData.role} lock={true} />

        <div className="col">
          <InputCP title="전화번호" value={phone} lock={true} ex="숫자만 입력하세요" />
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
