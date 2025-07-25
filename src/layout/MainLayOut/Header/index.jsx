import BrownButtonCP from "../../../components/_common/ButtonCP";
import { MainLayOutHeaderStyled } from "./style";

const MainLayOutHeader = () => {
  return (
    <MainLayOutHeaderStyled>
      <div className="flexBetween">
        <div className="title-box">
          <div>{/* logo */}</div>
          <p>길맛로드</p>
        </div>
        <nav>
          <ul className="flexBetween">
            <a href="#">
              <li>지도</li>
            </a>
            <a href="#">
              <li>등록하기</li>
            </a>
            <a href="#">
              <li>FAQ</li>
            </a>
            {/* FIXME: 세션 여부 확인해서 조건부 표시 및 기능 생성 */}
            <li className="loginButton">로그인</li>
            <li className="singInButton">
              <BrownButtonCP pcOnly="true">회원가입</BrownButtonCP>
            </li>
          </ul>
        </nav>
      </div>
    </MainLayOutHeaderStyled>
  );
};
export default MainLayOutHeader;
