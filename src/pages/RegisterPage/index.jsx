import { useCallback, useState, useRef } from "react";
import DaumPostcode from "react-daum-postcode";
import InputCP from "../../components/_common/InputCP";
import SelectInputCP from "../../components/_common/SelectInputCP";
import TextAreaInputCP from "../../components/_common/TextAreaInputCP";
import { useInput } from "../../hooks/useInput";
import MainLayOut from "../../layout/MainLayout";
import { RegisterPageMainStyle, RegisterPageMenuStyle, RegisterPageScheduleStyle } from "./style";
import ButtonCP from "../../components/_common/ButtonCP";
import OutLineButtonCP from "../../components/_common/OutLineButtonCP";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faPen } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { encrypt } from "../../util/crypto";

const RegisterPage = () => {
  // 주소찾기 모달 상태 및 선택된 요일 인덱스
  const [modalState, setModalState] = useState(false);
  const [selectedScheduleIdx, setSelectedScheduleIdx] = useState(null);
  // 에러 span refs
  const nameErrorRef = useRef();
  const categoryErrorRef = useRef();
  const introErrorRef = useRef();
  const menuErrorRef = useRef();
  const operatorNumErrorRef = useRef();
  const termsErrorRef = useRef();
  // 요일별 에러는 동적으로 관리
  const [scheduleErrors, setScheduleErrors] = useState(Array(7).fill({ open: false, close: false, address: false }));
  // 등록 신청 함수
  const registerSubmitHandler = (e) => {
    e.preventDefault();
    let error = false;
    let errorMsgs = [];
    // 1. 푸드트럭 이름 2글자 이상
    if (!FTName || FTName.length < 2) {
      nameErrorRef.current.style.visibility = "visible";
      errorMsgs.push("푸드트럭 이름은 2글자 이상 입력해야 합니다.");
      error = true;
    } else {
      nameErrorRef.current.style.visibility = "hidden";
    }
    // 2. 카테고리 선택
    if (!FTCategory) {
      categoryErrorRef.current.style.visibility = "visible";
      errorMsgs.push("카테고리를 선택하세요.");
      error = true;
    } else {
      categoryErrorRef.current.style.visibility = "hidden";
    }
    // 3. 소개 20자 이상
    if (!FTIntro || FTIntro.length < 20) {
      introErrorRef.current.style.visibility = "visible";
      errorMsgs.push("푸드트럭 소개는 20자 이상 입력해야 합니다.");
      error = true;
    } else {
      introErrorRef.current.style.visibility = "hidden";
    }
    // 6. 메뉴 1개 이상
    if (!menuList || menuList.length === 0) {
      menuErrorRef.current.style.visibility = "visible";
      errorMsgs.push("메뉴를 하나 이상 등록하세요.");
      error = true;
    } else {
      menuErrorRef.current.style.visibility = "hidden";
    }
    // 7. 요일 중 하나라도 영업 체크, 체크된 요일의 데이터 검사
    let hasOpenDay = false;
    let newScheduleErrors = scheduleErrors.map(() => ({ open: false, close: false, address: false }));
    scheduleList.forEach((item, idx) => {
      if (item.holiday) {
        hasOpenDay = true;
        // 7-1. 오픈/클로즈 숫자 두자리
        if (!/^\d{2}$/.test(item.start)) {
          newScheduleErrors[idx].open = true;
          errorMsgs.push(`${item.day}요일 오픈 시간은 두자리 숫자여야 합니다.`);
          error = true;
        }
        if (!/^\d{2}$/.test(item.end)) {
          newScheduleErrors[idx].close = true;
          errorMsgs.push(`${item.day}요일 클로징 시간은 두자리 숫자여야 합니다.`);
          error = true;
        }
        // 7-2. 클로징 >= 오픈
        if (/^\d{2}$/.test(item.start) && /^\d{2}$/.test(item.end) && Number(item.end) < Number(item.start)) {
          newScheduleErrors[idx].close = true;
          errorMsgs.push(`${item.day}요일 클로징 시간은 오픈 시간보다 빠를 수 없습니다.`);
          error = true;
        }
        // 7-3. 주소 10자 이상
        if (!item.mapAddress || item.mapAddress.length < 10 || !item.userAddress || item.userAddress.length < 10) {
          newScheduleErrors[idx].address = true;
          errorMsgs.push(`${item.day}요일 주소는 10자 이상 입력해야 합니다.`);
          error = true;
        }
      }
    });
    setScheduleErrors(newScheduleErrors);
    if (!hasOpenDay) {
      errorMsgs.push("요일 중 하나 이상 영업 체크가 필요합니다.");
      error = true;
    }
    // 8. 사업자 등록번호
    const operatorNum = document.querySelector('input[placeholder="000-00-00000"]')?.value || "";
    if (!/^\d{3}-\d{2}-\d{5}$/.test(operatorNum)) {
      operatorNumErrorRef.current.style.visibility = "visible";
      errorMsgs.push("사업자 등록번호는 000-00-00000 형식이어야 합니다.");
      error = true;
    } else {
      operatorNumErrorRef.current.style.visibility = "hidden";
    }
    // 9. 약관 동의
    const termsChecked = document.getElementById("terms")?.checked;
    if (!termsChecked) {
      termsErrorRef.current.style.visibility = "visible";
      errorMsgs.push("약관에 동의해야 합니다.");
      error = true;
    } else {
      termsErrorRef.current.style.visibility = "hidden";
    }
    if (error) {
      alert("입력값에 문제가 있습니다.");
      return;
    }
    alert("등록 신청이 완료되었습니다!");

    // FIXME: 로그인 세션 확인하기

    // FIXME: api 주소 확인하기
    axios
      .post(
        `${import.meta.env.VITE_API_URL}`,
        encrypt({
          // 푸드트럭 이름
          name: FTName,
          // 푸드트럭 카테고리
          category: FTCategory,
          // 푸드트럭 카테고리
          intro: FTIntro,
          // 메뉴 리스트 (요일, 시간, 주소)
          menu: menuList,
          // 영업 일정
          schedule: scheduleList,
          // 사업자 등록번호
          operatorNum: operatorNum,
        })
      )
      .then((res) => {
        if (res.data.success) {
          alert("푸드트럭 등록이 완료되었습니다!");
          // 입력값 초기화
          setFTName("");
          setFTCategory("");
          setFTIntro("");
          setMenuList([]);
          setScheduleList(
            dayNames.map((day) => ({
              day,
              holiday: false,
              start: "",
              end: "",
              mapAddress: "",
              userAddress: "",
            }))
          );
          setMenuName("");
          setMenuPrice("");
          setMenuInfo("");
          setMenuNum("");
          setMenuModify(false);
          setEditMenuNum("");
          setMenuList([]);
          setMenuName("");
          setMenuPrice("");
          setMenuInfo("");
          setMenuNum("");
        } else {
          alert("푸드트럭 등록에 실패했습니다. 다시 시도해주세요.");
        }
      })
      .catch((err) => {
        console.error("푸드트럭 등록 중 오류 발생:", err);
        alert("푸드트럭 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

  // 푸드트럭 이름
  const [FTName, onChangeFTName, setFTName] = useInput("");
  // 푸드트럭 카테고리
  const [FTCategory, onChangeFTCategory, setFTCategory] = useInput("");

  // 푸드트럭 카테고리 리스트
  const FTCategoryList = [
    { value: "분식", data: "분식 (어묵, 떡볶이, 순대)" },
    { value: "간식", data: "간식 (붕어빵, 타코야끼, 크레페, 츄러스, 와플)" },
    { value: "튀김", data: "튀김 (감자튀김, 치즈볼, 오징어튀김, 새우튀김, 치킨)" },
    { value: "꼬치", data: "꼬치 (닭꼬치, 소시지꼬치)" },
    { value: "샌드위치/토스트", data: "샌드위치/토스트 (샌드위치, 토스트, 버거)" },
    { value: "디저트/음료", data: "디저트/음료 (아이스크림, 커피, 음료, 팥빙수)" },
    { value: "식사", data: "식사 (덮밥, 초밥)" },
    { value: "기타", data: "기타" },
  ];

  // 푸드트럭 소개
  const [FTIntro, onChangeFTIntro, setFTIntro] = useInput("");

  const [menuList, setMenuList] = useState([]);

  const [menuModify, setMenuModify] = useState(false);
  const [editMenuNum, setEditMenuNum] = useState(""); // 수정 중인 메뉴 번호

  const [menuName, onChangeMenuName, setMenuName] = useInput("");
  const [menuPrice, onChangeMenuPrice, setMenuPrice] = useInput("");
  const [menuInfo, onChangeMenuInfo, setMenuInfo] = useInput("");
  const [menuNum, onChangeMenuNum, setMenuNum] = useInput("");

  /**
   * 메뉴 등록 함수
   * - menuName: 3글자 이상
   * - menuPrice: 숫자가 아닌 문자가 포함되면 등록 불가, 빈 값도 등록 불가
   * - menuInfo: 조건 없음
   * - menuNum: 이미 menuList에 존재하면 등록 불가
   * 에러 발생 시 alert로 안내
   */
  // 메뉴 등록 함수
  const menuAddHandler = useCallback(() => {
    console.log("시도");
    // menuName 3글자 이상 체크
    if (!menuName || menuName.length < 3) {
      alert("메뉴 이름은 3글자 이상 입력해야 합니다.");
      return;
    }
    // menuPrice 숫자만 허용, 1 이상
    if (!menuPrice || !/^[0-9]+$/.test(menuPrice) || Number(menuPrice) < 1) {
      alert("가격은 1 이상의 숫자만 입력해야 합니다.");
      return;
    }
    // menuNum 중복 체크
    if (menuList.some((menu) => menu.num === menuNum)) {
      alert("이미 해당 번호에 메뉴가 존재합니다.");
      return;
    }

    // 메뉴 정보 객체 생성
    const newMenu = {
      name: menuName,
      price: menuPrice,
      info: menuInfo,
      num: menuNum,
    };
    // menuList에 추가
    setMenuList((prev) => [...prev, newMenu]);
    alert("메뉴가 등록되었습니다!");
    // 입력값 초기화
    setMenuName("");
    setMenuPrice("");
    setMenuInfo("");
    setMenuNum("");
  }, [menuName, menuPrice, menuInfo, menuNum, menuList, setMenuName, setMenuPrice, setMenuInfo, setMenuNum]);

  /**
   * 메뉴 수정 함수
   * - 수정 버튼 클릭 시 menuList에서 해당 메뉴 정보 업데이트
   */
  const menuEditHandler = useCallback(() => {
    if (!editMenuNum) return;
    // menuName 3글자 이상 체크
    if (!menuName || menuName.length < 3) {
      alert("메뉴 이름은 3글자 이상 입력해야 합니다.");
      return;
    }
    // menuPrice 숫자만 허용, 1 이상
    if (!menuPrice || !/^[0-9]+$/.test(menuPrice) || Number(menuPrice) < 1) {
      alert("가격은 1 이상의 숫자만 입력해야 합니다.");
      return;
    }
    // menuNum 중복 체크 (수정 중인 메뉴 제외)
    if (menuList.some((menu) => menu.num === menuNum && menu.num !== editMenuNum)) {
      alert("이미 해당 번호에 메뉴가 존재합니다.");
      return;
    }
    // menuList에서 해당 메뉴 정보 수정
    setMenuList((prev) => prev.map((menu) => (menu.num === editMenuNum ? { ...menu, name: menuName, price: menuPrice, info: menuInfo, num: menuNum } : menu)));
    alert("메뉴가 수정되었습니다!");
    // 입력값 초기화 및 수정모드 해제
    setMenuName("");
    setMenuPrice("");
    setMenuInfo("");
    setMenuNum("");
    setMenuModify(false);
    setEditMenuNum("");
  }, [editMenuNum, menuName, menuPrice, menuInfo, menuNum, menuList]);

  /**
   * 메뉴 삭제 함수
   * - faEraser 아이콘 클릭 시 해당 메뉴 삭제
   */
  const menuDeleteHandler = useCallback(
    (num) => {
      setMenuList((prev) => prev.filter((menu) => menu.num !== num));
      // 만약 수정모드에서 삭제한 메뉴가 현재 수정 중이라면 수정모드 해제
      if (menuModify && editMenuNum === num) {
        setMenuModify(false);
        setEditMenuNum("");
        setMenuName("");
        setMenuPrice("");
        setMenuInfo("");
        setMenuNum("");
      }
    },
    [menuModify, editMenuNum]
  );

  /**
   * 운영 정보 상태를 요일별 객체 리스트로 관리
   * day: 요일명, holiday: 휴일 여부, start: 시작시간, end: 종료시간, mapAddress: 지도상 주소, userAddress: 안내주소
   */
  const dayNames = ["월", "화", "수", "목", "금", "토", "일"];
  const [scheduleList, setScheduleList] = useState(
    dayNames.map((day) => ({
      day,
      holiday: false,
      start: "",
      end: "",
      mapAddress: "",
      userAddress: "",
    }))
  );

  // 요일별 핸들러 생성
  const handleScheduleChange = (idx, key, value) => {
    setScheduleList((prev) => prev.map((item, i) => (i === idx ? { ...item, [key]: value } : item)));
  };

  // 주소찾기 버튼 클릭 시
  const handleAddressSearch = (idx) => {
    setSelectedScheduleIdx(idx);
    setModalState(true);
  };

  // DaumPostcode 완료 시
  const onCompletePost = (data) => {
    setModalState(false);
    if (selectedScheduleIdx !== null) {
      setScheduleList((prev) => prev.map((item, i) => (i === selectedScheduleIdx ? { ...item, mapAddress: data.address } : item)));
    }
  };

  return (
    <MainLayOut>
      <RegisterPageMainStyle>
        <section>
          <div>
            <h1>푸드트럭 정보 등록</h1>
            <p>고객들이 쉽게 찾을 수 있도록 정확한 정보를 입력해주세요.</p>
          </div>
          <div>
            <h2>기본 정보</h2>
            <div className="col">
              <div>
                <InputCP title="푸드트럭 이름" essential="true" value={FTName} ex="황금 잉어빵" onChangeHandler={onChangeFTName} />
                <span className="nameError error" ref={nameErrorRef}>
                  2글자 이상 입력하세요
                </span>
              </div>
              <div>
                <SelectInputCP title="카테고리" essential="true" listData={FTCategoryList} onChangeHandler={onChangeFTCategory} />
                <span className="categoryError error" ref={categoryErrorRef}>
                  카테고리를 선택하세요
                </span>
              </div>
            </div>
            <div className="col-full">
              <div>
                <TextAreaInputCP
                  title="푸드트럭 소개"
                  essential="true"
                  ex="푸드트럭에 대한 소개를 입력하세요."
                  onChangeHandler={onChangeFTIntro}
                  value={FTIntro}
                  maxRows={7}
                  minRows={5}
                />
                <span className="introError error" ref={introErrorRef}>
                  20자 이상 입력하세요
                </span>
              </div>
            </div>
          </div>

          <RegisterPageMenuStyle>
            <h2>메뉴 정보</h2>
            <div className="col">
              <div className="menu-list">
                <p>
                  메뉴 리스트<span className="essential">*</span>
                </p>
                <div className={menuList.length === 0 ? "flexCenter" : "flexCol"}>
                  {menuList.length === 0 && <p>메뉴를 등록하세요</p>}
                  {/* menuList를 num 오름차순으로 정렬하여 출력 */}
                  {menuList
                    .slice()
                    .sort((a, b) => Number(a.num) - Number(b.num))
                    .map((menu, idx) => (
                      <div key={idx} className="menu-item">
                        <div className="flexBetween">
                          <p className="flexBetween">
                            <span>{menu.num}.</span>
                            <span>{menu.name}</span>
                            <span>({Number(menu.price).toLocaleString()}원)</span>
                          </p>
                          <p className="flexBetween icon">
                            {/* 수정 아이콘 클릭 시 해당 메뉴 정보로 input값 세팅 및 수정모드 진입 */}
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setMenuModify(true);
                                setEditMenuNum(menu.num);
                                setMenuName(menu.name);
                                setMenuPrice(menu.price);
                                setMenuInfo(menu.info);
                                setMenuNum(menu.num);
                              }}>
                              <FontAwesomeIcon icon={faPen} />
                            </span>
                            <span style={{ cursor: "pointer" }} onClick={() => menuDeleteHandler(menu.num)}>
                              <FontAwesomeIcon icon={faEraser} />
                            </span>
                          </p>
                        </div>
                        <p className="menu-item-info">{menu.info}</p>
                      </div>
                    ))}
                </div>
                <span className="menuError error" ref={menuErrorRef}>
                  메뉴를 하나 이상 등록하세요
                </span>
              </div>
              <div className="menu-add">
                <p>메뉴 등록</p>
                <div>
                  <InputCP title="메뉴 이름" value={menuName} onChangeHandler={onChangeMenuName} essential="true" />
                  <InputCP title="가격" value={menuPrice} onChangeHandler={onChangeMenuPrice} essential="true" ex="숫자만 입력" />
                  <InputCP title="설명" value={menuInfo} onChangeHandler={onChangeMenuInfo} />
                  <InputCP
                    title="표시 순서"
                    value={menuNum}
                    onChangeHandler={onChangeMenuNum}
                    essential="true"
                    ex="숫자가 이어질 필요가 없습니다. 메뉴는 오름차순으로 표시됩니다."
                  />
                </div>
                <div>
                  {/* 수정모드, 등록모드 버튼 구분 */}
                  {!menuModify && (
                    <div onClick={menuAddHandler}>
                      <ButtonCP>등록</ButtonCP>
                    </div>
                  )}
                  {menuModify && (
                    <div onClick={menuEditHandler}>
                      <ButtonCP>수정</ButtonCP>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </RegisterPageMenuStyle>
          <RegisterPageScheduleStyle>
            <h2>운영 정보</h2>
            {/* 전체 요일 반복 출력 */}
            {scheduleList.map((item, idx) => (
              <div key={item.day} style={{ marginBottom: "2rem" }}>
                <span>
                  {item.day}&nbsp;&nbsp;
                  <input
                    type="checkbox"
                    checked={item.holiday}
                    onChange={(e) => handleScheduleChange(idx, "holiday", e.target.checked)}
                    id={`holiday-${item.day}`}
                  />
                </span>

                <InputCP
                  value={item.start}
                  onChangeHandler={(e) => handleScheduleChange(idx, "start", e.target.value)}
                  ex="Open (ex: 15)"
                  className={!item.holiday ? "disabled-input" : scheduleErrors[idx]?.open ? "error-input" : ""}
                />
                <span style={{ textAlign: "center" }} className={!item.holiday ? "disabled-input" : scheduleErrors[idx]?.open ? "error-input" : ""}>
                  ~
                </span>
                <InputCP
                  value={item.end}
                  onChangeHandler={(e) => handleScheduleChange(idx, "end", e.target.value)}
                  ex="Close (ex: 21)"
                  className={!item.holiday ? "disabled-input" : scheduleErrors[idx]?.close ? "error-input" : ""}
                />
                <div onClick={() => item.holiday && handleAddressSearch(idx)}>
                  <OutLineButtonCP color="#A47764" borderColor="--brown-light" className={!item.holiday ? "disabled-input" : ""}>
                    주소찾기
                  </OutLineButtonCP>
                </div>
                <InputCP
                  value={item.mapAddress}
                  // onChangeHandler={(e) => handleScheduleChange(idx, "mapAddress", e.target.value)}
                  ex="지도 상 주소"
                  className={!item.holiday ? "disabled-input" : scheduleErrors[idx]?.address ? "error-input" : ""}
                />
                <InputCP
                  value={item.userAddress}
                  onChangeHandler={(e) => handleScheduleChange(idx, "userAddress", e.target.value)}
                  ex="사용자 안내용 주소"
                  className={!item.holiday ? "disabled-input" : scheduleErrors[idx]?.address ? "error-input" : ""}
                />
              </div>
            ))}
          </RegisterPageScheduleStyle>
          <div>
            <h2>사업자 정보</h2>
            <div className="col-full">
              <InputCP title="사업자 등록번호" essential="true" ex="000-00-00000" />
              <span className="operatorNumError error" ref={operatorNumErrorRef}>
                형식이 올바르지 않습니다.
              </span>
              <span
                className="termsError error"
                ref={termsErrorRef}
                style={{ display: "block", color: "red", fontSize: "0.9rem", margin: "0.5rem 0", visibility: "hidden" }}>
                약관에 동의해야 합니다.
              </span>
            </div>
          </div>
          <form className="terms flexHeightCenter">
            <input type="checkbox" id="terms" name="terms" />
            <label htmlFor="terms">
              <a href="">이용약관</a> 및 <a href="">개인정보처리방침</a>에 동의합니다<span className="essential">*</span>
            </label>
          </form>
          <span
            className="termsError error"
            ref={termsErrorRef}
            style={{ display: "block", color: "red", fontSize: "0.9rem", margin: "0.5rem 0", visibility: "hidden" }}>
            약관에 동의해야 합니다.
          </span>
          <div className="col-full">
            <div className="axiosButton" onClick={registerSubmitHandler}>
              <ButtonCP>등록 신청</ButtonCP>
            </div>
          </div>
        </section>
        {/* 주소찾기 모달 */}
        {modalState && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.3)",
              zIndex: 10000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setModalState(false)}>
            <div
              style={{
                background: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                padding: 0,
                zIndex: 10001,
              }}
              onClick={(e) => e.stopPropagation()}>
              <DaumPostcode style={{ width: 400, height: 500 }} onComplete={onCompletePost} />
            </div>
          </div>
        )}
      </RegisterPageMainStyle>
    </MainLayOut>
    // TODO: 등록 신청버튼
  );
};
export default RegisterPage;
