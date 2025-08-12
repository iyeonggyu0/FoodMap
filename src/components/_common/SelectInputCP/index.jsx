import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const SelectInputCPMainStyle = styled.form`
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

  & .select-wrapper {
    position: relative;
    width: 100%;
  }

  & select {
    width: 100%;
    height: 3.5rem;
    padding: 0.5rem 1.5rem;
    border: 1px solid var(--gray-4);
    border-radius: 0.5rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    transition: all 0.1s ease-in-out;
    background: #fff;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    cursor: pointer;
  }

  & select:focus {
    border: 1px solid var(--brown-light);
    outline: none;
  }

  & .select-icon {
    position: absolute;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

/**
 * SelectInputCP - 셀렉트 박스 입력 컴포넌트
 * @param {string} title - select의 라벨 텍스트
 * @param {boolean} essential - 필수 입력 여부
 * @param {Array<{value: string, data: string}>} listData - 옵션 데이터 배열
 * @param {function} onChangeHandler - 선택값 변경 핸들러
 * @returns {JSX.Element} 셀렉트 입력 폼
 */

const SelectInputCP = ({ title = "이름을 입력하세요", essential = false, listData, onChangeHandler }) => {
  return (
    <SelectInputCPMainStyle>
      <label htmlFor="InputCP">
        {title}
        {essential && <span className="essential">*</span>}
      </label>
      <div className="select-wrapper">
        <select onChange={onChangeHandler}>
          <option value="" selected disabled>
            선택하세요
          </option>
          {Array.isArray(listData) &&
            listData.map((item, idx) => (
              <option key={idx} value={item.value}>
                {item.data}
              </option>
            ))}
        </select>
        <span className="select-icon">
          <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </div>
    </SelectInputCPMainStyle>
  );
};
export default SelectInputCP;
