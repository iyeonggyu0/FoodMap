import styled from "styled-components";
import { useMedia } from "../../../hooks/useMedia";

const ButtonCPStyle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${({ pcOnly, media, color }) => (pcOnly ? (media ? `var(${color})` : "transparent") : `var(${color})`)};
  padding: ${({ pcOnly, media }) => (pcOnly ? (media ? "10px 14px" : "unset") : "10px 14px")};
  border-radius: ${({ pcOnly, media }) => (pcOnly ? (media ? "5px" : "unset") : "5px")};
  color: ${({ pcOnly, media, fontColor }) => (pcOnly ? (media ? `var(${fontColor})` : "black") : `var(${fontColor})`)};
`;

/**
 *
 * @param children 태그 속 내용
 * @param {ReactNode} icon 버튼 좌측에 표시할 아이콘 컴포넌트 (props: icon={<FontAwesomeIcon icon={faStar} />} )
 * @param {boolean} [pcOnly=false] PC에서만 배경을 유지 할 예정인지 (기본값: F)
 * @param {string} color 글자, 테두리 색을 정한다. (기본값: --brown-light:)
 * @param {string} fontColor 글자 색을 정한다. (기본값: --gray-0)
 * @returns BrownButtonCP 는 _common에 속하며, 해당 태그로 감싼 글자를 span으로 갈색 css 적용
 */
const ButtonCP = ({ children, icon, pcOnly = false, color = "--brown-light", fontColor = "--gray-0" }) => {
  const isPc = useMedia().isPc;
  return (
    <ButtonCPStyle pcOnly={pcOnly} media={isPc} color={color} fontColor={fontColor}>
      {icon && <span style={{ display: "inline-flex", alignItems: "center", marginRight: "0.5em" }}>{icon}</span>}
      {children}
    </ButtonCPStyle>
  );
};
export default ButtonCP;
