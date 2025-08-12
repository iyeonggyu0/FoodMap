import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonCP from "../../components/_common/ButtonCP";
import { useNavigate } from "react-router-dom";

const Error404Page = () => {
  const nav = useNavigate();
  return (
    <section className="flexCenter" style={{ height: "100vh", width: "100vw" }}>
      <div className="flexCol" style={{ alignItems: "center", gap: "1rem" }}>
        <FontAwesomeIcon icon={faBan} style={{ fontSize: "6rem", color: "rgb(238, 81, 81)" }} />
        <h1 style={{ fontSize: "3rem", fontWeight: "700" }}>404 ERROR</h1>
        <h3 style={{ fontSize: "1rem", color: "gray" }}>존재하지 않는 페이지 입니다.</h3>
        <div onClick={() => nav("/")}>
          <ButtonCP>메인화면</ButtonCP>
        </div>
      </div>
    </section>
  );
};
export default Error404Page;
