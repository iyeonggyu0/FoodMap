import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { MainLayOutFooterStyled } from "./style";
import { useNavigate } from "react-router-dom";

const MainLayOutFooter = () => {
  const nav = useNavigate();
  return (
    <MainLayOutFooterStyled className="flexBetweenCol">
      {/* 중앙 */}
      <div>
        {/* 상단 */}
        <div className="flexBetween">
          {/* 사이트정보 */}
          <div className="site-info">
            {/* title */}
            <h2>길맛로드</h2>
            {/* 설명 */}
            <p>
              맛있는 길거리 음식을 쉽게 찾고 공유하는 플랫폼입니다! <br />
              자신의 푸드트럭을 등록하고, 손님에게 다가가 보세요.
            </p>
          </div>

          {/* 목록 */}
          <nav className="flexBetween list">
            <ul>
              <li className="ul-title">서비스</li>
              <li onClick={() => nav("/map")}>푸드트럭 지도</li>
              <li onClick={() => nav("/register")}>푸드트럭 등록</li>
            </ul>
            <ul>
              <li className="ul-title">고객지원</li>
              <li onClick={() => nav("/faq")}>FAQ</li>
              <li onClick={() => nav("/faq#qna")}>Q&A</li>
            </ul>
            <ul>
              <li className="ul-title">Front</li>
              <a href="https://github.com/iyeonggyu0">
                <li>이영규</li>
              </a>
              <a href="https://github.com/Tim3208">
                <li>박정우</li>
              </a>
            </ul>
            <ul>
              <li className="ul-title">Back</li>
              <a href="https://github.com/Wangjonghui">
                <li>왕종휘</li>
              </a>
              <a href="https://github.com/jhbid04">
                <li>정혜빈</li>
              </a>
            </ul>
          </nav>
        </div>
        {/* 하단   */}
        <div className="bottom flexBetween flexHeightCenter">
          <span>
            © 2025 길맛지도. All rights reserved.{" "}
            <a href="/terms" target="_blank">
              이용약관
            </a>
            <a href="/privacy-policy" target="_blank">
              개인정보처리방침
            </a>
          </span>
          <a href="https://github.com/iyeonggyu0/FoodMap" className="icon">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </div>
    </MainLayOutFooterStyled>
  );
};
export default MainLayOutFooter;
