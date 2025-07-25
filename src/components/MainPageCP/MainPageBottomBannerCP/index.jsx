import BrownButtonCP from "../../_common/ButtonCP";
import OutLienButtonCP from "../../_common/OutLineButtonCP";
import { MainPageBottomBannerCPMainStyle } from "./style";

/**
 * 메인페이지 가장 하단부 베너
 */
const MainPageBottomBannerCP = () => {
  return (
    <MainPageBottomBannerCPMainStyle className="flexCenter">
      <div className="flexBetweenCol">
        <h2>지금 바로 시작하세요</h2>
        <p>맛있는 길거리 음식의 세계로 떠나보세요</p>
        <div className="flexHeightCenter">
          <BrownButtonCP color="--gray-0" fontColor="--gray-6">
            지도보기
          </BrownButtonCP>
          <OutLienButtonCP>푸드트럭 제보하기</OutLienButtonCP>
        </div>
      </div>
    </MainPageBottomBannerCPMainStyle>
  );
};
export default MainPageBottomBannerCP;
