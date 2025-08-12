import BrownButtonCP from "../../../components/_common/ButtonCP";
import { useLoginCheck } from "../../../hooks/useLoginCheck";
import { MainLayOutHeaderStyled } from "./style";

const MainLayOutHeader = () => {
  const loginCheck = useLoginCheck();

  console.log(loginCheck);
  return (
    <MainLayOutHeaderStyled>
      <div className="flexBetween">
        <div className="title-box">
          <a href="/">
            <div className="logo">{/* logo */}</div>
            <p>길맛로드</p>
          </a>
        </div>
        <nav>
          <ul className="flexBetween">
            <a href="/map">
              <li>지도</li>
            </a>
            <a href="/register">
              <li>등록하기</li>
            </a>
            <a href="/faq">
              <li>FAQ</li>
            </a>
            {!loginCheck && (
              <a href="/login">
                <li className="loginButton">로그인</li>
              </a>
            )}
            {!loginCheck && (
              <li className="singInButton">
                <a href="/sign-up">
                  <BrownButtonCP pcOnly="true">회원가입</BrownButtonCP>
                </a>
              </li>
            )}
            {loginCheck && (
              <li className="singInButton">
                <a href="/my-page">
                  <BrownButtonCP pcOnly="true">마이페이지</BrownButtonCP>
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </MainLayOutHeaderStyled>
  );
};
export default MainLayOutHeader;
