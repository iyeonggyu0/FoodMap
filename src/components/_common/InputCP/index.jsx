import styled from "styled-components";

const InputCPMainStyle = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  & > label {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  & > label > .essential {
    color: orange;
    padding-left: 0.2rem;
  }

  & input {
    width: 100%;
    height: 3.5rem;
    padding: 0.5rem 1.5rem;
    border: 1px solid var(--gray-4);
    border-radius: 0.5rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    transition: all 0.1s ease-in-out;
  }

  & input:focus {
    border: 1px solid var(--brown-light);
    outline: none;
  }

  & input:disabled {
    background: #f5f5f5;
    color: #aaa;
    cursor: not-allowed;
  }
`;

/**
 * InputCP - 텍스트 입력 폼 컴포넌트
 * <InputCP title="타이틀" essential="true" ex="예시문입니다" onChangeHandler={onChangeFTName} />
 *
 * @param {string} title - input의 placeholder 텍스트
 * @param {boolean} essential - 필수 입력 여부
 * @param {string} ex - 예시 텍스트
 * @param {boolean} pw - 비밀번호 입력 여부
 * @param {function} onChangeHandler - 입력 값 변경 핸들러
 * @param {string} value - input의 현재 값
 * @param {boolean} lock - 입력 잠금 여부
 * @returns {JSX.Element} 텍스트 입력 폼
 *
 */
const InputCP = ({ title, essential = false, ex, pw = false, onChangeHandler, value, className, lock = false }) => {
  return (
    <InputCPMainStyle lock={lock}>
      <label htmlFor="InputCP">
        {title && title}
        {essential && <span className="essential">*</span>}
      </label>
      <input
        type={pw ? "password" : "text"}
        id="InputCP"
        name="InputCP"
        onChange={onChangeHandler}
        placeholder={ex || ""}
        value={value}
        className={className}
        disabled={lock}
      />
    </InputCPMainStyle>
  );
};
export default InputCP;
