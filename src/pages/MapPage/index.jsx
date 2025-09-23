import "./style.css";

// 주소 -> 좌표 변환 (Promise)
const addressToCoords = (address) => {
  return new Promise((resolve, reject) => {
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) return reject("Kakao map not loaded");
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
        resolve({ lat: parseFloat(result[0].y), lng: parseFloat(result[0].x) });
      } else {
        reject("주소 변환 실패: " + address);
      }
    });
  });
};

// 좌표 -> 주소 변환 (Promise)
const coordsToAddress = (lat, lng) => {
  return new Promise((resolve, reject) => {
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) return reject("Kakao map not loaded");
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(lng, lat, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
        resolve(result[0].address.address_name);
      } else {
        reject("좌표 변환 실패: " + lat + "," + lng);
      }
    });
  });
};

// schedule 배열을 주소->좌표 변환하여 lat/lng 필드 추가 (비동기)
const enrichScheduleWithCoords = async (scheduleArr) => {
  const newArr = await Promise.all(
    scheduleArr.map(async (item) => {
      if (item.mapAddress && (!item.lat || !item.lng)) {
        try {
          const coords = await addressToCoords(item.mapAddress);
          return { ...item, lat: coords.lat, lng: coords.lng };
        } catch {
          return item;
        }
      }
      return item;
    })
  );
  return newArr;
};

// schedule 배열을 좌표->주소 변환하여 mapAddress 필드 추가 (비동기)
const enrichScheduleWithAddress = async (scheduleArr) => {
  const newArr = await Promise.all(
    scheduleArr.map(async (item) => {
      if (item.lat && item.lng && !item.mapAddress) {
        try {
          const address = await coordsToAddress(item.lat, item.lng);
          return { ...item, mapAddress: address };
        } catch {
          return item;
        }
      }
      return item;
    })
  );
  return newArr;
};

// 예시: schedule 변환 사용법
// useEffect(() => {
//   const testSchedule = [
//     { day: "월", holiday: false, start: "10:00", end: "18:00", mapAddress: "서울역", userAddress: "서울역 광장" },
//   ];
//   enrichScheduleWithCoords(testSchedule).then(console.log);
//   // 또는 enrichScheduleWithAddress(testSchedule).then(console.log);
// }, []);
import { useEffect, useState, useRef, useCallback } from "react";
import { useMedia } from "../../hooks/useMedia";
import PcCP from "../../components/MapPageCP/PcCP";
// import { Map, MapTypeControl, ZoomControl } from "react-kakao-maps-sdk";
import { MapPageMainStyle } from "./style";
import { useInput } from "../../hooks/useInput";
import axios from "axios";
import { ftDummyListData } from "../../_dummyData/ftDummyListData";
import MobileCP from "../../components/MapPageCP/MobileCP";
import { useLoginCheck } from "../../hooks/useLoginCheck";

const MapPage = () => {
  const isMedia = useMedia("");
  const DEFAULT_CENTER = { lat: 33.450701, lng: 126.570667 };
  const [ftData, setFtData] = useState();
  const mapRef = useRef(null); // 지도 객체를 useRef로 관리
  const mapTypeControlRef = useRef(null); // 지도 타입 컨트롤 객체
  const [filter, onChangeFilter, setFilter] = useInput("");
  const [details, setDetails] = useState([]);
  const [onDetails, setOnDetails] = useState(false);
  const getMapInfo = useCallback(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    const center = map.getCenter();
    DEFAULT_CENTER.lat = center.getLat();
    DEFAULT_CENTER.lng = center.getLng();
  }, []);

  // 로그인 상태 확인
  const isLogin = useLoginCheck();

  // 디버깅용 로그
  console.log("MapPage isLogin:", isLogin);

  const onDeleteLike = useCallback(
    (ftId) => {
      console.log("좋아요: " + isLogin);
      if (!isLogin) return alert("로그인 후 이용해주세요.");

      if (!ftId) {
        console.error("푸드트럭 ID가 없습니다.");
        return;
      }

      axios
        .delete(`${import.meta.env.VITE_API_URL}/map/ft/like?truckId=${ftId}`, { withCredentials: true })
        .then(() => {
          // details.like 값을 false로 변경
          setDetails((prev) => ({ ...prev, like: false }));
        })
        .catch((err) => {
          console.error("취소 실패:", err);
          alert("취소에 실패했습니다.");
        });
    },
    [isLogin]
  );

  const onAddSms = useCallback(
    (ftId, day) => {
      console.log("알림: " + isLogin);
      if (!isLogin) return alert("로그인 후 이용해주세요.");

      if (!ftId || !day) {
        console.error("푸드트럭 ID 또는 요일이 없습니다.");
        return;
      }

      axios.post(`${import.meta.env.VITE_API_URL}/map/ft/sms?truckId=${ftId}&day=${day}`, null, { withCredentials: true }).catch((err) => {
        console.error("알림 등록 실패:", err);
        alert("알림 등록에 실패했습니다.");
      });
    },
    [isLogin]
  );

  const onDeleteSms = useCallback(
    (ftId, day) => {
      console.log("알림 취소: " + isLogin);
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

  const onAddLike = useCallback(
    (ftId) => {
      console.log("좋아요: " + isLogin);
      if (!isLogin) return alert("로그인 후 이용해주세요.");

      if (!ftId) {
        console.error("푸드트럭 ID가 없습니다.");
        return;
      }

      axios
        .post(`${import.meta.env.VITE_API_URL}/map/ft/like?truckId=${ftId}`, null, { withCredentials: true })
        .then(() => {
          // details.like 값을 true로 변경
          setDetails((prev) => ({ ...prev, like: true }));
        })
        .catch((err) => {
          console.error("찜하기 실패:", err);
          alert("찜하기에 실패했습니다.");
        });
    },
    [isLogin]
  );

  // 지도 기반 푸드트럭 조회 API 호출 (명세 준수)
  const onChangeFilterFun = useCallback(() => {
    // 현재 지도 중심 좌표 또는 기본 좌표 사용
    let lat = DEFAULT_CENTER.lat;
    let lng = DEFAULT_CENTER.lng;
    if (mapRef.current && mapRef.current.getCenter) {
      const center = mapRef.current.getCenter();
      lat = center.getLat();
      lng = center.getLng();
    }
    const radiusKm = 2; // 기본 반경 2km
    // filter가 카테고리명일 때만 category 파라미터 추가
    const params = new URLSearchParams({
      lat: lat.toString(),
      lng: lng.toString(),
      radiusKm: radiusKm.toString(),
    });
    if (filter && filter !== "") {
      params.append("category", filter);
    }
    axios
      .get(`${import.meta.env.VITE_API_URL}/map/ft?${params.toString()}`, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          onChangeFtData(res.data);
        } else {
          console.error("No data received from API");
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
    // onChangeFtData(ftDummyListData);
  }, [filter]);

  useEffect(() => {
    onChangeFilterFun();
  }, [mapRef]);

  useEffect(() => {
    onChangeFilterFun();
  }, [filter]);

  // 지도 중심이 바뀔 때마다 getMapInfo 자동 실행
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps || !mapRef.current) return;
    const map = mapRef.current;
    const handleCenterChanged = () => {
      getMapInfo();
    };
    window.kakao.maps.event.addListener(map, "center_changed", handleCenterChanged);
    return () => {
      window.kakao.maps.event.removeListener(map, "center_changed", handleCenterChanged);
    };
  }, [getMapInfo]);

  useEffect(() => {
    // 카카오맵 스크립트가 로드되어 있는지 확인
    if (!window.kakao || !window.kakao.maps) return;
    const container = document.getElementById("map");
    if (!container) return;

    // 지도 객체 생성
    const createMap = (center) => {
      mapRef.current = new window.kakao.maps.Map(container, {
        center,
        level: 3,
      });
      // 지도 타입 컨트롤 생성 및 지도에 추가
      mapTypeControlRef.current = new window.kakao.maps.MapTypeControl();
      mapRef.current.addControl(mapTypeControlRef.current, window.kakao.maps.ControlPosition.TOPRIGHT);
      // 마커 생성 및 가시반경 설정
      if (window.kakao.maps.RoadviewMarker) {
        const marker = new window.kakao.maps.RoadviewMarker({ position: center });
        marker.setRange(100);
        mapRef.current.addOverlay(marker);
      }
      // 지도 생성 후 반드시 지도 중심값으로 데이터 불러오기
      onChangeFilterFun();
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const userCenter = new window.kakao.maps.LatLng(lat, lng);
          createMap(userCenter);

          // 커스텀 마커 이미지 설정
          const imageSrc = "/img/myLocation.png"; // public 폴더 기준 경로
          const imageSize = new window.kakao.maps.Size(30, 43);
          const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
          const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

          // 내 위치 마커 생성 및 지도에 표시
          const marker = new window.kakao.maps.Marker({
            position: userCenter,
            image: markerImage,
            title: "내 위치",
          });
          marker.setMap(mapRef.current);
        },
        () => {
          // 위치 정보 못 가져오면 기본값 사용
          const fallbackCenter = new window.kakao.maps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng);
          createMap(fallbackCenter);
        }
      );
    } else {
      const fallbackCenter = new window.kakao.maps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng);
      createMap(fallbackCenter);
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

    // 오늘의 holiday가 false인 푸드트럭을 후순위로 정렬
    resultArr.sort((a, b) => {
      const todayA = a.schedule.find((sch) => sch.day === dayMap[today]);
      const todayB = b.schedule.find((sch) => sch.day === dayMap[today]);
      // holiday가 false면 후순위
      if (todayA && todayB) {
        if (todayA.holiday === todayB.holiday) return 0;
        if (todayA.holiday) return -1;
        return 1;
      }
      return 0;
    });

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
              onChangeMapGPS({ lat, lng });
              setDetails({
                name: item.name,
                category: item.category,
                intro: item.intro,
                schedule: item.schedule,
                menu: item.menu,
                review: item.review,
                truckId: item.truckId, // 푸드트럭 ID 추가
                like: item.like, // 찜 여부 추가
                imageUrl: item.imageUrl, // 이미지 URL 추가
              });
              setOnDetails(true);
            });
          }
        }
        pending++;
        if (pending === total) {
          // 거리순 정렬(holiday 우선순위는 이미 반영됨)
          const sortedArr = [...resultArr].sort((a, b) => {
            // 둘 다 distance가 있으면 거리순, 아니면 그대로
            if (typeof a.distance === "number" && typeof b.distance === "number") {
              return a.distance - b.distance;
            }
            return 0;
          });
          console.log("Map", sortedArr);
          setFtData(sortedArr);
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
      review: data.review, // 리뷰 목록
      truckId: data.truckId, // 푸드트럭 ID (추가된 부분)
      like: data.like, // 찜 여부 (추가된 부분)
      imageUrl: data.imageUrl, // 이미지 URL (추가된 부분)
    });
    setOnDetails(true); // 상세 정보 창 표시
    onChangeMapGPS({ lat: data.coords.lat, lng: data.coords.lng });
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
          onClickRelay={onClickRelay}
          onDeleteDetails={onDeleteDetails}
          onSetDetails={onSetDetails}
          details={details}
          onDetails={onDetails}
          onDeleteLike={onDeleteLike}
          onAddLike={onAddLike}
          onDeleteSms={onDeleteSms}
          onAddSms={onAddSms}
          isLogin={isLogin}
        />
      )}
      {isMedia.isMobile && (
        <MobileCP
          currentLocationButton={currentLocationButton}
          filter={filter}
          onChangeFilter={onChangeFilter}
          categoryList={categoryList}
          ftData={ftData}
          onClickRelay={onClickRelay}
          onDeleteDetails={onDeleteDetails}
          onSetDetails={onSetDetails}
          details={details}
          onDetails={onDetails}
          onDeleteLike={onDeleteLike}
          onAddLike={onAddLike}
          onDeleteSms={onDeleteSms}
          onAddSms={onAddSms}
          isLogin={isLogin}
        />
      )}
      {/* 지도 */}
      {isMedia.isPc && <div id="map" style={{ position: "absolute", right: "0px", width: "calc(100vw - min(26vw, 460px))", height: "100vh" }}></div>}
      {isMedia.isMobile && <div id="map" style={{ position: "absolute", right: "0px", width: "100vw", height: "100vh" }}></div>}
    </MapPageMainStyle>
  );
};
export default MapPage;
