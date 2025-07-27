import { useCallback, useState } from "react";
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

const RegisterPage = () => {
  // FT 푸드트럭 약자

  // 푸트드럭 이름
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

  const [phNumber, onChangePhoneNumber, setPhoneNumber] = useInput("");
  const [email, onChangeEmail, setEmail] = useInput("");

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
   * day: 요일명, holiday: 휴일 여부, start: 시작시간, end: 종료시간, mapAddress: 지도상주소, userAddress: 안내주소
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
                <span className="nameError error">2글자 이상 입력하세요</span>
              </div>
              <div>
                <SelectInputCP title="카테고리" essential="true" listData={FTCategoryList} onChangeHandler={onChangeFTCategory} />
                <span className="categoryError error">카테고리를 선택하세요</span>
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
                <span className="introError error">20자 이상 입력하세요</span>
              </div>
            </div>

            <div className="col">
              <div>
                <InputCP title="연락처" essential="true" value={phNumber} ex="010-1234-5678" onChangeHandler={onChangePhoneNumber} />
                <span className="nameError error">올바른 형식이 아닙니다.</span>
              </div>
              <div>
                <InputCP title="이메일" essential="true" value={email} ex="your-email@email.com" onChangeHandler={onChangeEmail} />
                <span className="nameError error">올바른 이메일을 입력하세요</span>
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
                  {menuList.length === 0 && <p>메뉴를 등록 하세요</p>}
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
              </div>
              <div className="menu-add">
                <p>메뉴 등록</p>
                <div>
                  <InputCP title="메뉴 이름" value={menuName} onChangeHandler={onChangeMenuName} essential="true" />
                  <InputCP title="가격" value={menuPrice} onChangeHandler={onChangeMenuPrice} essential="true" ex="숫자만 입력" />
                  <InputCP title="설명" value={menuInfo} onChangeHandler={onChangeMenuInfo} />
                  <InputCP title="표시 순서" value={menuNum} onChangeHandler={onChangeMenuNum} essential="true" />
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

                <InputCP value={item.start} onChangeHandler={(v) => handleScheduleChange(idx, "start", v)} ex="Open (ex: 15)" />
                <span style={{ textAlign: "center" }}>~</span>
                <InputCP value={item.end} onChangeHandler={(v) => handleScheduleChange(idx, "end", v)} ex="Close (ex: 21)" />
                <OutLineButtonCP color="#A47764" borderColor="--brown-light">
                  주소찾기
                </OutLineButtonCP>
                <InputCP value={item.mapAddress} onChangeHandler={(v) => handleScheduleChange(idx, "mapAddress", v)} ex="지도 상 주소" />
                <InputCP value={item.userAddress} onChangeHandler={(v) => handleScheduleChange(idx, "userAddress", v)} ex="사용자 안내용 주소" />
              </div>
            ))}
          </RegisterPageScheduleStyle>
          <div>
            <h2>사업자 정보</h2>
            <div className="col-full">
              <InputCP title="사업자 등록번호" essential="true" ex="000-00-00000" />
            </div>
            <div></div>
          </div>
          <form className="terms flexHeightCenter">
            <input type="checkbox" id="terms" name="terms" />
            <label htmlFor="terms">
              <a href="">이용약관</a> 및 <a href="">개인정보처리방침</a>에 동의합니다<span className="essential">*</span>
            </label>
          </form>
          <div className="col-full">
            <ButtonCP>등록 신청</ButtonCP>
          </div>
        </section>
      </RegisterPageMainStyle>
    </MainLayOut>
  );
};
export default RegisterPage;
