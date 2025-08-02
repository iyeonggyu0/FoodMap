import { useNavigate } from "react-router-dom";
import BrownButtonCP from "../../../components/_common/ButtonCP";
import { useLoginCheck } from "../../../hooks/useLoginCheck";
import { MainLayOutHeaderStyled } from "./style";

const MainLayOutHeader = () => {
  const loginCheck = useLoginCheck();
  const nav = useNavigate();

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
              <li className="loginButton" onClick={() => nav("/login")}>
                로그인
              </li>
            )}
            {!loginCheck && (
              <li className="singInButton">
                <BrownButtonCP pcOnly="true" onClick={() => nav("/sign-up")}>
                  회원가입
                </BrownButtonCP>
              </li>
            )}
            {loginCheck && (
              <li className="singInButton">
                <BrownButtonCP pcOnly="true" onClick={() => nav("/my-page")}>
                  마이페이지
                </BrownButtonCP>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </MainLayOutHeaderStyled>
  );
};
export default MainLayOutHeader;
