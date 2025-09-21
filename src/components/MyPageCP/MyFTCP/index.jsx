import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { useMedia } from "../../../hooks/useMedia";
import { MyFTCPMainStyle, MyFTCPScheduleStyle, MyFTCPMenuStyle } from "./style";
import axios from "axios";
import { useInput } from "../../../hooks/useInput";
import { faEraser, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DaumPostcode from "react-daum-postcode";
import SelectInputCP from "../../_common/SelectInputCP";
import InputCP from "../../_common/InputCP";
import TextAreaInputCP from "../../_common/TextAreaInputCP";
import OutLineButtonCP from "../../_common/OutLineButtonCP";
import ButtonCP from "../../_common/ButtonCP";
import { ftDummyData } from "../../../_dummyData/ftDummyData";

const MyFTCP = ({ myTruckList = [] }) => {
  // 이미지 파일 상태
  const [file, setFile] = useState(null);
  // 이미지 선택 핸들러
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const isPc = useMedia().isPc;

  // 주소찾기 모달 상태 및 선택된 요일 인덱스
  const [modalState, setModalState] = useState(false);
  const [selectedScheduleIdx, setSelectedScheduleIdx] = useState(null);
  // 에러 span refs
  const nameErrorRef = useRef();
  const categoryErrorRef = useRef();
  const introErrorRef = useRef();
  const menuErrorRef = useRef();
  const termsErrorRef = useRef();
  // 요일별 에러는 동적으로 관리
  const [scheduleErrors, setScheduleErrors] = useState(Array(7).fill({ open: false, close: false, address: false }));
  // 등록 신청 함수
  /**
   * 푸드트럭 수정 신청을 처리하는 함수
   * @param {Event} e - 폼 제출 이벤트 객체
   * @returns {void}
   * - 입력값 유효성 검사 후, 문제가 없으면 PUT API로 데이터 전송
   * - 성공 시 알림 및 페이지 새로고침, 실패 시 에러 안내
   */
  // 기존 데이터 저장용 state
  const [originData, setOriginData] = useState(myTruckList[0] || null);

  const updateSubmitHandler = (e) => {
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
        // 7-1. 오픈/클로즈 00:00 형식(24시간제) 검사
        const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;
        if (!timeRegex.test(item.start)) {
          newScheduleErrors[idx].open = true;
          errorMsgs.push(`${item.day}요일 오픈 시간은 00:00 형식(24시간제)으로 입력하세요.`);
          error = true;
        }
        if (!timeRegex.test(item.end)) {
          newScheduleErrors[idx].close = true;
          errorMsgs.push(`${item.day}요일 클로징 시간은 00:00 형식(24시간제)으로 입력하세요.`);
          error = true;
        }
        // 7-2. 클로징 >= 오픈
        if (timeRegex.test(item.start) && timeRegex.test(item.end)) {
          const [startH, startM] = item.start.split(":").map(Number);
          const [endH, endM] = item.end.split(":").map(Number);
          const startTotal = startH * 60 + startM;
          const endTotal = endH * 60 + endM;
          if (endTotal < startTotal) {
            newScheduleErrors[idx].close = true;
            errorMsgs.push(`${item.day}요일 클로징 시간은 오픈 시간보다 빠를 수 없습니다.`);
            error = true;
          }
        }
      }
    });
    setScheduleErrors(newScheduleErrors);
    if (!hasOpenDay) {
      errorMsgs.push("요일 중 하나 이상 영업 체크가 필요합니다.");
      error = true;
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
      if (errorMsgs.length > 0) {
        alert(errorMsgs.join("\n"));
      } else {
        alert("입력값에 문제가 있습니다.");
      }
      return;
    }

    // 실제 푸드트럭 PK
    const truckId = originData?.id || 1;

    // 모든 필드를 보내되, 변경된 값은 수정된 값으로, 변경되지 않은 값은 기존 값(originData)으로 채워서 전송
    let sendData = {};
    if (!originData) {
      // 최초 등록 시 전체 포함
      sendData.name = FTName;
      sendData.category = FTCategory || "";
      sendData.intro = FTIntro;
      sendData.menu = menuList.map((menu) => ({
        name: menu.name,
        price: String(menu.price),
        info: menu.info,
        num: String(menu.num),
      }));
      sendData.schedule = scheduleList.map((item) => ({
        day: item.day,
        holiday: item.holiday,
        start: item.start.length === 2 ? item.start + ":00" : item.start,
        end: item.end.length === 2 ? item.end + ":00" : item.end,
        mapAddress: item.mapAddress,
        userAddress: item.userAddress,
      }));
    } else {
      sendData.name = originData.name !== FTName ? FTName : originData.name;
      sendData.category = originData.category !== FTCategory ? FTCategory : originData.category;
      sendData.intro = originData.intro !== FTIntro ? FTIntro : originData.intro;
      sendData.menu =
        JSON.stringify(originData.menu) !== JSON.stringify(menuList)
          ? menuList.map((menu) => ({
              name: menu.name,
              price: String(menu.price),
              info: menu.info,
              num: String(menu.num),
            }))
          : originData.menu;
      sendData.schedule =
        JSON.stringify(originData.schedule) !== JSON.stringify(scheduleList)
          ? scheduleList.map((item) => ({
              day: item.day,
              holiday: item.holiday,
              start: item.start.length === 2 ? item.start + ":00" : item.start,
              end: item.end.length === 2 ? item.end + ":00" : item.end,
              mapAddress: item.mapAddress,
              userAddress: item.userAddress,
            }))
          : originData.schedule;
    }

    // 이미지 파일만 업로드하는 경우
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      axios
        .put(`${import.meta.env.VITE_API_URL}/user/foodtruck/${truckId}/image`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data", Accept: "application/json" },
        })
        .then((res) => {
          if (res.data.message === "updated") {
            alert("이미지 업로드가 완료되었습니다!");
            window.location.reload();
          } else {
            alert(res.data.message || "이미지 업로드에 실패했습니다. 다시 시도해주세요.");
          }
        })
        .catch((err) => {
          console.error("이미지 업로드 중 오류 발생:", err);
          alert("이미지 업로드 중 오류가 발생했습니다. 다시 시도해주세요.");
        });
      return;
    }

    // 나머지 정보 수정
    console.log("전송할 sendData:", sendData);
    axios
      .put(`${import.meta.env.VITE_API_URL}/user/foodtruck/${truckId}`, sendData, {
        withCredentials: true,
        headers: { Accept: "application/json" },
      })
      .then((res) => {
        if (res.data.message === "updated") {
          alert("푸드트럭 정보가 수정되었습니다!");
          window.location.reload();
        } else {
          alert(res.data.message || "푸드트럭 정보 수정에 실패했습니다. 다시 시도해주세요.");
        }
      })
      .catch((err) => {
        console.error("푸드트럭 정보 수정 중 오류 발생:", err);
        alert("푸드트럭 정보 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

  // 푸드트럭 이름
  const [FTName, onChangeFTName, setFTName] = useInput(originData?.name || "");
  // 푸드트럭 카테고리
  const [FTCategory, onChangeFTCategory, setFTCategory] = useInput(originData?.category || "");

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
  const [FTIntro, onChangeFTIntro, setFTIntro] = useInput(originData?.intro || "");

  const [menuList, setMenuList] = useState(originData?.menu || []);

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
  }, [editMenuNum, menuName, menuPrice, menuInfo, menuNum, menuList, setMenuInfo, setMenuName, setMenuNum, setMenuPrice]);

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
    [menuModify, editMenuNum, setMenuInfo, setMenuName, setMenuNum, setMenuPrice]
  );

  /**
   * 운영 정보 상태를 요일별 객체 리스트로 관리
   * day: 요일명, holiday: 휴일 여부, start: 시작시간, end: 종료시간, mapAddress: 지도상 주소, userAddress: 안내주소
   */
  const dayNames = useMemo(() => ["월", "화", "수", "목", "금", "토", "일"], []);
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

  /**
   * 요일별 운영 정보 변경 핸들러
   * @param {number} idx - 변경할 요일의 인덱스
   * @param {string} key - 변경할 속성명
   * @param {any} value - 변경할 값
   * @returns {void}
   * - scheduleList의 특정 요일 객체의 key값을 value로 변경
   */
  const handleScheduleChange = (idx, key, value) => {
    setScheduleList((prev) => prev.map((item, i) => (i === idx ? { ...item, [key]: value } : item)));
  };

  /**
   * 주소찾기 버튼 클릭 시 모달 오픈 및 선택 요일 인덱스 저장
   * @param {number} idx - 선택한 요일의 인덱스
   * @returns {void}
   */
  const handleAddressSearch = (idx) => {
    setSelectedScheduleIdx(idx);
    setModalState(true);
  };

  /**
   * DaumPostcode에서 주소 선택 완료 시 해당 요일의 mapAddress 값 변경
   * @param {object} data - DaumPostcode에서 전달받은 주소 데이터
   * @returns {void}
   */
  const onCompletePost = (data) => {
    setModalState(false);
    if (selectedScheduleIdx !== null) {
      setScheduleList((prev) => prev.map((item, i) => (i === selectedScheduleIdx ? { ...item, mapAddress: data.address } : item)));
    }
  };

  /**
   * 푸드트럭 기존 데이터 로딩 및 초기값 설정
   * - API를 통해 기존 푸드트럭 정보를 가져와서 각 상태값에 설정
   * - 현재는 API가 동작하지 않으므로 더미 데이터로 대체
   */
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/user/foodtruck/mine`, { withCredentials: true })
      .then((res) => {
        if (res.data?.length === 0) {
          alert("등록된 푸드트럭이 없습니다.");
          if (window.confirm("푸드트럭을 등록하시겠습니까?")) {
            window.location.href = "/register";
          }
          return;
        }
        if (Array.isArray(res.data) && res.data.length > 0) {
          const data = res.data[0];
          setOriginData(data); // 원본 데이터 저장
          setFTName(data.name);
          setFTIntro(data.intro);
          setMenuList(data.menu || []);
          setScheduleList(
            data.schedule ||
              dayNames.map((day) => ({
                day,
                holiday: false,
                start: "",
                end: "",
                mapAddress: "",
                userAddress: "",
              }))
          );
          // 이미지 미리보기 제거
        }
      })
      .catch((err) => {
        console.error("내 푸드트럭 정보 로딩 중 오류:", err);
      });

    // 임시 더미 데이터 설정
    // setFTName(ftDummyData.name);
    // setFTCategory(ftDummyData.category);
    // setFTIntro(ftDummyData.intro);
    // setMenuList(ftDummyData.menu || []);
    // setScheduleList(
    //   ftDummyData.schedule ||
    //     dayNames.map((day) => ({
    //       day,
    //       holiday: false,
    //       start: "",
    //       end: "",
    //       mapAddress: "",
    //       userAddress: "",
    //     }))
    // );
  }, [setFTName, setFTCategory, setFTIntro, dayNames]);

  return (
    <MyFTCPMainStyle isPc={isPc}>
      <section>
        <div>
          <h1>푸드트럭 정보 수정</h1>
          <p>등록된 푸드트럭 정보를 수정할 수 있습니다. 변경하고 싶은 내용을 입력하고 수정 신청을 눌러주세요.</p>
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
              <SelectInputCP title="카테고리" essential="true" listData={FTCategoryList} value={FTCategory} onChangeHandler={onChangeFTCategory} />
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
        {/* 이미지 업로드 */}
        <div>
          <h2>이미지</h2>
          <div className="image-upload col flexCenter">
            <div>
              <p>푸드트럭이 드러난 이미지를 업로드 해 주세요</p>
              <p>선택사항</p>
              <input type="file" accept="image/*" onChange={handleChange} />
            </div>
          </div>
        </div>

        <MyFTCPMenuStyle>
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
        </MyFTCPMenuStyle>
        <MyFTCPScheduleStyle>
          <h2>
            운영 정보<span className="essential">*</span>
          </h2>
          {/* 전체 요일 반복 출력 */}
          {scheduleList.map((item, idx) => (
            <div key={item.day} style={{ marginBottom: "2rem" }}>
              <div>
                <span>
                  {item.day}요일&nbsp;&nbsp;
                  <input
                    type="checkbox"
                    checked={item.holiday}
                    onChange={(e) => handleScheduleChange(idx, "holiday", e.target.checked)}
                    id={`holiday-${item.day}`}
                  />
                </span>
                {isPc && (
                  <span
                    style={{ textAlign: "center", visibility: "hidden" }}
                    className={!item.holiday ? "disabled-input" : scheduleErrors[idx]?.open ? "error-input" : ""}>
                    ~
                  </span>
                )}
                <InputCP
                  value={item.start}
                  onChangeHandler={(e) => handleScheduleChange(idx, "start", e.target.value)}
                  ex="영업 시작 시간 (ex: 15)"
                  className={!item.holiday ? "disabled-input" : scheduleErrors[idx]?.open ? "error-input" : ""}
                />
                <span style={{ textAlign: "center" }} className={!item.holiday ? "disabled-input" : scheduleErrors[idx]?.open ? "error-input" : ""}>
                  ~
                </span>
                <InputCP
                  value={item.end}
                  onChangeHandler={(e) => handleScheduleChange(idx, "end", e.target.value)}
                  ex="영업 종료 시간 (ex: 21)"
                  className={!item.holiday ? "disabled-input" : scheduleErrors[idx]?.close ? "error-input" : ""}
                />
              </div>
              <div>
                <div onClick={() => item.holiday && handleAddressSearch(idx)}>
                  <OutLineButtonCP color="#A47764" borderColor="--brown-light" className={!item.holiday ? "disabled-input" : ""}>
                    주소찾기
                  </OutLineButtonCP>
                </div>
                {isPc && (
                  <span
                    style={{ textAlign: "center", visibility: "hidden" }}
                    className={!item.holiday ? "disabled-input" : scheduleErrors[idx]?.open ? "error-input" : ""}>
                    ~
                  </span>
                )}
                <InputCP
                  value={item.mapAddress}
                  // onChangeHandler={(e) => handleScheduleChange(idx, "mapAddress", e.target.value)}
                  lock={true}
                  ex="지도 상 주소"
                  className={!item.holiday ? "disabled-input" : scheduleErrors[idx]?.address ? "error-input" : ""}
                />
                {isPc && (
                  <span
                    style={{ textAlign: "center", visibility: "hidden" }}
                    className={!item.holiday ? "disabled-input" : scheduleErrors[idx]?.open ? "error-input" : ""}>
                    ~
                  </span>
                )}
                <InputCP
                  value={item.userAddress}
                  onChangeHandler={(e) => handleScheduleChange(idx, "userAddress", e.target.value)}
                  ex="사용자 안내용 주소"
                  className={!item.holiday ? "disabled-input" : scheduleErrors[idx]?.address ? "error-input" : ""}
                />
              </div>
            </div>
          ))}
        </MyFTCPScheduleStyle>

        <form className="terms flexHeightCenter">
          <input type="checkbox" id="terms" name="terms" />
          <label htmlFor="terms">
            <a href="/terms" target="_blank" rel="noopener noreferrer">
              이용약관
            </a>{" "}
            및{" "}
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
              개인정보처리방침
            </a>
            에 동의합니다<span className="essential">*</span>
          </label>
        </form>
        <span
          className="termsError error"
          ref={termsErrorRef}
          style={{ display: "block", color: "red", fontSize: "0.9rem", margin: "0.5rem 0", visibility: "hidden" }}>
          약관에 동의해야 합니다.
        </span>
        <div className="col-full">
          <div className="axiosButton" onClick={updateSubmitHandler}>
            <ButtonCP>수정 신청</ButtonCP>
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
      <div>
        <h2>수정 안내사항</h2>
        <p>ㆍ허위 정보 입력 시 서비스 이용이 제한될 수 있습니다.</p>
        <p>ㆍ수정 신청 후 관리자 승인까지 1~2일 소요될 수 있습니다.</p>
        <p>ㆍ문의사항은 Q&A 게시판으로 연락해주세요.</p>
      </div>
    </MyFTCPMainStyle>
  );
};
export default MyFTCP;
