import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MainLayOut from "@/layout/MainLayOut";
import { ReportPageMainStyle, ButtonStyle } from "./style";
import ButtonCP from "@/components/_common/ButtonCP";
import OutLineButtonCP from "@/components/_common/OutLineButtonCP";
import PhotoUploadCP from "@/components/ReportPageCP/PhotoUploadCP";
import FTPositionInfoCP from "@/components/ReportPageCP/FTPositionInfoCP";
import FTInfoCP from "@/components/ReportPageCP/FTInfoCP";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Star, AlertCircle, Camera, CheckCircle } from "lucide-react";
import ReporterInfoCP from "@/components/ReportPageCP/ReporterInfoCP";
import axios from "axios";

const ReportPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    intro: "",
    menu: [], //등록된 메뉴들의 리스트 { num, name, price, info }
    menuNum: "", //현재 입력 중인 메뉴의 임시 값
    menuName: "",
    menuPrice: "",
    menuInfo: "",
    schedule: [
      {
        day: "월",
        holiday: false,
        start: "",
        end: "",
        mapAddress: "",
        userAddress: "",
      },
      {
        day: "화",
        holiday: false,
        start: "",
        end: "",
        mapAddress: "",
        userAddress: "",
      },
      {
        day: "수",
        holiday: false,
        start: "",
        end: "",
        mapAddress: "",
        userAddress: "",
      },
      {
        day: "목",
        holiday: false,
        start: "",
        end: "",
        mapAddress: "",
        userAddress: "",
      },
      {
        day: "금",
        holiday: false,
        start: "",
        end: "",
        mapAddress: "",
        userAddress: "",
      },
      {
        day: "토",
        holiday: false,
        start: "",
        end: "",
        mapAddress: "",
        userAddress: "",
      },
      {
        day: "일",
        holiday: false,
        start: "",
        end: "",
        mapAddress: "",
        userAddress: "",
      },
    ],
    phone: "",
    reporterName: "",
    reporterEmail: "",
    reporterPhone: "",
    photos: [],
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [firstErrorKey, setFirstErrorKey] = useState(null);

  // errors 바뀔 때마다 첫 에러 위치로 스크롤
  useEffect(() => {
    if (firstErrorKey && refs[firstErrorKey]?.current) {
      setTimeout(() => {
        refs[firstErrorKey].current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [firstErrorKey]);

  // 에러 span refs
  const refs = {
    name: useRef(null),
    category: useRef(null),
    intro: useRef(null),
    menu: useRef(null),
    reporterName: useRef(null),
    reporterEmail: useRef(null),
    reporterPhone: useRef(null),
  };

  // 에러 메시지
  const errorMessages = {
    name: "푸드트럭 이름(2글자 이상)을 입력해주세요.",
    category: "카테고리를 선택해주세요.",
    intro: "푸드트럭 설명글을 10글자 이상 입력해주세요.",
    menu: "메뉴를 1개 이상 등록해주세요.",
    schedule: "영업일과 시간을 정확히 입력해주세요.",
    location: "푸드트럭 위치를 선택해주세요.",
    mapAddress: "지도상 주소를 입력해주세요.",
    reporterName: "제보자 이름은 한글 또는 영문 2글자 이상만 입력 가능합니다.",
    reporterEmail: "유효한 이메일 주소를 입력해주세요.",
    reporterPhone: "연락처는 숫자만 입력 가능하며, 10~11자리여야 합니다.",
  };

  /** 유효성 검사 함수들
   * - key: formData 키, v: 값
   * - true면 통과, false면 에러
   * */
  const validators = {
    name: (v) => v?.length > 1, //존재하고, 2글자 이상이면 통과
    category: (v) => v, //존재하면 통과
    intro: (v) => v?.length > 10, //존재하고, 10글자 이상이면 통과
    menu: (v) => v.length > 0, //메뉴 1개 이상 등록해야 통과
    schedule: (scheduleArray) => {
      const hasOperatingDay = scheduleArray.some((day) => !day.holiday); //휴무일 아닌 날이 하나라도 있으면 통과
      if (!hasOperatingDay) return false;

      //영업하는 날은 시작시간, 종료시간, 지도상 주소가 모두 있어야 통과
      return scheduleArray.every((day) => {
        if (day.holiday) return true; //휴무일이면 통과
        return day.start && day.end && day.mapAddress && day.userAddress;
      });
    },
    reporterName: (v) => {
      const nameRegex = /^[가-힣a-zA-Z]{2,}$/;
      return nameRegex.test(v);
    }, //한글, 영문만 입력 가능(자음, 모음도 안됨), 빈값이면 안되고 2글자 이상이어야 함
    reporterEmail: (v) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(v);
    }, //이메일 형식이면 통과
    reporterPhone: (v) => {
      const phoneRegex = /^\d{10,11}$/;
      return phoneRegex.test(v);
    }, //숫자만 입력 가능, 10~11자리여야 함
  };

  /**
   * 인풋값 변할 때 formData로 바뀐거 전달하는 함수
   * @param {String} key
   * @param {*} value
   */
  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /**
   * 폼 제출 핸들러
   */
  const handleSubmit = async (e) => {
    // 필수 입력값 유효성 체크
    e.preventDefault();
    const errors = {};

    Object.entries(validators).forEach(([key, validate]) => {
      if (!validate(formData[key])) {
        errors[key] = errorMessages[key];
      }
    });

    // 에러 alert 띄우기
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setFirstErrorKey(Object.keys(errors)[0]);
      alert(Object.values(errors).join("\n"));
      return; // 오류 있을 경우 제출 중단
    }

    // 서버에 제출할 데이터
    const submissionData = {
      name: formData.name,
      category: formData.category,
      intro: formData.intro,
      menu: formData.menu,
      schedule: formData.schedule.map((day) => ({
        day: day.day,
        holiday: day.holiday,
        start: day.start,
        end: day.end,
        mapAddress: day.mapAddress,
        userAddress: day.userAddress,
      })),
      photos: formData.photos,
    };

    // 서버에 submissionData 전송
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/report`,
        submissionData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.success) {
        alert("푸드트럭 제보가 성공적으로 접수되었습니다. 감사합니다!");
      } else {
        alert("푸드트럭 제보 실패: " + res.data.message);
      }
    } catch (err) {
      console.error("푸드트럭 제보 중 오류 발생: ", err);
      alert("푸드트럭 제보 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.log(submissionData); //FIXME: formData 확인용, 나중에 지우기
    }
  };

  return (
    <MainLayOut>
      <ReportPageMainStyle>
        <div className="flex flex-col gap-8 max-w-[1440px] mx-auto px-4 py-12 md:px-12 md:w-[75vw]">
          {/* 푸드트럭 제보 안내 카드 */}
          <Card className="overflow-hidden shadow-lg border-solid border-brown-dark">
            <CardHeader className="bg-white">
              <CardTitle className="flex items-center space-x-2 text-brown-10 relative">
                <div className="bg-brown-main p-2 rounded-lg">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <span>푸드트럭 제보 안내</span>
              </CardTitle>
              <CardDescription className="relative">
                새로운 푸드트럭을 발견하셨나요? 다른 사용자들과 정보를
                공유해주세요!
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-brown-1 border border-brown-2">
                  <div className="bg-brown-main p-1.5 rounded-full">
                    <AlertCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-brown-8">
                    정확한 정보 입력
                  </span>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-brown-1 border border-brown-2">
                  <div className="bg-brown-main p-1.5 rounded-full">
                    <Camera className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-brown-8">
                    사진 첨부 권장
                  </span>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-brown-1 border border-brown-2">
                  <div className="bg-brown-main p-1.5 rounded-full">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-brown-8">
                    1-2일 내 검토
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 푸드트럭 기본 정보 카드 */}
          <FTInfoCP
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            errors={errors}
            ref={refs}
          />

          {/* 푸드트럭 위치 정보 카드 */}
          <FTPositionInfoCP
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
          />

          {/* 사진 업로드 카드 */}
          <PhotoUploadCP formData={formData} setFormData={setFormData} />

          {/* 제보자 정보 카드 */}
          {/* <ReporterInfoCP
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
            ref={refs}
          /> */}
          {/* FIXME: 로그인 정보로 처리 예정 */}

          <div className="cards p-6">
            {/* 이용약관 */}
            <div className="flex gap-2">
              <Checkbox
                className="border-solid border-brown-main data-[state=checked]:bg-brown-main"
                id="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) =>
                  handleInputChange("agreeTerms", checked)
                }
              />
              <Label
                htmlFor="agreeTerms"
                className="cursor-pointer select-none"
              >
                제보 내용이 사실임을 확인하며,{" "}
                <Link to="/terms">
                  <span className="text-brown-main">이용약관</span>
                </Link>
                에 동의합니다. *
              </Label>
            </div>
            {/* 주의사항 */}
            <div className="flex p-4 flex-col gap-2 bg-yellow-50 border border-solid border-yellow-200 rounded-md">
              <div className="flex gap-2 items-center">
                <AlertCircle className="w-5 text-brown-main" />
                <h2 className="text-base text-brown-main font-medium">
                  제보 시 주의사항
                </h2>
              </div>
              <div className="text-brown-main text-xs flex flex-col gap-1 pl-2">
                <p>ㆍ허위 정보 제보 시 서비스 이용이 제한될 수 있습니다.</p>
                <p>ㆍ개인정보는 제보 검토 목적으로만 사용됩니다.</p>
                <p>ㆍ중복 제보는 자동으로 필터링됩니다.</p>
              </div>
            </div>

            {/* 제보버튼 */}
            <ButtonStyle>
              <ButtonCP disabled={!formData.agreeTerms} onClick={handleSubmit}>
                푸드트럭 제보하기
              </ButtonCP>
              <OutLineButtonCP color="black">취소</OutLineButtonCP>
            </ButtonStyle>
          </div>
        </div>
      </ReportPageMainStyle>
    </MainLayOut>
  );
};
export default ReportPage;
