import { MainPageTitleCPMainStyle } from "./style";

import BrownButtonCP from "../../_common/ButtonCP";
import OutLineButtonCP from "../../_common/OutLineButtonCP";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const MainPageTitleCP = () => {
  return (
    <MainPageTitleCPMainStyle className="flexBetween">
      <div className="flexBetweenCol">
        {/* title */}
        <p>
          내 주변 <span className="highlight">푸드트럭</span>의 <br />
          위치를 찾아보세요
        </p>
        {/* subtitle */}
        <p>
          실시간 위치 정보와 신뢰할 수 있는 리뷰로 <br />
          내 주변 최고의 푸드트럭을 쉽고 빠르게 찾아보세요!
        </p>
        {/* btn + btn */}
        <div className="flexCenter">
          <BrownButtonCP
            children={"지도에서 찾기"}
            backgroundColor="--brown-light"
            icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            color="--brown-light"
            fontColor="--gray-0"></BrownButtonCP>
          <OutLineButtonCP
            children={"푸드트럭 등록하기"}
            icon={<FontAwesomeIcon icon={faMap} />}
            color="black"
            borderColor="--gray-3"></OutLineButtonCP>
        </div>
        {/* <div className="flexCenter">
          <FontAwesomeIcon icon={faBell} className="icon" />
        </div>
        <p>실시간 알림</p>
        <p>
          찜한 푸드드럭의 위치 변경이나
          <br />
          새로운 소식을 즉시 받아보세요
        </p> */}
      </div>
    </MainPageTitleCPMainStyle>
  );
};
export default MainPageTitleCP;
