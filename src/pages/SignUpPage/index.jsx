import MainLayOut from "../../layout/MainLayOut";
import { SignUpPageMainStyle } from "./style";
import InputCP from "../../components/_common/InputCP";
import { useInput } from "../../hooks/useInput";
import SelectInputCP from "../../components/_common/SelectInputCP";
import ButtonCP from "../../components/_common/ButtonCP";

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

  const roleOptions = [
    { value: "user", data: "손님" },
    { value: "president", data: "사장님" },
  ];

  return (
    <MainLayOut>
      <SignUpPageMainStyle>
        <section className="flexCol">
          <h2>Sign Up</h2>
          <div className="flexCol">
            <div className="col">
              <InputCP title="아이디" essential={true} value={username} onChangeHandler={onChangeUsername} ex="5자 이상 20자 이하" />
              <span className="error idError">아이디는 5자 이상 20자 이하로 입력해야 합니다.</span>
            </div>
            <div className="col">
              <InputCP title="비밀번호" essential={true} value={password} onChangeHandler={onChangePassword} pw={true} ex="8자 이상 20자 이하" />
              <span className="error pwError">비밀번호는 8자 이상 20자 이하로 입력해야 합니다.</span>
            </div>
            <div className="col">
              <InputCP title="비밀번호 확인" essential={true} value={confirmPassword} onChangeHandler={onChangeConfirmPassword} pw={true} />
              <span className="error pwError">비밀번호가 일치하지 않습니다.</span>
            </div>
            <div className="col">
              <InputCP title="Email" essential={true} value={email} onChangeHandler={onChangeEmail} />
              <span className="error emailError">이메일 형식이 올바르지 않습니다.</span>
            </div>
            <div className="col">
              <InputCP title="닉네임" essential={true} value={nickname} onChangeHandler={onChangeNickname} ex="2자 이상 10자 이하" />
              <span className="error nicknameError">닉네임은 2자 이상 10자 이하로 입력해야 합니다.</span>
            </div>
            <div className="col">
              <SelectInputCP title="역할" essential={true} value={role} onChangeHandler={onChangeRole} listData={roleOptions} />
              <span className="error roleError">역할을 선택하세요.</span>
            </div>
            <div className="col">
              <InputCP title="전화번호" essential={true} value={phone} onChangeHandler={onChangePhone} ex="숫자만 입력하세요" />
              <span className="error phoneError">전화번호 형식이 올바르지 않습니다.</span>
            </div>
            <div>
              <ButtonCP>회원가입</ButtonCP>
            </div>
          </div>
        </section>
      </SignUpPageMainStyle>
    </MainLayOut>
  );
};
export default SignUpPage;
