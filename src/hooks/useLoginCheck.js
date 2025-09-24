import { useEffect, useState } from "react";
import axios from "axios";

/**
 * 로그인 상태를 비동기로 확인하는 커스텀 훅
 * @returns {boolean} 로그인 여부 반환
 */
export function useLoginCheck({ isRoleCheck = false } = {}) {
  const [state, setState] = useState({ isLogin: false, role: null });

  useEffect(() => {
    console.log("useLoginCheck - 상태 변경됨:", state);
  }, [state]);

  useEffect(() => {
    let isMounted = true;
    const checkLogin = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/login/check`, { withCredentials: true });
        // FIXME:
        console.log("로그인 상태 확인 응답:", res);
        console.log("res.data.loggedIn:", res.data.loggedIn);
        if (isMounted) {
          setState({ isLogin: !!res.data.loggedIn, role: res.data.role || null });
          console.log("setState 호출됨:", { isLogin: !!res.data.loggedIn, role: res.data.role || null });
        }
      } catch (err) {
        if (isMounted) setState({ isLogin: false, role: null });
        console.error("로그인 상태 확인 실패:", err);
      }
    };
    checkLogin();
    return () => {
      isMounted = false;
    };
  }, []);

  return isRoleCheck ? state.role : state.isLogin;
}
