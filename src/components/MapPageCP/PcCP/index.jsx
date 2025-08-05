import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faHouse, faLocationCrosshairs, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import { PcCpButtonStyled, PcCpDetailsStyle, PcCpMainStyled } from "./style";
import FTList from "./FTList";
import { faImage } from "@fortawesome/free-regular-svg-icons";

/**
 * @param currentLocationButton 현재 위치 버튼 클릭 시 실행되는 함수
 * @returns
 */
const PcCP = ({
  currentLocationButton,
  filter,
  onChangeFilter,
  categoryList,
  onChangeMapGPS,
  ftData,
  onClickRelay,
  onDeleteDetails,
  onSetDetails,
  details,
  onDetails,
}) => {
  const nav = useNavigate();

  const today = new Date().getDay(); // 0:일~6:토

  return (
    <PcCpMainStyled>
      <PcCpButtonStyled>
        {/* GPS */}
        <div className="gps flexCenter" onClick={currentLocationButton}>
          <FontAwesomeIcon icon={faLocationCrosshairs} />
        </div>
        {/* 홈으로 이동 */}
        <div className="home flexCenter" onClick={() => nav("/")}>
          <FontAwesomeIcon icon={faHouse} />
        </div>
        {/* 새로고침 */}
        <div className="relay flexCenter" onClick={onClickRelay}>
          <FontAwesomeIcon icon={faArrowRotateRight} />
        </div>
      </PcCpButtonStyled>

      {/* 사이드 메뉴 */}
      <section className="sideMenu flexCol">
        <h3>분류</h3>
        <div>
          {/* 필터 */}
          <select id="category-filter" name="categoryFilter" className="filter" onChange={onChangeFilter} value={filter}>
            <option value="">필터 없음</option>
            {categoryList.map((category) => (
              <option key={category.value} value={category.value}>
                {category.data}
              </option>
            ))}
          </select>
        </div>
        <div className="marginTop"></div>
        <div>
          <h3>
            푸드트럭 목록 <span>클릭하여 자세히 보기</span>
          </h3>
          <ul>
            {ftData &&
              ftData
                .sort((a, b) => a.distance - b.distance) // 거리 순 오름차순 정렬
                .map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      onSetDetails({
                        name: item.name, // 푸드트럭 이름
                        category: item.category, // 카테고리
                        intro: item.intro, // 소개
                        schedule: item.schedule, // 영업 스케줄
                        menu: item.menu, // 메뉴 목록
                        coords: item.coords,
                      });
                    }}>
                    <FTList data={item} />
                  </div>
                ))}
          </ul>
        </div>
      </section>
      {onDetails && (
        <PcCpDetailsStyle>
          <p style={{ textAlign: "right", fontSize: "1.6rem" }}>
            <FontAwesomeIcon icon={faXmark} onClick={onDeleteDetails} className="icon" />
          </p>

          <div className="flexCenter">
            {/* 이미지 */}
            <FontAwesomeIcon icon={faImage} className="imageIcon" />
          </div>
          <div style={{ minHeight: "100px" }}>
            <h3 className="name ">
              <span>{details.name}</span> <span className="category">{details.category}</span>
            </h3>
            <p className="intro">{details.intro}</p>
          </div>
          <div className="marginTop"></div>
          {/* <h3 className="menu">메뉴</h3> */}
          <ul className="menuList">
            {details.menu
              .slice() // 원본 배열 변경 방지
              .sort((a, b) => a.num - b.num) // num 오름차순 정렬
              .map((menuItem, index) => (
                <li key={index}>
                  <p className="flexBetween">
                    <span>{menuItem.name}</span>
                    <span>{menuItem.price.toLocaleString()}원</span>
                  </p>
                  <p>{menuItem.info}</p>
                </li>
              ))}
          </ul>
        </PcCpDetailsStyle>
      )}
    </PcCpMainStyled>
  );
};
export default PcCP;
