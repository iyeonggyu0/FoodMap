import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faHouse, faLocationCrosshairs, faMagnifyingGlass, faPen, faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import TextareaAutosize from "react-textarea-autosize";

import { useNavigate } from "react-router-dom";
import { PcCpButtonStyled, PcCpDetailsStyle, PcCpMainStyled } from "./style";
import FTList from "./FTList";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { useCallback, useEffect } from "react";

/**
 * @param currentLocationButton 현재 위치 버튼 클릭 시 실행되는 함수
 * @returns
 */
const PcCP = ({ currentLocationButton, filter, onChangeFilter, categoryList, ftData, onClickRelay, onDeleteDetails, onSetDetails, details, onDetails }) => {
  const nav = useNavigate();

  const today = (new Date().getDay() + 6) % 7; // 0:월~6:일

  const detailAvgRating = useCallback(() => {
    if (details.review && details.review.length > 0) {
      const totalRating = details.review.reduce((acc, review) => acc + review.rating, 0);
      return (totalRating / details.review.length).toFixed(1); // 소수점 첫째 자리까지
    }
  }, [details]);

  useEffect(() => {
    const detailsElement = document.getElementById("details");
    if (detailsElement) {
      detailsElement.scrollTop = 0; // 내부 스크롤을 맨 위로 이동
    }
  }, [details]);

  console.log("PcCP details", details);

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
                        review: item.review, // 리뷰 목록
                        truckId: item.truckId, // 푸드트럭 ID (추가된 부분)
                      });
                    }}>
                    <FTList data={item} />
                  </div>
                ))}
          </ul>
        </div>
      </section>
      {onDetails && (
        <PcCpDetailsStyle id="details">
          <p style={{ textAlign: "right", fontSize: "1.6rem" }}>
            <FontAwesomeIcon icon={faXmark} onClick={onDeleteDetails} className="icon" />
          </p>

          <div className="flexCenter">
            {/* 이미지 */}
            <FontAwesomeIcon icon={faImage} className="imageIcon" />
          </div>
          <div style={{ minHeight: "100px" }}>
            <h3 className="name ">
              <span>{details.name}</span>
            </h3>
            <p className="intro">{details.intro}</p>
          </div>
          <p className="flexBetween category review">
            <span className="category">{details.category}</span>
            <a href="#review" className="flexCenter">
              <FontAwesomeIcon icon={faStar} className="icon" /> {detailAvgRating() || "리뷰 없음"}
            </a>
          </p>
          <div className="marginTop"></div>
          <h3>요일별 위치</h3>
          <ul className="schedule">
            {details.schedule.slice().map((schedule, index) => (
              <li key={index} style={{ color: !schedule.holiday ? "#e1645b" : index === today ? "var(--green-accent)" : "" }}>
                <span>{schedule.day}요일</span>
                <span>{!schedule.holiday ? "휴일" : `${schedule.start}시 ~ ${schedule.end}시`}</span>
                <span>{!schedule.holiday ? "" : `${schedule.userAddress}`}</span>
              </li>
            ))}
          </ul>
          <div className="marginTop"></div>

          <h3>메뉴</h3>
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

          <div className="marginTop"></div>

          <h3 id="review" className="flexBetween">
            리뷰
            <a href={`/foodtruck/${details.truckId}`} style={{ fontSize: "0.9rem", color: "var(--gray-5)" }}>
              <FontAwesomeIcon icon={faPen} />
            </a>
          </h3>
          {details.review.length === 0 && (
            <div style={{ textAlign: "center", padding: "1rem" }}>
              <p>리뷰가 없습니다.</p>
            </div>
          )}
          {details.review.length > 0 && (
            <ul style={{ borderTop: "1px solid var(--gray-2)" }}>
              {details.review.slice().map((review, index) => (
                <li key={index} className="reviewItem">
                  <p className="flexBetween">
                    <span>{review.nickName}</span>
                    <span>
                      <FontAwesomeIcon icon={faStar} className="icon" /> {review.rating}
                    </span>
                  </p>
                  <TextareaAutosize
                    minRows={1}
                    maxRows={5}
                    value={review.content}
                    style={{
                      width: "100%",
                      fontFamily: "Noto Sans KR",
                      resize: "none", // 스크롤로 넓이 조절 막기
                      pointerEvents: "none", // 상호작용 막기
                    }}
                    readOnly
                    tabIndex={-1}
                  />
                </li>
              ))}
            </ul>
          )}
        </PcCpDetailsStyle>
      )}
    </PcCpMainStyled>
  );
};
export default PcCP;
