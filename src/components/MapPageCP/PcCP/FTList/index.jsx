import styled from "styled-components";

const FTListMainStyled = styled.li`
  padding: 1.6rem 0;
  border-bottom: 1px solid var(--gray-2);
  cursor: pointer;

  & > p:nth-child(1) {
    margin-bottom: 0.5rem;
  }

  & > p:nth-child(1) > span:nth-child(1) {
    padding: 0.4rem 0;
    font-weight: 600;
    font-size: 1.1rem;
  }

  & > p:nth-child(1) > span:nth-child(2) {
    display: inline-block;
    width: 56px;
    font-size: 0.75rem;
    padding: 0.3rem 0;
    line-height: 1.6;
    text-align: center;
    color: var(--gray-0);
    border-radius: 16px;
  }

  & > p:nth-child(2) {
    color: var(--gray-5);
    font-size: 0.75rem;
  }

  & > p:nth-child(3) {
    color: var(--gray-5);
    font-size: 0.9rem;
    margin-top: 1rem;
  }
  & > p:nth-child(4) {
    color: var(--gray-5);
    font-size: 0.9rem;
    margin-top: 0.3rem;
  }
`;

const FTList = ({ data }) => {
  // 오늘 요일 확인
  const today = new Date().getDay(); // 0:일~6:토
  const dayMap = ["일", "월", "화", "수", "목", "금", "토"];
  const todayKorean = dayMap[today];

  // 오늘 요일에 해당하는 스케줄 찾기
  const todaySchedule = data.schedule.find((sch) => sch.day === todayKorean);

  // 오늘 휴무인지 확인 (스케줄이 없거나 holiday가 true면 휴무)
  const isHolidayToday = !todaySchedule || todaySchedule.holiday;

  // 영업 상태 판단 함수
  const getBusinessStatus = () => {
    // 휴무일인 경우
    if (!isHolidayToday) {
      return { status: "휴무", color: "#999" };
    }

    // 현재 시간 (HH:MM 형태)
    const now = new Date();
    const currentTime = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");

    const startTime = todaySchedule.start;
    const endTime = todaySchedule.end;

    // 시간 비교를 위해 분으로 변환
    const timeToMinutes = (time) => {
      // "15" 형태와 "15:30" 형태 모두 처리
      const timeParts = time.split(":");
      const hours = parseInt(timeParts[0]);
      const minutes = timeParts.length > 1 ? parseInt(timeParts[1]) : 0; // 분이 없으면 0으로 처리
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
      return { status: "영업종료", color: "#e1645b" };
    }
  };

  const businessInfo = getBusinessStatus();

  console.log(data);
  return (
    <FTListMainStyled>
      <p className="flexBetween">
        <span className="name">{data.name}</span>
        <span className="isHolidayToday" style={{ backgroundColor: businessInfo.color }}>
          {businessInfo.status}
        </span>
      </p>
      <p className="intro">{data.intro}</p>
      <p>{data.schedule[today].userAddress}</p>
      <p>
        {data.schedule[today].start}시 ~ {data.schedule[today].end}시
      </p>
    </FTListMainStyled>
  );
};
export default FTList;
