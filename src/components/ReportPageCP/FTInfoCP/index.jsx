import { ReportPageMenuStyle } from "./style";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import InputCP from "@/components/_common/InputCP";
import SelectInputCP from "@/components/_common/SelectInputCP";
import TextAreaInputCP from "@/components/_common/TextAreaInputCP";
import ButtonCP from "@/components/_common/ButtonCP";
import { Pencil, Eraser } from "lucide-react";
import { useCallback, useState, useRef } from "react";
import { useInput } from "@/hooks/useInput";
import axios from "axios";

const FTInfoCP = ({ formData, setFormData, handleInputChange }) => {
  const [nameError, setNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [introError, setIntroError] = useState(false);
  const [menuError, setMenuError] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const [menuModify, setMenuModify] = useState(false);
  const [editMenuNum, setEditMenuNum] = useState(""); // 수정 중인 메뉴 번호

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

  /**
   * 메뉴 등록 함수
   * - menuName: 3글자 이상
   * - menuPrice: 숫자가 아닌 문자가 포함되면 등록 불가, 빈 값도 등록 불가
   * - menuInfo: 조건 없음
   * - menuNum: 이미 menuList에 존재하면 등록 불가
   * 에러 발생 시 alert로 안내
   */
  const handleAddMenu = () => {
    // menuName 3글자 이상 체크
    if (!formData.menuName || formData.menuName.length < 3) {
      alert("메뉴 이름은 3글자 이상 입력해야 합니다.");
      return;
    }
    // menuPrice 숫자만 허용, 1 이상
    const price = Number((formData.menuPrice || "").trim());
    if (!price || !Number.isInteger(price) || Number(price) < 1) {
      alert("가격은 1 이상의 숫자만 입력해야 합니다.");
      return;
    }
    // menuNum 입력 체크
    if (!formData.menuNum) {
      alert("메뉴 번호를 입력해야 합니다.");
      return;
    }
    // menuNum 중복 체크
    if (formData.menuItems.some((menu) => menu.num === formData.menuNum)) {
      alert("이미 해당 번호에 메뉴가 존재합니다.");
      return;
    }
    alert("메뉴가 등록되었습니다!");
    setFormData((prev) => ({
      ...prev,
      menuItems: [
        ...prev.menuItems,
        {
          num: formData.menuNum,
          name: formData.menuName,
          price: formData.menuPrice,
          info: formData.menuInfo,
        },
      ],
      menuNum: "",
      menuName: "",
      menuPrice: "",
      menuInfo: "",
    }));
  };

  /**
   * 메뉴 수정 함수
   * @returns {void}
   * - 수정 중인 메뉴의 정보를 formData로 업데이트
   * - 수정 성공 시 입력값 초기화 및 수정모드 해제
   */
  const handleEditMenu = (editNum) => {
    // menuName 3글자 이상 체크
    if (!formData.menuName || formData.menuName.length < 3) {
      alert("메뉴 이름은 3글자 이상 입력해야 합니다.");
      return;
    }
    // menuPrice 숫자만 허용, 1 이상
    const price = Number((formData.menuPrice || "").trim());
    if (!price || !Number.isInteger(price) || Number(price) < 1) {
      alert("가격은 1 이상의 숫자만 입력해야 합니다.");
      return;
    }
    // menuNum 중복 체크 (수정 중인 메뉴 제외)
    if (
      formData.menuItems.some(
        (menu) => menu.num === formData.menuNum && menu.num !== editNum
      )
    ) {
      alert("이미 해당 번호에 메뉴가 존재합니다.");
      console.log(`formData:: ${formData.menuNum}, editNum: ${editNum}`);
      return false;
    }
    alert("메뉴가 수정되었습니다!");
    setFormData((prev) => ({
      ...prev,
      menuItems: prev.menuItems.map((item) =>
        item.num === editNum
          ? {
              ...item,
              num: formData.menuNum,
              name: formData.menuName,
              price: formData.menuPrice,
              info: formData.menuInfo,
            }
          : item
      ),
      menuNum: "",
      menuName: "",
      menuPrice: "",
      menuInfo: "",
    }));
    console.log(formData.menuItems);
    setMenuModify(false);
  };

  /**
   * 메뉴 삭제 함수
   * @param {string} num - 삭제할 메뉴의 표시 순서 번호
   * @returns {void}
   * - menuList에서 해당 번호의 메뉴 삭제
   * - 수정모드에서 삭제한 메뉴가 현재 수정 중이면 수정모드 해제
   */
  const menuDeleteHandler = useCallback(
    (num) => {
      setFormData((prev) => ({
        ...prev,
        menuItems: prev.menuItems.filter((menu) => menu.num !== num),
        // 만약 수정모드에서 삭제한 메뉴가 현재 수정 중이라면 수정모드 해제
        ...(menuModify && editMenuNum === num
          ? {
              menuName: "",
              menuPrice: "",
              menuInfo: "",
              menuNum: "",
            }
          : {}),
      }));
      if (menuModify && editMenuNum === num) {
        setMenuModify(false);
        setEditMenuNum("");
      }
    },
    [menuModify, editMenuNum, setFormData]
  );

  // 에러 span refs
  const nameErrorRef = useRef();
  const categoryErrorRef = useRef();
  const introErrorRef = useRef();
  const menuErrorRef = useRef();
  const termsErrorRef = useRef();

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
  };

  return (
    <section className="cards p-6">
      <div>
        <h1 className="text-2xl font-bold text-brown-10">푸드트럭 기본 정보</h1>
        <p className="text-sm text-muted-foreground">
          제보하려는 푸드트럭의 기본 정보를 입력해주세요
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex gap-6 flex-col lg:flex-row">
          <div className="flex-1 ">
            <Label htmlFor="truckName">푸드트럭 이름 *</Label>
            <Input
              className="border border-solid mt-2"
              id="truckName"
              placeholder="황금 잉어빵"
              value={formData.truckName}
              onChange={(e) => handleInputChange("truckName", e.target.value)}
              required
            />
            {nameError && (
              <span className="nameError error" ref={nameErrorRef}>
                2글자 이상 입력하세요
              </span>
            )}
          </div>
          <div className="flex-1">
            <Label htmlFor="category">카테고리 *</Label>
            <Select
              onValueChange={(value) => handleInputChange("category", value)}
            >
              <SelectTrigger className="border border-solid mt-2">
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent className="border border-solid border-gray-3">
                {FTCategoryList.map((items) => (
                  <SelectItem key={items.value} value={items.data}>
                    {items.data}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {categoryError && (
              <span className="categoryError error" ref={categoryErrorRef}>
                카테고리를 선택하세요
              </span>
            )}
          </div>
        </div>
        <div className="col-full">
          <div>
            <Label htmlFor="description">푸드트럭 설명</Label>
            <Textarea
              className="border border-solid mt-2"
              id="description"
              placeholder="푸드트럭의 특징, 맛, 분위기 등을 자유롭게 설명해주세요"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={5}
            />
            {introError && (
              <span className="introError error" ref={introErrorRef}>
                20자 이상 입력하세요
                {/* FIXME: 제보페이지이므로 조건 완화 고려 */}
              </span>
            )}
          </div>
        </div>
      </div>

      <ReportPageMenuStyle>
        <h2>메뉴 정보</h2>
        <div className="col">
          <div className="menu-list">
            <p>
              메뉴 리스트<span className="essential">*</span>
            </p>
            <div
              className={
                formData.menuItems.length === 0 ? "flexCenter" : "flexCol"
              }
            >
              {formData.menuItems.length === 0 && <p>메뉴를 등록하세요</p>}
              {/* menuList를 num 오름차순으로 정렬하여 출력 */}
              {formData.menuItems
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
                            setFormData((prev) => ({
                              ...prev,
                              menuName: menu.name,
                              menuPrice: menu.price,
                              menuInfo: menu.info,
                              menuNum: menu.num,
                            }));
                          }}
                        >
                          <Pencil />
                        </span>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => menuDeleteHandler(menu.num)}
                        >
                          <Eraser />
                        </span>
                      </p>
                    </div>
                    <p className="menu-item-info">{menu.info}</p>
                  </div>
                ))}
            </div>
            {menuError && (
              <span className="menuError error" ref={menuErrorRef}>
                메뉴를 하나 이상 등록하세요
              </span>
            )}
          </div>
          <div className="menu-add">
            <p>메뉴 등록</p>
            <div>
              <InputCP
                title="메뉴 이름"
                value={formData.menuName || ""}
                onChangeHandler={(e) =>
                  handleInputChange("menuName", e.target.value)
                }
                essential="true"
              />
              <InputCP
                title="가격"
                value={formData.menuPrice || ""}
                onChangeHandler={(e) =>
                  handleInputChange("menuPrice", e.target.value)
                }
                essential="true"
                ex="숫자만 입력"
              />
              <InputCP
                title="설명"
                value={formData.menuInfo}
                onChangeHandler={(e) =>
                  handleInputChange("menuInfo", e.target.value)
                }
              />
              <InputCP
                title="표시 순서"
                value={formData.menuNum}
                onChangeHandler={(e) =>
                  handleInputChange("menuNum", e.target.value)
                }
                essential="true"
                ex="숫자가 이어질 필요가 없습니다. 메뉴는 오름차순으로 표시됩니다."
              />
            </div>
            <div className="btnMod">
              {/* 수정모드, 등록모드 버튼 구분 */}
              {!menuModify && (
                <div onClick={handleAddMenu}>
                  <ButtonCP>등록</ButtonCP>
                </div>
              )}
              {menuModify && (
                <div onClick={() => handleEditMenu(editMenuNum)}>
                  <ButtonCP>수정</ButtonCP>
                </div>
              )}
            </div>
          </div>
        </div>
      </ReportPageMenuStyle>
    </section>
  );
};
export default FTInfoCP;
