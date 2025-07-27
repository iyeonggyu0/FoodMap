/**
 * TextAreaInputCP 컴포넌트
 * - 텍스트 영역 입력을 위한 공통 컴포넌트
 * - styled-components와 react-textarea-autosize 사용
 */
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

const TextAreaInputCPMainStyle = styled.form`
  /**
 * 텍스트 영역 입력 폼 스타일
 */
  width: 100%;
  display: flex;
  flex-direction: column;

  & > label {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }

  & > label > .essential {
    color: orange;
    padding-left: 0.2rem;
  }

  & textarea {
    width: 100%;
    height: 3.5rem;
    padding: 1.5rem;
    border: 1px solid var(--gray-4);
    border-radius: 0.5rem;
    resize: none; /* 드래그로 크기 변경 방지 */
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    transition: all 0.1s ease-in-out;
  }

  & textarea:focus {
    border: 1px solid var(--brown-light);
    outline: none;
  }
`;

/**
 * TextAreaInputCP
 * @param {string} title - 라벨 텍스트
 * @param {boolean} essential - 필수 입력 여부
 * @param {string} ex - placeholder 예시
 * @param {function} onChangeHandler - 입력값 변경 핸들러
 * @param {string} value - 입력값
 * @param {number} maxRows - 최대 행 수
 * @param {number} minRows - 최소 행 수
 */
const TextAreaInputCP = ({ title = "이름을 입력하세요", essential = false, ex, onChangeHandler, value, maxRows, minRows }) => {
  return (
    <TextAreaInputCPMainStyle>
      <label htmlFor="InputCP">
        {title}
        {essential && <span className="essential">*</span>}
      </label>
      <TextareaAutosize minRows={minRows} maxRows={maxRows} value={value} placeholder={ex} onChange={onChangeHandler} />
    </TextAreaInputCPMainStyle>
  );
};
export default TextAreaInputCP;
