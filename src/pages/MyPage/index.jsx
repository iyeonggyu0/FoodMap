import { useEffect, useState } from "react";
import { MyPageMainStyle } from "./style";
import axios from "axios";
import { userDummyData } from "../../_dummyData/userDummyData";
import Error404Page from "../Error404Page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faStar, faUser } from "@fortawesome/free-regular-svg-icons";
import { useMedia } from "../../hooks/useMedia";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import MyPageInfoCP from "../../components/MyPageCP/MyPageInfoCP";
import MyFTCP from "../../components/MyPageCP/MyFTCP";
import MyLikeCP from "../../components/MyPageCP/MyLikeCP";
import MyReviewCP from "../../components/MyPageCP/MyReviewCP";

const MyPage = () => {
  const [userData, setUserData] = useState({});
  const [paging, setPaging] = useState(0);
  const [onMenu, setOnMenu] = useState(false);
  const isPc = useMedia().isPc;

  useEffect(() => {
    // 사용자 정보를 불러오는 API 호출
    // FIXME:
    // axios
    //   .get(`${import.meta.env.VITE_API_URL}/user/info`)
    //   .then((res) => {
    //     if (res.data.success) {
    //       setUserData(res.data.user);
    //     } else {
    //       console.error("사용자 정보 로드 실패:", res.data.message);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error("사용자 정보 로드 중 오류 발생:", err);
    //     alert("사용자 정보를 불러오는 데 실패했습니다.");
    //   });
    // FIXME:
    setUserData(userDummyData);

    if (isPc) {
      setOnMenu(true);
    }
  }, []);

  const onLogoutClick = () => {
    // 로그아웃 API 호출
    axios
      .post(`${import.meta.env.VITE_API_URL}/user/logout`)
      .then((res) => {
        if (res.data.success) {
          alert("로그아웃 되었습니다.");
          setUserData({});
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.error("로그아웃 중 오류 발생:", err);
        alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <section>
      {!userData && <Error404Page />}
      {userData && (
        <MyPageMainStyle isPc={isPc} onMenu={onMenu}>
          {!isPc && !onMenu && <FontAwesomeIcon icon={faBars} className="menuBars" onClick={() => setOnMenu(true)} />}

          <section className="menu flexCol">
            {!isPc && <FontAwesomeIcon icon={faXmark} className="menuXmark" onClick={() => setOnMenu(false)} />}
            {isPc && (
              <div className="flexCenter image">
                {paging === 0 && <FontAwesomeIcon icon={faUser} className="icon" />}
                {paging === 1 && <div className="ftIcon">{/* 푸드트럭 아이콘 */}</div>}
                {paging === 2 && <FontAwesomeIcon icon={faBell} className="icon" />}
                {paging === 3 && <FontAwesomeIcon icon={faStar} className="icon" />}
              </div>
            )}
            <ul>
              <li
                style={{ fontWeight: paging === 0 ? "600" : "500" }}
                onClick={() => {
                  setPaging(0);
                  setOnMenu(false);
                }}>
                내 정보
              </li>
              <div className="margin" />
              <li
                style={{ fontWeight: paging === 1 ? "600" : "500" }}
                onClick={() => {
                  setPaging(1);
                  setOnMenu(false);
                }}>
                내 푸드트럭
              </li>
              <div className="margin" />
              <li
                style={{ fontWeight: paging === 2 ? "600" : "500" }}
                onClick={() => {
                  setPaging(2);
                  setOnMenu(false);
                }}>
                알림/찜 목록
              </li>
              <div className="margin" />
              <li
                style={{ fontWeight: paging === 3 ? "600" : "500" }}
                onClick={() => {
                  setPaging(3);
                  setOnMenu(false);
                }}>
                리뷰 목록
              </li>
              <li
                className="homeButton"
                onClick={() => {
                  window.location.href = "/"; // 홈으로 이동
                }}>
                HOME
              </li>
              {/* 로그아웃 */}
              <li className="logoutButton" onClick={onLogoutClick}>
                로그아웃
              </li>
            </ul>
          </section>
          <section className="mainSection">
            {paging === 0 && <MyPageInfoCP userData={userData} />}
            {paging === 1 && <MyFTCP />}
            {paging === 2 && <MyLikeCP />}
            {paging === 3 && <MyReviewCP />}
          </section>
        </MyPageMainStyle>
      )}
    </section>
  );
};
export default MyPage;
