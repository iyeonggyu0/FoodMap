import { useEffect, useState } from "react";
import { useMedia } from "../../../hooks/useMedia";
import { MyReviewCPMainStyle } from "./style";
import axios from "axios";
import { reviewDummyData } from "../../../_dummyData/reviewDummyData";
import TextAreaInputCP from "../../_common/TextAreaInputCP";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPen, faPlus, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useInput } from "../../../hooks/useInput";
import ButtonCP from "../../_common/ButtonCP";
import OutLineButtonCP from "../../_common/OutLineButtonCP";

const MyReviewCPDiv = ({ rv }) => {
  const [content, onChangeContent, setContent] = useInput(rv.content);
  const [rating, setRating] = useState(Number(rv.rating));

  const [upDateMode, setUpdateMode] = useState(false);

  function formatDate(isoString) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}. ${month}. ${day}`;
  }

  const formatted = formatDate(rv.createdAt); // "2024. 06. 10"

  const onUpdateReview = () => {
    if (!content.trim()) {
      return alert("리뷰 내용을 입력해주세요.");
    }
    if (content === rv.content) {
      return alert("변경된 내용이 없습니다.");
    }

    axios
      .put(`${import.meta.env.VITE_API_URL}/review`, { id: rv.id, content, rating })
      .then((res) => {
        if (res.data.success) {
          alert("리뷰가 수정되었습니다.");
          setUpdateMode(false);
          setContent(res.data.review.content);
          setRating(res.data.review.rating);
        } else {
          alert("리뷰 수정에 실패했습니다. 다시 시도해주세요.");
        }
      })
      .catch((err) => {
        console.error("리뷰 수정 중 오류 발생:", err);
        alert("리뷰 수정에 실패했습니다. 다시 시도해주세요.");
      });
  };

  const onDeleteReview = () => {
    if (window.confirm("리뷰를 삭제하시겠습니까?")) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/review/${rv.id}`)
        .then((res) => {
          if (res.data.success) {
            alert("리뷰가 삭제되었습니다.");
            window.location.reload(); // 페이지 새로고침
          } else {
            alert("리뷰 삭제에 실패했습니다. 다시 시도해주세요.");
          }
        })
        .catch((err) => {
          console.error("리뷰 삭제 중 오류 발생:", err);
          alert("리뷰 삭제에 실패했습니다. 다시 시도해주세요.");
        });
    }
  };

  return (
    <div className="reviewItem flexCol" style={{ marginBottom: "3rem", padding: "2rem", border: "1px solid var(--gray-3)", borderRadius: "16px", gap: "1rem" }}>
      <p className="flexBetween">
        <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>{rv.ftData.name}</span>
        <span>
          {upDateMode && (
            <FontAwesomeIcon
              icon={faMinus}
              style={{ marginRight: "1rem", cursor: "pointer" }}
              onClick={() => {
                const changeData = rating - 0.5;
                if (changeData > 0) {
                  setRating(changeData);
                }
              }}
            />
          )}
          <span style={{ display: "inline-block", width: "5rem", textAlign: "center" }}>
            <FontAwesomeIcon icon={faStar} style={{ paddingRight: "0.5rem", color: "orange" }} />
            {rating || rv.rating}
          </span>
          {upDateMode && (
            <FontAwesomeIcon
              icon={faPlus}
              style={{ marginLeft: "1rem", cursor: "pointer" }}
              onClick={() => {
                const changeData = rating + 0.5;
                if (changeData < 5) {
                  setRating(changeData);
                }
              }}
            />
          )}
        </span>
      </p>
      <div style={{ fontFamily: "Noto Sans KR", fontSize: "0.9rem", color: "var(--gray-6)" }}>
        <TextAreaInputCP title="" value={content} onChangeHandler={onChangeContent} essential={false} maxRows={5} minRows={2} lock={!upDateMode} />
      </div>
      <p className="flexBetween">
        <span style={{ fontSize: "0.9rem", color: "gray" }}>{formatted}</span>
        {!upDateMode && (
          <span>
            <FontAwesomeIcon icon={faPen} style={{ marginRight: "1rem", cursor: "pointer" }} onClick={() => setUpdateMode(true)} />
            <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer", color: "var(--red)" }} onClick={onDeleteReview} />
          </span>
        )}
        {upDateMode && (
          <span className="flexBetween" style={{ gap: "1rem" }}>
            <span
              onClick={() => {
                setContent(rv.content);
                setRating(rv.rating);
                setUpdateMode(false);
              }}>
              <OutLineButtonCP color={"#A47764"} borderColor={"--brown-light"}>
                취소
              </OutLineButtonCP>
            </span>
            <span onClick={onUpdateReview}>
              <ButtonCP>저장</ButtonCP>
            </span>
          </span>
        )}
      </p>
    </div>
  );
};

const MyReviewCP = () => {
  const isPc = useMedia().isPc;

  const [reviewList, setReviewList] = useState([]); // 리뷰 목록 상태

  useEffect(() => {
    // axios.get(`${import.meta.env.VITE_API_URL}/user/review`)
    //   .then((res) => {
    //     if (res.data.success) {
    //       // 리뷰 목록을 상태에 저장
    //       setReviewList(res.data.reviews);
    //     } else {
    //       console.error("리뷰 목록 로드 실패:", res.data.message);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error("리뷰 목록 로드 중 오류 발생:", err);
    //     alert("리뷰 목록을 불러오는 데 실패했습니다.");
    //   });
    //FIXME:
    setReviewList(reviewDummyData); // 초기화 (임시)
  }, []);

  return (
    <MyReviewCPMainStyle isPc={isPc}>
      <h2>내 리뷰</h2>
      <div>{reviewList.length === 0 ? <p>작성한 리뷰가 없습니다.</p> : reviewList.map((review) => <MyReviewCPDiv key={review.id} rv={review} />)}</div>
    </MyReviewCPMainStyle>
  );
};
export default MyReviewCP;
