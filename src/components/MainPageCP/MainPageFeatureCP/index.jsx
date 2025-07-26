import { MainPageFeatureCPMainStyle } from "./style";

import BrownButtonCP from "../../_common/ButtonCP";
import OutLineButtonCP from "../../_common/OutLineButtonCP";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar, faBell } from "@fortawesome/free-solid-svg-icons";

const MainPageFeatureCP = () => {
  return (
    <MainPageFeatureCPMainStyle className="flexBetween">
      <div className="flexBetweenCol">
        {/* title */}
        <p>서비스 특징</p>
        {/* cards */}
        <div className="flexBetween">
          {/* card 1 */}
          <div className="flexBetweenCol">
            <div className="icon flexCenter">
              <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <p>실시간 위치</p>
            <p>
              푸드트럭의 실시간 위치와 운영 시간을 확인하고,
              <br />
              내 주변 맛집을 쉽게 찾아보세요.
            </p>
          </div>
          {/* card 2 */}
          <div className="flexBetweenCol">
            <div className="icon flexCenter">
              <FontAwesomeIcon icon={faStar} />
            </div>
            <p>리뷰 & 평점</p>
            <p>
              다른 고객들의 솔직한 리뷰와 평점을 통해
              <br />
              맛있는 푸드트럭을 미리 확인하세요.
            </p>
          </div>
          {/* card 3 */}
          <div className="flexBetweenCol">
            <div className="icon flexCenter">
              <FontAwesomeIcon icon={faBell} />
            </div>
            <p>알림 설정</p>
            <p>
              푸드트럭의 오픈 알림을 설정하고, 
              <br />
              좋아하는 맛집의 소식을 놓치지 마세요.
            </p>
          </div>
        </div>
      </div>
    </MainPageFeatureCPMainStyle>
  );
};
export default MainPageFeatureCP;
/*
          

          
          */