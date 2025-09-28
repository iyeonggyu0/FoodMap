import { useMedia } from "../../../hooks/useMedia";
import { MyLikeCPMainStyle } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faBell as faBellSolid } from "@fortawesome/free-solid-svg-icons";
import { faBell as faBellRegular } from "@fortawesome/free-regular-svg-icons";
import { useCallback } from "react";
import axios from "axios";
import { useLoginCheck } from "../../../hooks/useLoginCheck";

// likeList, smsList를 props로 받음
const MyLikeCP = ({ likeList = [] }) => {
  const isLogin = useLoginCheck();
  const isPc = useMedia().isPc;
  // 오늘 요일 확인
  const today = (new Date().getDay() + 6) % 7; // 0:월~6:일
  const dayMap = ["월", "화", "수", "목", "금", "토", "일"];
  const todayKorean = dayMap[today];

  // 각 푸드트럭별 영업상태 계산 함수
  const getBusinessStatus = (ft) => {
    const todaySchedule = ft.schedule?.find((sch) => sch.day === todayKorean);
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

  const onDeleteLike = useCallback(
    (ftId) => {
      if (!isLogin) return alert("로그인 후 이용해주세요.");

      if (!ftId) {
        console.error("푸드트럭 ID가 없습니다.");
        return;
      }

      axios.delete(`${import.meta.env.VITE_API_URL}/map/ft/like/${ftId}`, { withCredentials: true }).catch((err) => {
        console.error("취소 실패:", err);
        alert("취소에 실패했습니다.");
      });
    },
    [isLogin]
  );

  const onDeleteSms = useCallback(
    (ftId, day) => {
      if (!isLogin) return alert("로그인 후 이용해주세요.");

      if (!ftId || !day) {
        console.error("푸드트럭 ID 또는 요일이 없습니다.");
        return;
      }

      axios.delete(`${import.meta.env.VITE_API_URL}/map/ft/sms/${ftId}/${day}`, { withCredentials: true }).catch((err) => {
        console.error("알림 취소 실패:", err);
        alert("알림 취소에 실패했습니다.");
      });
    },
    [isLogin]
  );

  const onAddSms = useCallback(
    (ftId, day) => {
      if (!isLogin) return alert("로그인 후 이용해주세요.");

      if (!ftId || !day) {
        console.error("푸드트럭 ID 또는 요일이 없습니다.");
        return;
      }

      axios.post(`${import.meta.env.VITE_API_URL}/map/ft/sms?storeId=${ftId}&day=${day}`, null, { withCredentials: true }).catch((err) => {
        console.error("알림 등록 실패:", err);
        alert("알림 등록에 실패했습니다.");
      });
    },
    [isLogin]
  );

  console.log(likeList);

  return (
    <MyLikeCPMainStyle isPc={isPc}>
      <h2>알림/찜 목록</h2>
      <ul>
        {likeList && likeList.length > 0 ? (
          likeList.map((ft) => {
            const businessInfo = getBusinessStatus(ft);
            const todaySchedule = ft.schedule?.find((sch) => sch.day === todayKorean);
            return (
              <li className="ftListIndexLi" key={ft.truckId}>
                <div className="ftListIndex">
                  <p className="flexBetween">
                    <span className="name">{ft.name}</span>
                    <span className="isHolidayToday" style={{ backgroundColor: businessInfo.color }}>
                      {businessInfo.status}
                    </span>
                  </p>
                  <p className="intro">{ft.intro}</p>
                  <p>{todaySchedule?.userAddress}</p>
                  <p className="flexBetween">
                    <span>
                      {todaySchedule?.start}시 ~ {todaySchedule?.end}시
                    </span>
                    <span style={{ fontSize: "1rem" }}>
                      <FontAwesomeIcon icon={faHeart} style={{ color: "var(--red)", paddingRight: "0.5rem" }} />
                      <FontAwesomeIcon icon={faStar} className="icon" /> {avgRating(ft) || "리뷰 없음"}
                    </span>
                  </p>
                </div>
                <div className="ftScheduleDiv flexBetween">
                  <ul className="schedule">
                    {ft.schedule?.slice().map((schedule, idx) => (
                      <li
                        key={idx}
                        style={{
                          color: !schedule.holiday ? "var(--red)" : idx === today ? "var(--green-accent)" : "",
                        }}>
                        <span>
                          {!schedule.holiday ? <FontAwesomeIcon icon={faBellRegular} style={{ visibility: "hidden" }} /> : ""}
                          {/* 알림 토글은 생략, 필요시 구현 */}
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
          })
        ) : (
          <li>찜한 푸드트럭이 없습니다.</li>
        )}
      </ul>
    </MyLikeCPMainStyle>
  );
};
export default MyLikeCP;
