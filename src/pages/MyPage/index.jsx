import { useEffect, useState } from "react";
import { MyPageMainStyle } from "./style";
import axios from "axios";
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

  // 찜/알림, 내 트럭 상태 추가
  const [likeList, setLikeList] = useState([]);
  const [smsList, setSmsList] = useState([]);
  const [myTruckList, setMyTruckList] = useState([]);

  useEffect(() => {
    // 1. 내 정보
    axios
      .get(`${import.meta.env.VITE_API_URL}/me`, { withCredentials: true })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.error("사용자 정보 로드 중 오류 발생:", err);
        alert("사용자 정보를 불러오는 데 실패했습니다.");
      });

    // 2. 찜/알림 목록
    axios
      .get(`${import.meta.env.VITE_API_URL}/map/ft/mine`, {
        withCredentials: true,
      })
      .then((res) => {
        setLikeList(res.data.likes || []);
        setSmsList(res.data.sms || []);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("찜/알림 목록 로드 중 오류 발생:", err);
      });

    // 3. 내 푸드트럭 목록
    axios
      .get(`${import.meta.env.VITE_API_URL}/user/foodtruck/mine`, {
        withCredentials: true,
      })
      .then((res) => {
        setMyTruckList(res.data || []);
      })
      .catch((err) => {
        console.error("내 푸드트럭 목록 로드 중 오류 발생:", err);
      });

    if (isPc) {
      setOnMenu(true);
    }

    setPaging(Number(localStorage.getItem("mypage-paging")) || 0); // 기본값 0 (내 정보)
  }, []);

  useEffect(() => {
    localStorage.setItem("mypage-paging", paging);
  }, [paging]);

  const onLogoutClick = () => {
    // 로그아웃 API 호출
    axios
      .post(`${import.meta.env.VITE_API_URL}/logout`, null, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
          setUserData({});
          window.location.href = "/";
        } else {
          alert("로그아웃되었습니다.");
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
          {!isPc && !onMenu && (
            <FontAwesomeIcon
              icon={faBars}
              className="menuBars"
              onClick={() => setOnMenu(true)}
            />
          )}

          <section className="menu flexCol">
            {!isPc && (
              <FontAwesomeIcon
                icon={faXmark}
                className="menuXmark"
                onClick={() => setOnMenu(false)}
              />
            )}
            {isPc && (
              <div className="flexCenter image">
                {paging === 0 && (
                  <FontAwesomeIcon icon={faUser} className="icon" />
                )}
                {paging === 1 && (
                  <div className="ftIcon">{/* 푸드트럭 아이콘 */}</div>
                )}
                {paging === 2 && (
                  <FontAwesomeIcon icon={faBell} className="icon" />
                )}
                {paging === 3 && (
                  <FontAwesomeIcon icon={faStar} className="icon" />
                )}
              </div>
            )}
            <ul>
              <li
                style={{ fontWeight: paging === 0 ? "600" : "500" }}
                onClick={() => {
                  setPaging(0);
                  setOnMenu(false);
                }}
              >
                내 정보
              </li>
              <div className="margin" />
              <li
                style={{ fontWeight: paging === 1 ? "600" : "500" }}
                onClick={() => {
                  setPaging(1);
                  setOnMenu(false);
                }}
              >
                내 푸드트럭
              </li>
              <div className="margin" />
              <li
                style={{ fontWeight: paging === 2 ? "600" : "500" }}
                onClick={() => {
                  setPaging(2);
                  setOnMenu(false);
                }}
              >
                알림/찜 목록
              </li>
              <div className="margin" />
              <li
                style={{ fontWeight: paging === 3 ? "600" : "500" }}
                onClick={() => {
                  setPaging(3);
                  setOnMenu(false);
                }}
              >
                리뷰 목록
              </li>
              <li
                className="homeButton"
                onClick={() => {
                  window.location.href = "/"; // 홈으로 이동
                }}
              >
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
            {paging === 1 && <MyFTCP myTruckList={myTruckList} />}
            {paging === 2 && <MyLikeCP likeList={likeList} smsList={smsList} />}
            {paging === 3 && <MyReviewCP />}
          </section>
        </MyPageMainStyle>
      )}
    </section>
  );
};
export default MyPage;
