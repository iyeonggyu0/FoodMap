import { useEffect, useState, useRef, useCallback } from "react";
import { useMedia } from "../../hooks/useMedia";
import PcCP from "../../components/MapPageCP/PcCP";
// import { Map, MapTypeControl, ZoomControl } from "react-kakao-maps-sdk";
import { MapPageMainStyle } from "./style";
import { useInput } from "../../hooks/useInput";
import axios from "axios";
import { ftDummyListData } from "../../_dummyData/ftDummyListData";

const MapPage = () => {
  const isMedia = useMedia("");
  const DEFAULT_CENTER = { lat: 33.450701, lng: 126.570667 };
  const [ftData, setFtData] = useState();
  const mapRef = useRef(null); // 지도 객체를 useRef로 관리
  const [filter, onChangeFilter, setFilter] = useInput("");
  const [details, setDetails] = useState([]);
  const [onDetails, setOnDetails] = useState(false);

  useEffect(() => {
    // FIXME: 임시데이터 사용
    // axios
    //   .get(`${import.meta.env.VITE_API_URL}/map/ft/${filter}`)
    //   .then((res) => {
    //     if (res.data) {
    //       onChangeFtData(res.data);
    //     } else {
    //       console.error("No data received from API");
    //     }
    //   })
    //   .catch((err) => {
    //     console.error("Error fetching data:", err);
    //   });
    onChangeFtData(ftDummyListData);

    // 카카오맵 스크립트가 로드되어 있는지 확인
    if (!window.kakao || !window.kakao.maps) return;
    const container = document.getElementById("map");
    if (!container) return;

    let center = new window.kakao.maps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng);

    // 지도 객체 생성
    const createMap = (center) => {
      mapRef.current = new window.kakao.maps.Map(container, {
        center,
        level: 3,
      });
      // 마커 생성 및 가시반경 설정
      if (window.kakao.maps.RoadviewMarker) {
        const marker = new window.kakao.maps.RoadviewMarker({ position: center });
        marker.setRange(100);
        mapRef.current.addOverlay(marker);
      }
      // 지도가 생성된 후에 마커 추가 함수 실행
      onChangeFtData(ftDummyListData);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          center = new window.kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
          createMap(center);
        },
        () => {
          createMap(center);
        }
      );
    } else {
      createMap(center);
    }
  }, []);

  // 현재 위치 버튼 클릭 시 지도 중심을 현재 위치로 이동
  const currentLocationButton = () => {
    if (!window.kakao || !window.kakao.maps || !mapRef.current) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const center = new window.kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
          // 기존 지도 객체를 사용하여 중심 위치만 변경
          mapRef.current.setCenter(center);

          // 위치 변경 후 마커를 다시 생성 (기존 데이터가 있다면)
          if (ftData && ftData.length > 0) {
            onChangeFtData(ftData);
          }
        },
        (error) => {
          console.error("위치 정보 에러:", error);
        }
      );
    }
  };

  const categoryList = [
    { value: "분식", data: "분식 (어묵, 떡볶이, 순대)" },
    { value: "간식", data: "간식 (붕어빵, 타코야끼, 크레페, 츄러스, 와플)" },
    { value: "튀김", data: "튀김 (감자튀김, 치즈볼, 오징어튀김, 새우튀김)" },
    { value: "꼬치", data: "꼬치 (닭꼬치, 소시지꼬치)" },
    { value: "샌드위치/토스트", data: "샌드위치/토스트 (샌드위치, 토스트, 버거)" },
    { value: "디저트/음료", data: "디저트/음료 (아이스크림, 커피, 음료, 팥빙수)" },
    { value: "식사", data: "식사 (덮밥, 초밥)" },
    { value: "기타", data: "기타" },
  ];
  // 지도 정보 불러오기
  // 주어진 데이터(data)에서 오늘 영업 중인 가게의 위치 정보를 지도에 표시하고, 거리 계산 및 마커를 추가하는 함수
  const onChangeFtData = useCallback((data) => {
    const today = new Date().getDay(); // 오늘 요일(0:일~6:토)
    const dayMap = ["일", "월", "화", "수", "목", "금", "토"]; // 요일 매핑
    // 카카오 지도 및 주소검색 서비스가 로드되어 있는지 확인
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) return;
    const geocoder = new window.kakao.maps.services.Geocoder(); // 주소검색 객체 생성
    const map = mapRef.current; // 현재 지도 객체
    // 지도 중심 좌표 가져오기 (없으면 기본 좌표 사용)
    const center = map ? map.getCenter() : new window.kakao.maps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng);

    let pending = 0; // 비동기 addressSearch 완료 카운트
    let total = 0; // addressSearch 호출 총 횟수
    const resultArr = [...data]; // 결과 데이터 복사본

    // 기본 마커 사용 (커스텀 이미지 제거)

    // 데이터 배열 순회
    resultArr.forEach((item, idx) => {
      // 오늘 영업 중이며, 휴무가 아니고, 지도 주소가 있는 스케줄 찾기
      const todaySchedule = item.schedule.find((sch) => sch.day === dayMap[today] && sch.holiday && sch.mapAddress && sch.mapAddress.trim() !== "");
      if (!todaySchedule) return;
      total++;
      geocoder.addressSearch(todaySchedule.mapAddress, function (result, status) {
        if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
          const lat = parseFloat(result[0].y);
          const lng = parseFloat(result[0].x);
          const itemLatLng = new window.kakao.maps.LatLng(lat, lng);
          const polyline = new window.kakao.maps.Polyline({ path: [center, itemLatLng] });
          const distance = polyline.getLength();
          resultArr[idx] = {
            ...item,
            coords: { lat, lng },
            distance,
          };
          // 지도에 기본 마커 추가
          if (map) {
            const marker = new window.kakao.maps.Marker({
              map,
              position: itemLatLng,
              title: item.name,
              clickable: true, // 마커 클릭 가능하도록 설정
            });

            // 마커 클릭 이벤트 등록
            window.kakao.maps.event.addListener(marker, "click", function () {
              // console.log("=== 푸드트럭 정보 ===");
              // console.log("이름:", item.name);
              // console.log("카테고리:", item.category);
              // console.log("소개:", item.intro);
              // console.log("거리:", Math.round(distance) + "m");
              // console.log("좌표:", { lat, lng });
              // console.log("오늘 영업시간:", todaySchedule.start + "시 ~ " + todaySchedule.end + "시");
              // console.log("주소:", todaySchedule.userAddress);
              // console.log("메뉴:", item.menu);
              // console.log("==================");
              onChangeMapGPS({ lat, lng });
              setDetails({
                name: item.name,
                category: item.category,
                intro: item.intro,
                schedule: item.schedule,
                menu: item.menu,
              });
              setOnDetails(true);
            });
          }
        }
        pending++;
        if (pending === total) {
          console.log("Map", resultArr);
          setFtData(resultArr);
        }
      });
    });
  }, []);

  // 하위 컴포넌트에서 지도 위치 이동
  const onChangeMapGPS = useCallback((gps) => {
    if (!mapRef.current || !gps) return;
    const center = new window.kakao.maps.LatLng(gps.lat, gps.lng);
    mapRef.current.setCenter(center);
  }, []);

  // 새로고침 버튼 클릭 시 푸드트럭 데이터 다시 로드
  const onClickRelay = useCallback(() => {
    onChangeFtData(ftData);
  }, [ftData, onChangeFtData]);

  // 상세 정보 창 닫기 함수
  const onDeleteDetails = useCallback(() => {
    setOnDetails(false); // 상세 정보 표시 상태를 false로 변경
    setDetails([]); // 상세 정보 데이터 초기화
  }, []);

  // 푸드트럭 상세 정보 설정 및 표시 함수
  const onSetDetails = useCallback((data) => {
    console.log("data", data);
    // 선택된 푸드트럭의 상세 정보를 설정
    setDetails({
      name: data.name, // 푸드트럭 이름
      category: data.category, // 카테고리
      intro: data.intro, // 소개
      schedule: data.schedule, // 영업 스케줄
      menu: data.menu, // 메뉴 목록
    });
    setOnDetails(true); // 상세 정보 창 표시
    onChangeMapGPS(data.coords); // 상세 정보 창 열 때 지도 위치 이동
  }, []);

  return (
    <MapPageMainStyle>
      {isMedia.isPc && (
        <PcCP
          currentLocationButton={currentLocationButton}
          filter={filter}
          onChangeFilter={onChangeFilter}
          categoryList={categoryList}
          ftData={ftData}
          onChangeMapGPS={onChangeMapGPS}
          onClickRelay={onClickRelay}
          onDeleteDetails={onDeleteDetails}
          onSetDetails={onSetDetails}
          details={details}
          onDetails={onDetails}
        />
      )}
      {isMedia.isMobile && <div>isMobile View</div>}
      {/* 지도 */}
      <div id="map" style={{ width: "100%", height: "100vh" }}></div>
    </MapPageMainStyle>
  );
};
export default MapPage;
