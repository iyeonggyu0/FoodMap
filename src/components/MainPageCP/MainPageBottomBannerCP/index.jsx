import { useNavigate } from "react-router-dom";
import BrownButtonCP from "../../_common/ButtonCP";
import OutLineButtonCP from "../../_common/OutLineButtonCP";
import { MainPageBottomBannerCPMainStyle } from "./style";
/**
 * 메인페이지 가장 하단부 베너
 */
const MainPageBottomBannerCP = () => {
  const nav = useNavigate();
  return (
    <MainPageBottomBannerCPMainStyle className="flexCenter">
      <div className="flexBetweenCol">
        <h2>지금 바로 시작하세요</h2>
        <p>맛있는 길거리 음식의 세계로 떠나보세요</p>
        <div className="flexHeightCenter">
          <div onClick={() => nav("/faq")}>
            <OutLineButtonCP borderColor="--gray-0">FAQ 바로가기</OutLineButtonCP>
          </div>
          <div onClick={() => nav("/map")}>
            <BrownButtonCP color="--gray-0" fontColor="--gray-6">
              지도 바로가기
            </BrownButtonCP>
          </div>
        </div>
      </div>
    </MainPageBottomBannerCPMainStyle>
  );
};
export default MainPageBottomBannerCP;
