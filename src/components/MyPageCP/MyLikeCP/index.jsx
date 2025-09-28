import { useMedia } from "../../../hooks/useMedia";
import { MyLikeCPMainStyle } from "./style";
import { useCallback } from "react";
import axios from "axios";
import { useLoginCheck } from "../../../hooks/useLoginCheck";
import MyLikeLiCP from "./MyLikeLiCP";

// likeList, smsList를 props로 받음
const MyLikeCP = ({ likeList = [] }) => {
  const isLogin = useLoginCheck();
  const isPc = useMedia().isPc;

  // 좋아요 삭제
  const onDeleteLike = useCallback(
    (ftId) => {
      if (!isLogin) return alert("로그인 후 이용해주세요.");
      if (!ftId) {
        console.error("푸드트럭 ID가 없습니다.");
        return;
      }
      axios
        .delete(`${import.meta.env.VITE_API_URL}/map/ft/like?truckId=${ftId}`, { withCredentials: true })
        .then((res) => {
          if (res.status === 200) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.error("취소 실패:", err);
          alert("취소에 실패했습니다.");
        });
    },
    [isLogin]
  );

  // 알림 추가
  const onAddSms = useCallback(
    (ftId, day) => {
      if (!isLogin) return alert("로그인 후 이용해주세요.");
      if (!ftId || !day) {
        console.error("푸드트럭 ID 또는 요일이 없습니다.");
        return;
      }
      axios
        .post(`${import.meta.env.VITE_API_URL}/map/ft/sms?truckId=${ftId}&day=${day}`, null, { withCredentials: true })
        .then((res) => {
          if (res.status === 200) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.error("알림 등록 실패:", err);
          alert("알림 등록에 실패했습니다.");
        });
    },
    [isLogin]
  );

  // 알림 삭제
  const onDeleteSms = useCallback(
    (ftId, day) => {
      if (!isLogin) return alert("로그인 후 이용해주세요.");
      if (!ftId || !day) {
        console.error("푸드트럭 ID 또는 요일이 없습니다.");
        return;
      }
      axios
        .delete(`${import.meta.env.VITE_API_URL}/map/ft/sms?truckId=${ftId}&day=${day}`, { withCredentials: true })
        .then((res) => {
          if (res.status === 200) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.error("알림 취소 실패:", err);
          alert("알림 취소에 실패했습니다.");
        });
    },
    [isLogin]
  );

  console.log(likeList);

  return (
    <MyLikeCPMainStyle isPc={isPc}>
      <h2>알림/찜 목록</h2>
      <ul>
        {likeList && likeList.length > 0 ? (
          likeList.map((ft, index) => {
            return <MyLikeLiCP key={index} ftId={ft.truckId} onDeleteLike={onDeleteLike} onDeleteSms={onDeleteSms} onAddSms={onAddSms} />;
          })
        ) : (
          <li>찜한 푸드트럭이 없습니다.</li>
        )}
      </ul>
    </MyLikeCPMainStyle>
  );
};
export default MyLikeCP;
