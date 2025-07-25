import { MainPageTitleCPMainStyle } from "./style";

import BrownButtonCP from "../../_common/ButtonCP";
import OutLineButtonCP from "../../_common/OutLineButtonCP";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faStar, faMap } from "@fortawesome/free-regular-svg-icons";

const MainPageTitleCP = () => {
  return (
    <MainPageTitleCPMainStyle className="flexBetween">
      <div className="flexBetweenCol">
        {/* title, subtitle, btn+btn */}
        {/* title */}
        <p>
          내 주변 <span className="highlight">푸드트럭</span>의 <br />
          위치를 찾아보세요          
        </p>
      </div>
    </MainPageTitleCPMainStyle>
  );
};
export default MainPageTitleCP;
