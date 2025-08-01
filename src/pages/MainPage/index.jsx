import MainPageTitleCP from "../../components/MainPageCP/MainPageTitleCP";
import MainPageFeatureCP from "../../components/MainPageCP/MainPageFeatureCP";
import MainPageMethodCP from "../../components/MainPageCP/MainPageMethodCP";
import MainPageMoreFunCP from "../../components/MainPageCP/MainPageMoreFunCP";
import MainPageBottomBannerCP from "../../components/MainPageCP/MainPageBottomBannerCP";
import MainLayOut from "../../layout/MainLayOut";

import { MainPageMainStyle } from "./style";

const MainPage = () => {
  return (
    <MainPageMainStyle>
      <MainLayOut>
        {/* 메인 타이틀 */}
        <MainPageTitleCP />

        {/* 서비스 특징 */}
        <MainPageFeatureCP />

        {/* 이용 방법 */}
        <MainPageMethodCP />

        {/* 더 많은 기능들 */}
        <MainPageMoreFunCP />

        {/* 하단 베너 */}
        <MainPageBottomBannerCP />
      </MainLayOut>
    </MainPageMainStyle>
  );
};

export default MainPage;
