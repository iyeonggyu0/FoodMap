import styled from "styled-components";
import { useMedia } from "../../../hooks/useMedia";

const OutLienButtonCPStlye = styled.span`
  display: flex;
  align-items: center;
  padding: ${({ pcOnly, media }) => (pcOnly ? (media ? "10px 14px" : "unset") : "10px 14px")};
  border-radius: ${({ pcOnly, media }) => (pcOnly ? (media ? "5px" : "unset") : "5px")};
  color: ${({ pcOnly, media, color }) => (pcOnly ? (media ? color : "black") : color)};
  border: ${({ pcOnly, media }) => (pcOnly ? (media ? "1px" : "0px") : "1px")} solid 
    ${({ borderColor, color }) => `var(${borderColor})` || `var(${color})`};
`;

/**
 *
 * @param children 태그 속 내용
 * @param {ReactNode} icon 버튼 좌측에 표시할 아이콘 컴포넌트 (props: icon={<FontAwesomeIcon icon={faStar} />})
 * @param {boolean} [pcOnly=false] PC에서만 배경을 유지 할 예정인지 (기본값: F)
 * @param {string} color 글자와 테두리 색을 정한다. (기본값: #FFF)
 * @param {string} borderColor 테두리 색을 정한다. (기본값: color와 동일)
 * @returns OutLienButtonCP 는 _common에 속하며, 해당 태그로 감싼 글자를 span으로 color의 테두리와 글자색을 만드는 css 적용
 */

const OutLienButtonCP = ({ icon, children, pcOnly = false, color = "#FFF", borderColor }) => {
  const isPc = useMedia().isPc;
  return (
    <OutLienButtonCPStlye pcOnly={pcOnly} media={isPc} color={color} borderColor={borderColor}>
      {icon && <span style={{ display: "inline-flex", alignItems: "center", marginRight: "0.5em" }}>{icon}</span>}
      {children}
    </OutLienButtonCPStlye>
  );
};
export default OutLienButtonCP;
