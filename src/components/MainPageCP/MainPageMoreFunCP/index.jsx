import { MainPageMoreFunCPMainStyle } from "./style";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faStar, faMap } from "@fortawesome/free-regular-svg-icons";

const MainPageMoreFunCP = () => {
  return (
    <MainPageMoreFunCPMainStyle className="flexBetween">
      {/* <h2>더 많은 기능들</h2> */}
      <div className="flexBetweenCol">
        <div className="flexCenter">
          <FontAwesomeIcon icon={faBell} className="icon" />
        </div>
        <p>실시간 알림</p>
        <p>
          찜한 푸드드럭의 위치 변경이나
          <br />
          새로운 소식을 즉시 받아보세요
        </p>
      </div>
      <div className="flexBetweenCol">
        <div className="flexCenter">
          <FontAwesomeIcon icon={faStar} className="icon" />
        </div>
        <p>평점 시스템</p>
        <p>
          신뢰할 수 있는 평점과 리뷰로
          <br />
          최고의 푸드트럭을 찾아보세요
        </p>
      </div>
      <div className="flexBetweenCol">
        <div className="flexCenter">
          <FontAwesomeIcon icon={faMap} className="icon" />
        </div>
        <p>정확한 위치</p>
        <p>
          GPS 기반의 정확한 위치 정보로
          <br />
          해매지 않고 바로 찾아가 보세요
        </p>
      </div>
    </MainPageMoreFunCPMainStyle>
  );
};
export default MainPageMoreFunCP;
