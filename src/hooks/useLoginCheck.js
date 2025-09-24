import { useEffect, useState } from "react";
import axios from "axios";

/**
 * 로그인 상태를 비동기로 확인하는 커스텀 훅
 * @returns {boolean} 로그인 여부 반환
 */
export function useLoginCheck({ isRoleCheck = false }) {
  const [isLoginCheck, setIsLoginCheck] = useState(false);

  // 상태 변경 감지용 useEffect
  useEffect(() => {
    console.log("useLoginCheck - isLoginCheck 상태 변경됨:", isLoginCheck);
  }, [isLoginCheck]);

  useEffect(() => {
    let isMounted = true;
    const checkLogin = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/login/check`, { withCredentials: true });
        // FIXME:
        console.log("로그인 상태 확인 응답:", res);
        console.log("res.data.loggedIn:", res.data.loggedIn);

        if (isRoleCheck) {
          if (res.data.role) {
            return res.data.role;
          }
        }

        if (isMounted) {
          setIsLoginCheck(!!res.data.loggedIn);
          console.log("setIsLoginCheck 호출됨:", !!res.data.loggedIn);
        }
      } catch (err) {
        if (isMounted) setIsLoginCheck(false);
        console.error("로그인 상태 확인 실패:", err);
      }
    };
    checkLogin();
    return () => {
      isMounted = false;
    };
  }, []);

  return isLoginCheck;
}
