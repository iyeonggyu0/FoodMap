import styled from "styled-components";
import { useMedia } from "../../../hooks/useMedia";

const OutLienButtonCPStlye = styled.span`
  display: inline-block;
  padding: ${({ pcOnly, media }) => (pcOnly ? (media ? "10px 14px" : "unset") : "10px 14px")};
  border-radius: ${({ pcOnly, media }) => (pcOnly ? (media ? "5px" : "unset") : "5px")};
  color: ${({ pcOnly, media, color }) => (pcOnly ? (media ? color : "black") : color)};
  border: ${({ pcOnly, media }) => (pcOnly ? (media ? "1px" : "0px") : "1px")} solid ${({ color }) => color};
`;

/**
 *
 * @param children 태그 속 내용
 * @param {boolean} [pcOnly=false] PC에서만 배경을 유지 할 예정인지 (기본값: F)
 * @param {string} color 글자, 테두리 색을 정한다. (기본값: #FFF)
 * @returns OutLienButtonCP 는 _common에 속하며, 해당 태그로 감싼 글자를 span으로 color의 테두리와 글자색을 만드는 css 적용
 */

const OutLienButtonCP = ({ children, pcOnly = false, color = "#FFF" }) => {
  const isPc = useMedia().isPc;
  return (
    <OutLienButtonCPStlye pcOnly={pcOnly} media={isPc} color={color}>
      {children}
    </OutLienButtonCPStlye>
  );
};
export default OutLienButtonCP;
