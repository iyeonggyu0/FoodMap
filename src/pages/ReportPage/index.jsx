import { useState } from "react";
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
    location: "",
    detailedAddress: "",
    operatingHours: "",
    phone: "",
    reporterName: "",
    reporterEmail: "",
    reporterPhone: "",
    photos: [],
    agreeTerms: false,
  });

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
          <ReporterInfoCP
            formData={formData}
            handleInputChange={handleInputChange}
          />

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
              <ButtonCP disabled={!formData.agreeTerms}>
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
