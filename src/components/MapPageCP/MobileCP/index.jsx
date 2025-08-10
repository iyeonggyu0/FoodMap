import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MobileCPButtonStyle, MobileCPMainStyle } from "./style";
import {
  faArrowRotateRight,
  faBars,
  faHeart,
  faHouse,
  faImage,
  faLocationCrosshairs,
  faPen,
  faStar,
  faXmark,
  faBell as faBellSolid,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import FTList from "../_common/FTList";
import { faBell as faBellRegular } from "@fortawesome/free-regular-svg-icons";

import TextareaAutosize from "react-textarea-autosize";
import PcReviewCP from "../_common/ReviewCP";

const MobileCP = ({
  currentLocationButton,
  ftData,
  onClickRelay,
  onDeleteDetails,
  onSetDetails,
  details,
  onDetails,
  onDeleteLike,
  onAddLike,
  onDeleteSms,
  onAddSms,
  isLogin,
}) => {
  const nav = useNavigate();
  const [onFTList, setOnFTList] = useState(false);
  const [isOnDetails, setIsOnDetails] = useState(false);
  // 0: 기본정보
  // 1: 메뉴
  // 2: 영업정보
  // 3: 리뷰
  const [detailsPage, setDetailsPage] = useState(0);

  useEffect(() => {
    if (!details) return;
    else if (details) setDetailsPage(0);

    setOnFTList(false);
    setIsOnDetails(true);
  }, [onDetails]);

  const onFTListTrueHandler = () => {
    setIsOnDetails(false);
    setOnFTList(true);
  };

  const onFalseHandler = () => {
    if (isOnDetails) {
      onDeleteDetails([]);
    }
    setIsOnDetails(false);
    setOnFTList(false);
  };

  const today = (new Date().getDay() + 6) % 7; // 0:월~6:일

  const detailAvgRating = useCallback(() => {
    if (details.review && details.review?.length > 0) {
      const totalRating = details.review.reduce((acc, review) => acc + review.rating, 0);
      return (totalRating / details.review?.length).toFixed(1); // 소수점 첫째 자리까지
    }
  }, [details]);

  const [onReview, setOnReview] = useState(false);

  const offReviewClick = () => {
    setOnReview(false);
  };

  return (
    <MobileCPMainStyle>
      <MobileCPButtonStyle>
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
        <div className="menu flexCenter" onClick={onFTListTrueHandler}>
          <FontAwesomeIcon icon={faBars} />
        </div>

        {onReview && <PcReviewCP offReviewClick={offReviewClick} isLogin={isLogin} details={details} />}
      </MobileCPButtonStyle>
      {/* 리스트 */}

      <section className="ftList flexCol" style={{ top: onFTList && !onReview ? "calc(100vh - 40vh)" : "100vh" }}>
        <h3 className="flexBetween">
          <span>푸드트럭 목록</span>
          <FontAwesomeIcon icon={faXmark} onClick={onFalseHandler} />
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
                      like: item.like, // 찜 여부 (추가된 부분)
                    });
                  }}>
                  <FTList data={item} isLogin={isLogin} />
                </div>
              ))}
        </ul>
      </section>

      {/* 상세정보 */}

      <section className="ftDetails flexCol" style={{ top: onDetails && !onReview ? "calc(100vh - 40vh)" : "100vh" }}>
        <h3 className="flexBetween">
          <span>푸드트럭 정보</span> <FontAwesomeIcon icon={faXmark} onClick={onDeleteDetails} />
        </h3>
        <p style={{ gap: "16px", display: "flex" }}>
          <span style={{ color: detailsPage === 0 ? "var(--gary-5)" : "var(--gray-4)" }} className="info" onClick={() => setDetailsPage(0)}>
            정보
          </span>
          <span style={{ color: detailsPage === 1 ? "var(--gary-5)" : "var(--gray-4)" }} className="menu" onClick={() => setDetailsPage(1)}>
            메뉴
          </span>
          <span style={{ color: detailsPage === 2 ? "var(--gary-5)" : "var(--gray-4)" }} className="schedule" onClick={() => setDetailsPage(2)}>
            일정
          </span>
          <span style={{ color: detailsPage === 3 ? "var(--gary-5)" : "var(--gray-4)" }} className="review" onClick={() => setDetailsPage(3)}>
            리뷰
          </span>
        </p>

        {/* 0: 기본정보 */}
        {detailsPage === 0 && (
          <section className="info flexBetweenCol">
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
              <span className="flexBetween">
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ marginRight: "1rem", color: details.like ? "#e1645b" : "lightgray", cursor: "pointer" }}
                  onClick={() => {
                    if (details.like) {
                      onDeleteLike(details.truckId);
                    } else {
                      onAddLike(details.truckId);
                    }
                  }}
                />
                <a href="#review" className="flexCenter">
                  <FontAwesomeIcon icon={faStar} className="icon" /> {detailAvgRating() || "리뷰 없음"}
                </a>
              </span>
            </p>
          </section>
        )}
        {/* 1: 메뉴 */}
        {detailsPage === 1 && (
          <section className="menu">
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
          </section>
        )}
        {/* 2: 영업정보 */}
        {detailsPage === 2 && (
          <section className="schedule">
            <ul className="schedule">
              {details.schedule.slice().map((schedule, index) => (
                <li
                  key={index}
                  style={{
                    color: !schedule.holiday ? "#e1645b" : index === today ? "var(--green-accent)" : "",
                  }}>
                  <span>
                    {!schedule.holiday ? <FontAwesomeIcon icon={faBellRegular} onClick={onAddSms} style={{ visibility: "hidden" }} /> : ""}
                    {!schedule.sms && schedule.holiday && <FontAwesomeIcon icon={faBellRegular} onClick={onAddSms} style={{ cursor: "pointer" }} />}
                    {schedule.sms && schedule.holiday && <FontAwesomeIcon icon={faBellSolid} onClick={onDeleteSms} style={{ cursor: "pointer" }} />}
                  </span>
                  <span>{schedule.day}요일</span>
                  <span>{!schedule.holiday ? "휴일" : `${schedule.start}시 ~ ${schedule.end}시`}</span>
                  <span>{!schedule.holiday ? "" : `${schedule.userAddress}`}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
        {/* 3: 리뷰 */}
        {detailsPage === 3 && (
          <section className="review">
            <h3 id="review" className="flexBetween">
              리뷰
              <span
                onClick={() => {
                  setOnReview(true);
                }}
                style={{ fontSize: "0.9rem", color: "var(--gray-5)" }}>
                <FontAwesomeIcon icon={faPen} />
              </span>
            </h3>
            {details.review?.length === 0 && (
              <div style={{ textAlign: "center", padding: "1rem" }}>
                <p>리뷰가 없습니다.</p>
              </div>
            )}
            {details.review?.length > 0 && (
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
          </section>
        )}
      </section>
    </MobileCPMainStyle>
  );
};
export default MobileCP;
