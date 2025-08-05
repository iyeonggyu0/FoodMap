import { useEffect, useState } from "react";

/**
 * 주소를 받아 좌표(LatLng)를 반환하는 Hook
 * @param {string} address - 검색할 주소
 * @returns {object|null} gps - 변환된 좌표(LatLng) 또는 null
 */
const useChangeAddress = (address) => {
  const [gps, setGps] = useState(null);

  useEffect(() => {
    if (!address) return;

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        setGps(coords);
      } else {
        setGps(null);
      }
    });
  }, [address]);

  return gps;
};

export default useChangeAddress;
