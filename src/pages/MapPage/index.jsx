import { useEffect, useState } from "react";
import { useMedia } from "../../hooks/useMedia";
import PcCP from "../../components/MapPageCP/PcCP";
import { Map, MapTypeControl, ZoomControl } from "react-kakao-maps-sdk";
import { MapPageMainStyle } from "./style";

const MapPage = () => {
  const isMedia = useMedia("");
  const DEFAULT_CENTER = { lat: 33.450701, lng: 126.570667 };
  const [state, setState] = useState({
    center: DEFAULT_CENTER,
    isPanto: true,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState({
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isPanto: true,
          });
        },
        () => {
          // 위치 정보 사용 불가 시 기본값 유지
        }
      );
    }
  }, []);

  const currentLocationButton = () => {
    setState({
      center: DEFAULT_CENTER,
      isPanto: true,
    });
    console.log("실행");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState({
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isPanto: true,
          });
        },
        (error) => {
          console.error("위치 정보 에러:", error);
        }
      );
    }
  };

  useEffect(() => {
    console.log("지도 중심 변경됨:", state.center);
  }, [state.center]);

  return (
    <MapPageMainStyle>
      {isMedia.isPc && <PcCP currentLocationButton={currentLocationButton} />}
      {isMedia.isMobile && <div>isMobile View</div>}
      <Map center={state.center} isPanto={state.isPanto} id="map" style={{ width: "100%", height: "100vh" }} level={3}>
        <MapTypeControl />
        <ZoomControl />
      </Map>
    </MapPageMainStyle>
  );
};
export default MapPage;
