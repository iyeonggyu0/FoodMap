import { useCallback, useEffect, useState } from "react";
import { useMedia } from "../../../hooks/useMedia";
import { MyLikeCPMainStyle } from "./style";
import axios from "axios";
import { ftDummyListData } from "../../../_dummyData/ftDummyListData";
import FTList from "../../MapPageCP/_common/FTList";
import { useLoginCheck } from "../../../hooks/useLoginCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faBell as faBellSolid } from "@fortawesome/free-solid-svg-icons";

import { faBell as faBellRegular } from "@fortawesome/free-regular-svg-icons";

const MyLikeCP = () => {
  const isPc = useMedia().isPc;
  const [ftList, setFtList] = useState([]); // 찜 목록 상태

  useEffect(() => {
    // 찜 목록을 불러오는 API 호출
    axios
      .get(`${import.meta.env.VITE_API_URL}/ft/like`, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setFtList(res.data.ftList);
        } else {
          console.error("찜 목록 로드 실패:", res.data.message);
        }
      })
      .catch((err) => {
        console.error("찜 목록 로드 중 오류 발생:", err);
        alert("찜 목록을 불러오는 데 실패했습니다.");
      });
    // setFtList(ftDummyListData); // 초기화
  }, []);

  const isLogin = useLoginCheck();
  // const isLogin = true; // 로그인 상태 확인 (임시)

  // 오늘 요일 확인
  const today = (new Date().getDay() + 6) % 7; // 0:월~6:일
  const dayMap = ["월", "화", "수", "목", "금", "토", "일"];
  const todayKorean = dayMap[today];

  // 각 푸드트럭별 영업상태 계산 함수
  const getBusinessStatus = (ft) => {
    const todaySchedule = ft.schedule.find((sch) => sch.day === todayKorean);
    const isHolidayToday = !todaySchedule || todaySchedule.holiday;
    if (!isHolidayToday) {
      return { status: "휴무", color: "#999" };
    }
    const now = new Date();
    const currentTime = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");
    const startTime = todaySchedule.start;
    const endTime = todaySchedule.end;
    const timeToMinutes = (time) => {
      const timeParts = time.split(":");
      const hours = parseInt(timeParts[0]);
      const minutes = timeParts.length > 1 ? parseInt(timeParts[1]) : 0;
      return hours * 60 + minutes;
    };
    const currentMinutes = timeToMinutes(currentTime);
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    if (currentMinutes < startMinutes) {
      return { status: "준비", color: "#fba33e" };
    } else if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
      return { status: "영업중", color: "#5dcd61" };
    } else {
      return { status: "영업종료", color: "var(--red)" };
    }
  };

  // 각 푸드트럭별 평균 평점 계산 함수
  const avgRating = (ft) => {
    if (ft.review && ft.review.length > 0) {
      const totalRating = ft.review.reduce((sum, review) => sum + review.rating, 0);
      return (totalRating / ft.review.length).toFixed(1);
    }
    return "리뷰 없음";
  };

  const onDeleteLike = useCallback((ftId) => {
    if (!isLogin) return alert("로그인 후 이용해주세요.");

    if (!ftId) {
      console.error("푸드트럭 ID가 없습니다.");
      return;
    }

    axios.delete(`${import.meta.env.VITE_API_URL}/map/ft/like/${ftId}`, { withCredentials: true }).catch((err) => {
      console.error("취소 실패:", err);
      alert("취소에 실패했습니다.");
    });
  });

  const onDeleteSms = useCallback((ftId, day) => {
    if (!isLogin) return alert("로그인 후 이용해주세요.");

    if (!ftId || !day) {
      console.error("푸드트럭 ID 또는 요일이 없습니다.");
      return;
    }

    axios.delete(`${import.meta.env.VITE_API_URL}/map/ft/sms/${ftId}/${day}`, { withCredentials: true }).catch((err) => {
      console.error("알림 취소 실패:", err);
      alert("알림 취소에 실패했습니다.");
    });
  });

  const onAddSms = useCallback((ftId, day) => {
    if (!isLogin) return alert("로그인 후 이용해주세요.");

    if (!ftId || !day) {
      console.error("푸드트럭 ID 또는 요일이 없습니다.");
      return;
    }

    axios.post(`${import.meta.env.VITE_API_URL}/map/ft/sms`, { ftId, day }, { withCredentials: true }).catch((err) => {
      console.error("알림 등록 실패:", err);
      alert("알림 등록에 실패했습니다.");
    });
  }, []);

  return (
    <MyLikeCPMainStyle isPc={isPc}>
      <h2>알림/찜 목록</h2>
      <ul>
        {ftList &&
          ftList?.map((ft, index) => {
            const businessInfo = getBusinessStatus(ft);
            return (
              <li className="ftListIndexLi" key={index}>
                <div className="ftListIndex">
                  <p className="flexBetween">
                    <span className="name">{ft.name}</span>
                    <span className="isHolidayToday" style={{ backgroundColor: businessInfo.color }}>
                      {businessInfo.status}
                    </span>
                  </p>
                  <p className="intro">{ft.intro}</p>
                  <p>{ft.schedule[today].userAddress}</p>
                  <p className="flexBetween">
                    <span>
                      {ft.schedule[today].start}시 ~ {ft.schedule[today].end}시
                    </span>

                    <span style={{ fontSize: "1rem" }}>
                      {isLogin && ft.like && (
                        <span
                          style={{ color: "var(--red)", paddingRight: "0.5rem", cursor: "pointer" }}
                          onClick={() => {
                            onDeleteLike(ft.truckId);
                          }}>
                          <FontAwesomeIcon icon={faHeart} />
                        </span>
                      )}
                      <FontAwesomeIcon icon={faStar} className="icon" /> {avgRating(ft) || "리뷰 없음"}
                    </span>
                  </p>
                </div>
                <div className="ftScheduleDiv flexBetween">
                  <ul className="schedule">
                    {ft.schedule.slice().map((schedule, index) => (
                      <li
                        key={index}
                        style={{
                          color: !schedule.holiday ? "var(--red)" : index === today ? "var(--green-accent)" : "",
                        }}>
                        <span>
                          {!schedule.holiday ? <FontAwesomeIcon icon={faBellRegular} style={{ visibility: "hidden" }} /> : ""}
                          {!schedule.sms && schedule.holiday && (
                            <FontAwesomeIcon icon={faBellRegular} onClick={() => onAddSms(ft.truckId, schedule.day)} style={{ cursor: "pointer" }} />
                          )}
                          {schedule.sms && schedule.holiday && (
                            <FontAwesomeIcon icon={faBellSolid} onClick={() => onDeleteSms(ft.truckId, schedule.day)} style={{ cursor: "pointer" }} />
                          )}
                        </span>
                        <span>{schedule.day}요일</span>
                        <span>{!schedule.holiday ? "휴일" : `${schedule.start}시 ~ ${schedule.end}시`}</span>
                        <span>{!schedule.holiday ? "" : `${schedule.userAddress}`}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
      </ul>
    </MyLikeCPMainStyle>
  );
};
export default MyLikeCP;
