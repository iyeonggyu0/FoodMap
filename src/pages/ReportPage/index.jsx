import { useCallback, useState, useRef } from "react";
import InputCP from "../../components/_common/InputCP";
import SelectInputCP from "../../components/_common/SelectInputCP";
import TextAreaInputCP from "../../components/_common/TextAreaInputCP";
import { useInput } from "../../hooks/useInput";
import MainLayOut from "../../layout/MainLayOut";
import { ReportPageMainStyle, ReportPageMenuStyle } from "./style";
import ButtonCP from "../../components/_common/ButtonCP";
import OutLineButtonCP from "../../components/_common/OutLineButtonCP";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faPen } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { encrypt } from "../../util/crypto";

const ReportPage = () => {
  // 에러 span refs
  const nameErrorRef = useRef();
  const categoryErrorRef = useRef();
  const introErrorRef = useRef();
  const menuErrorRef = useRef();
  const termsErrorRef = useRef();
  // 제보 신청 함수
  /**
   * 푸드트럭 제보 신청을 처리하는 함수
   * @param {Event} e - 폼 제출 이벤트 객체
   * @returns {void}
   * - 입력값 유효성 검사 후, 문제가 없으면 API로 데이터 전송
   * - 성공 시 입력값 초기화, 실패 시 에러 안내
   */
  const reportSubmitHandler = (e) => {
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
    // 3. 메뉴 1개 이상
    if (!menuList || menuList.length === 0) {
      menuErrorRef.current.style.visibility = "visible";
      errorMsgs.push("메뉴를 하나 이상 등록하세요.");
      error = true;
    } else {
      menuErrorRef.current.style.visibility = "hidden";
    }

    // FIXME : 위치 정보 유효값 검사 추가

    // . 약관 동의
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
    alert("제보가 완료되었습니다.");

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
          // 푸드트럭 설명
          intro: FTIntro,
          // 메뉴 리스트
          menu: menuList,
          // 영업 일정
          schedule: scheduleList,
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
    {
      value: "튀김",
      data: "튀김 (감자튀김, 치즈볼, 오징어튀김, 새우튀김, 치킨)",
    },
    { value: "꼬치", data: "꼬치 (닭꼬치, 소시지꼬치)" },
    {
      value: "샌드위치/토스트",
      data: "샌드위치/토스트 (샌드위치, 토스트, 버거)",
    },
    {
      value: "디저트/음료",
      data: "디저트/음료 (아이스크림, 커피, 음료, 팥빙수)",
    },
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
  }, [
    menuName,
    menuPrice,
    menuInfo,
    menuNum,
    menuList,
    setMenuName,
    setMenuPrice,
    setMenuInfo,
    setMenuNum,
  ]);

  /**
   * 메뉴 수정 함수
   * @returns {void}
   * - 수정 중인 메뉴의 정보를 menuList에서 업데이트
   * - 수정 성공 시 입력값 초기화 및 수정모드 해제
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
    if (
      menuList.some((menu) => menu.num === menuNum && menu.num !== editMenuNum)
    ) {
      alert("이미 해당 번호에 메뉴가 존재합니다.");
      return;
    }
    // menuList에서 해당 메뉴 정보 수정
    setMenuList((prev) =>
      prev.map((menu) =>
        menu.num === editMenuNum
          ? {
              ...menu,
              name: menuName,
              price: menuPrice,
              info: menuInfo,
              num: menuNum,
            }
          : menu
      )
    );
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
   * @param {string} num - 삭제할 메뉴의 표시 순서 번호
   * @returns {void}
   * - menuList에서 해당 번호의 메뉴 삭제
   * - 수정모드에서 삭제한 메뉴가 현재 수정 중이면 수정모드 해제
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

  return (
    <MainLayOut>
      <ReportPageMainStyle>
        {/* FIXME : 푸드트럭 제보 안내 카드 */}
        <section>
          <div>
            <h1>푸드트럭 기본 정보</h1>
            <p>제보하려는 푸드트럭의 기본 정보를 입력해주세요</p>
          </div>
          <div>
            <div className="col">
              <div>
                <InputCP
                  title="푸드트럭 이름"
                  essential="true"
                  value={FTName}
                  ex="황금 잉어빵"
                  onChangeHandler={onChangeFTName}
                />
                <span className="nameError error" ref={nameErrorRef}>
                  2글자 이상 입력하세요
                </span>
              </div>
              <div>
                <SelectInputCP
                  title="카테고리"
                  essential="true"
                  listData={FTCategoryList}
                  onChangeHandler={onChangeFTCategory}
                />
                <span className="categoryError error" ref={categoryErrorRef}>
                  카테고리를 선택하세요
                </span>
              </div>
            </div>
            <div className="col-full">
              <div>
                <TextAreaInputCP
                  title="푸드트럭 설명"
                  essential="false"
                  ex="푸드트럭의 특징, 맛, 분위기 등을 자유롭게 설명해주세요"
                  onChangeHandler={onChangeFTIntro}
                  value={FTIntro}
                  maxRows={7}
                  minRows={5}
                />
                <span className="introError error" ref={introErrorRef}>
                  20자 이상 입력하세요
                  {/* FIXME: 제보페이지이므로 조건 완화 고려 */}
                </span>
              </div>
            </div>
          </div>

          <ReportPageMenuStyle>
            <div className="col">
              <div className="menu-list">
                <p>
                  메뉴 리스트<span className="essential">*</span>
                </p>
                <div
                  className={menuList.length === 0 ? "flexCenter" : "flexCol"}
                >
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
                            <span>
                              ({Number(menu.price).toLocaleString()}원)
                            </span>
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
                              }}
                            >
                              <FontAwesomeIcon icon={faPen} />
                            </span>
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => menuDeleteHandler(menu.num)}
                            >
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
                  <InputCP
                    title="메뉴 이름"
                    value={menuName}
                    onChangeHandler={onChangeMenuName}
                    essential="true"
                  />
                  <InputCP
                    title="가격"
                    value={menuPrice}
                    onChangeHandler={onChangeMenuPrice}
                    essential="true"
                    ex="숫자만 입력"
                  />
                  <InputCP
                    title="설명"
                    value={menuInfo}
                    onChangeHandler={onChangeMenuInfo}
                  />
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
          </ReportPageMenuStyle>
        </section>

        {/* FIXME: 푸드트럭 위치 정보 카드 */}

        {/* FIXME: 사진 첨부 카드 */}

        {/* FIXME: 제보자 정보 카드 */}

        <div>
          <h2>제보 시 주의사항</h2>
          <p>ㆍ허위 정보 제보 시 서비스 이용이 제한될 수 있습니다.</p>
          <p>ㆍ개인정보는 제보 검토 목적으로만 사용됩니다.</p>
          <p>ㆍ중복 제보는 자동으로 필터링됩니다.</p>
        </div>
      </ReportPageMainStyle>
    </MainLayOut>
  );
};
export default ReportPage;
