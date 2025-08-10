import { useCallback, useEffect, useState } from "react";
import { useInput } from "../../../../hooks/useInput";
import { PcReviewCPMainStyle } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid, faStarHalf, faPlus, faMinus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import TextAreaInputCP from "../../../_common/TextAreaInputCP";
import ButtonCP from "../../../_common/ButtonCP";
import axios from "axios";
import { useMedia } from "../../../../hooks/useMedia";

const PcReviewCP = ({ isLogin, offReviewClick, details }) => {
  const [reviewText, onChangeReviewText, setReviewText] = useInput(""); // 리뷰 내용
  const [rating, setRating] = useState(5); // 기본 평점 5점

  useEffect(() => {
    setReviewText(""); // 리뷰 작성 후 입력창 초기화
    setRating(5); // 평점 초기화
  }, [details]);

  // 0.5 단위로 별점 증가
  const onIncreaseRating = () => {
    setRating((prev) => (prev < 5 ? +(prev + 0.5).toFixed(1) : 5));
  };
  // 0.5 단위로 별점 감소
  const onDecreaseRating = () => {
    setRating((prev) => (prev > 0.5 ? +(prev - 0.5).toFixed(1) : 0.5));
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FontAwesomeIcon icon={faStarSolid} key={i} className="starIcon" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FontAwesomeIcon icon={faStarHalf} key={i} className="starIcon" />);
    } else {
      stars.push(<FontAwesomeIcon icon={faStar} className="starIcon" key={i} style={{ visibility: "hidden" }} />);
    }
  }

  const onPostReview = useCallback(() => {
    if (!isLogin) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!reviewText.trim()) {
      return alert("리뷰 내용을 입력해주세요.");
    }

    axios
      .post(`${import.meta.env.VITE_API_URL}/review`, {
        content: reviewText,
        rating: rating,
        ftId: details.id,
      })
      .catch((err) => {
        console.error("리뷰 작성 중 오류 발생:", err);
        alert("리뷰 작성에 실패했습니다. 다시 시도해주세요.");
      });
  }, [reviewText, rating]);

  const isPc = useMedia().isPc;

  return (
    <PcReviewCPMainStyle
      className="flexCenter"
      style={{
        width: isPc ? "20vw" : "100vw",
        maxWidth: isPc ? "360px" : "unset",
        left: isPc ? "calc(100vw - min(20vw, 360px))" : "0",
      }}>
      <span style={{ position: "absolute", top: "1rem", right: "1rem" }}>
        <FontAwesomeIcon icon={faXmark} onClick={offReviewClick} className="closeIcon" />
      </span>
      <span style={{ position: "absolute", bottom: "1rem", right: "1rem", fontSize: "0.7rem", color: "gray" }}>수정 및 삭제는 마이페이지에서 가능합니다</span>
      <div className="flexBetweenCol">
        <div>
          <p>
            <span>'{details.name}'</span>에
          </p>
          <p>리뷰를 작성합니다</p>
        </div>
        <div className="flexBetween flexHeightCenter starDiv">
          <span className="starControllerIcon" onClick={onDecreaseRating} style={{ cursor: "pointer" }}>
            <FontAwesomeIcon icon={faMinus} />
          </span>
          <span className="starSpan">{stars}</span>
          <span className="starControllerIcon" onClick={onIncreaseRating} style={{ cursor: "pointer" }}>
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </div>
        <div className="textAreaDiv">
          <TextAreaInputCP title="" essential={false} onChangeHandler={onChangeReviewText} value={reviewText} maxRows={5} minRows={2} />
        </div>
        <div onClick={onPostReview}>
          <ButtonCP>작성</ButtonCP>
        </div>
      </div>
    </PcReviewCPMainStyle>
  );
};
export default PcReviewCP;
