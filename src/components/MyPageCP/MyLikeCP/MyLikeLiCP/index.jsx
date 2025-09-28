import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faBell as faBellSolid } from "@fortawesome/free-solid-svg-icons";
import { faBell as faBellRegular } from "@fortawesome/free-regular-svg-icons";
import { useLoginCheck } from "../../../../hooks/useLoginCheck";
import { useMedia } from "../../../../hooks/useMedia";
import { useEffect, useState } from "react";
import axios from "axios";

const MyLikeLiCP = ({ ftId, onDeleteLike, onDeleteSms, onAddSms }) => {
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

  const [businessInfo, setBusinessInfo] = useState(null);
  const [ftData, setFtData] = useState({});

  // const businessInfo = getBusinessStatus(ft);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/user/foodtruck/${ftId}`, { withCredentials: true })
      .then((res) => {
        setFtData(res.data);
        setBusinessInfo(getBusinessStatus(res.data));
        console.log("푸드트럭 데이터:", res.data);
      })
      .catch((err) => {
        console.error("푸드트럭 정보 로드 중 오류 발생:", err);
        alert("푸드트럭 정보를 불러오는 데 실패했습니다.");
      });
  });

  return (
    <div>
      {ftData && (
        <li className="ftListIndexLi">
          <div className="ftListIndex">
            <p className="flexBetween">
              <span className="name">{ftData.name}</span>
              <span className="isHolidayToday" style={{ backgroundColor: businessInfo?.color || "#999" }}>
                {businessInfo?.status || "휴무"}
              </span>
            </p>
            <p className="intro">{ftData.intro}</p>
            <p>{ftData.schedule?.[today]?.userAddress}</p>
            <p className="flexBetween">
              <span>
                {ftData.schedule?.[today]?.start}시 ~ {ftData.schedule?.[today]?.end}시
              </span>
              <span style={{ fontSize: "1rem" }}>
                <FontAwesomeIcon icon={faHeart} style={{ color: "var(--red)", paddingRight: "0.5rem" }} />
                <FontAwesomeIcon icon={faStar} className="icon" /> {avgRating(ftData) || "리뷰 없음"}
              </span>
            </p>
          </div>
          <div className="ftScheduleDiv flexBetween">
            <ul className="schedule">
              {ftData.schedule?.slice().map((schedule, idx) => (
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
      )}
    </div>
  );
};
export default MyLikeLiCP;
