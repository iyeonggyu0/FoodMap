import { useState, useEffect } from "react";
import ButtonCP from "@/components/_common/ButtonCP";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Mail,
  MapPin,
  Calendar,
  ImageIcon,
  UtensilsCrossed,
  AlertCircle,
  Loader2,
} from "lucide-react";
import axios from "axios";

export default function ReportApprovalPage() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL;
  const IMG_BASE = `${API_BASE}`; // 이미지 절대 경로 기본 값

  // 대기중 목록 불러오기
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoadingList(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/reports`,
          { withCredentials: true }
        );
        setReports(res.data);
      } catch (err) {
        console.error("승인 대기 목록 불러오기 실패:", err);
      } finally {
        setIsLoadingList(false);
      }
    };

    fetchReports();
  }, []);

  /** 상세 정보 불러오기 */
  const fetchReportDetail = async (reportId) => {
    try {
      setIsLoadingDetail(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/reports/${reportId}`,
        { withCredentials: true }
      );
      const detail = res.data;
      detail.photoUrls = detail.photoUrls?.map((url) =>
        url.startsWith("http") ? url : `${IMG_BASE}${url}`
      );
      setSelectedReport(detail);
    } catch (err) {
      console.error("상세 정보 불러오기 실패:", err);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const handleReportClick = (reportId) => {
    fetchReportDetail(reportId);
  };

  /** 승인 처리 */
  const handleApprove = async () => {
    if (!selectedReport) return;
    if (!window.confirm("선택한 제보를 승인하시겠습니까?")) return;

    try {
      setIsProcessing(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/reports/${
          selectedReport.reportId
        }/approve`,
        {},
        { withCredentials: true }
      );
      alert(res.data.message || "제보가 승인되었습니다.");
      setReports((prev) =>
        prev.filter((r) => r.reportId !== selectedReport.reportId)
      );
      setSelectedReport(null);
    } catch (err) {
      console.error("승인 실패:", err);
      alert("승인 처리 중 오류가 발생했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  /** 거부 처리 */
  const handleReject = async () => {
    if (!selectedReport) return;
    if (!window.confirm("선택한 제보를 거절하시겠습니까?")) return;

    try {
      setIsProcessing(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/reports/${
          selectedReport.reportId
        }/reject`,
        {},
        { withCredentials: true }
      );
      alert(res.data.message || "제보가 거절되었습니다.");
      setReports((prev) =>
        prev.filter((r) => r.reportId !== selectedReport.reportId)
      );
      setSelectedReport(null);
    } catch (err) {
      console.error("거절 실패:", err);
      alert("거절 처리 중 오류가 발생했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  /** 날짜 포맷함수
   * @param {string} dateString
   * @returns {string} "YYYY-MM-DD HH:MM" 형식의 날짜 문자열
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDayName = (day) => {
    const days = {
      월: "월요일",
      화: "화요일",
      수: "수요일",
      목: "목요일",
      금: "금요일",
      토: "토요일",
      일: "일요일",
    };
    return days[day] || day;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <ButtonCP color="white" className="w-28">
                <a href="/" className="flex items-center justify-center">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  홈으로
                </a>
              </ButtonCP>
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-6 w-6 text-brown-5" />
                <h1 className="text-xl font-bold text-brown-5">제보 검토</h1>
              </div>
            </div>
            <Badge variant="secondary" className="bg-brown-1 text-brown-7">
              대기중: {reports.length}건
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* 제보 목록 */}
          <div className="lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-brown-5" />
                  <span>승인 대기중인 제보</span>
                </CardTitle>
                <CardDescription>
                  클릭하여 상세 정보를 확인하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingList ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-brown-5" />
                  </div>
                ) : reports.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">
                      승인 대기중인 제보가 없습니다
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {reports.map((report) => (
                      <Card
                        key={report.reportId}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedReport?.reportId === report.reportId
                            ? "border border-solid border-brown-5 bg-brown-1"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => handleReportClick(report.reportId)}
                      >
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">
                                {report.truckName}
                              </h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {report.category}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  {formatDate(report.createdAt)}
                                </span>
                              </div>
                            </div>
                            <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                              PENDING
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-600 mt-2">
                            <User className="h-3 w-3" />
                            <span>{report.reporterNickname}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 상세 정보 */}
          <div className="lg:col-span-8">
            {!selectedReport && !isLoadingDetail ? (
              <Card className="h-full">
                <CardContent className="flex flex-col items-center justify-center py-20">
                  <AlertCircle className="h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">
                    왼쪽 목록에서 제보를 선택하세요
                  </p>
                </CardContent>
              </Card>
            ) : isLoadingDetail ? (
              <Card className="h-full">
                <CardContent className="flex items-center justify-center py-20">
                  <Loader2 className="h-12 w-12 animate-spin text-brown-5" />
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* 기본 정보 */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-2xl">
                          {selectedReport?.name}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge className="bg-brown-5">
                            {selectedReport?.category}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            제보일:{" "}
                            {formatDate(selectedReport?.createdAt || "")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">
                          푸드트럭 소개
                        </h4>
                        <p className="text-gray-600">{selectedReport?.intro}</p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                          <User className="h-4 w-4 text-brown-5" />
                          <span>제보자 정보</span>
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">닉네임:</span>
                            <span className="font-medium">
                              {selectedReport?.reporterNickname}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">
                              {selectedReport?.reporterEmail}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">제보자 ID:</span>
                            <span className="font-medium">
                              {selectedReport?.reporterId}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 메뉴 / 일정 / 사진 탭 */}
                <Card>
                  <CardContent className="pt-6">
                    <Tabs defaultValue="menu" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="menu">메뉴</TabsTrigger>
                        <TabsTrigger value="schedule">운영시간</TabsTrigger>
                        <TabsTrigger value="photos">사진</TabsTrigger>
                      </TabsList>

                      {/* 메뉴 탭 */}
                      <TabsContent value="menu" className="mt-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-700 flex items-center space-x-2">
                            <UtensilsCrossed className="h-4 w-4 text-brown-5" />
                            <span>
                              메뉴 목록 ({selectedReport?.menu.length}개)
                            </span>
                          </h4>
                          <div className="space-y-3">
                            {selectedReport?.menu.map((item) => (
                              <div
                                key={item.num}
                                className="bg-gray-50 p-4 rounded-lg"
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {item.num}
                                      </Badge>
                                      <span className="font-semibold text-gray-900">
                                        {item.name}
                                      </span>
                                    </div>
                                    {item.info && (
                                      <p className="text-sm text-gray-600 mt-1">
                                        {item.info}
                                      </p>
                                    )}
                                  </div>
                                  <span className="font-bold text-brown-6">
                                    {Number(item.price).toLocaleString()}원
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      {/* 일정 탭 */}
                      <TabsContent value="schedule" className="mt-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-700 flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-brown-5" />
                            <span>운영 일정</span>
                          </h4>
                          <div className="space-y-3">
                            {selectedReport?.schedule.map((item) => (
                              <div
                                key={item.day}
                                className="bg-gray-50 p-4 rounded-lg"
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center space-x-3">
                                    <Badge
                                      variant={
                                        item.holiday ? "secondary" : "default"
                                      }
                                      className={
                                        item.holiday
                                          ? "bg-gray-200"
                                          : "bg-brown-5"
                                      }
                                    >
                                      {getDayName(item.day)}
                                    </Badge>
                                    {item.holiday ? (
                                      <span className="text-red-500 font-medium">
                                        휴무
                                      </span>
                                    ) : (
                                      <span className="text-gray-900 font-medium">
                                        {item.start} - {item.end}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                {!item.holiday && (
                                  <div className="space-y-1 text-sm mt-3">
                                    <div className="flex items-start space-x-2">
                                      <MapPin className="h-4 w-4 text-brown-5 mt-0.5" />
                                      <div>
                                        <p className="text-gray-700">
                                          {item.userAddress}
                                        </p>
                                        <p className="text-gray-500 text-xs mt-0.5">
                                          {item.mapAddress}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      {/* 사진 탭 */}
                      <TabsContent value="photos" className="mt-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-700 flex items-center space-x-2">
                            <ImageIcon className="h-4 w-4 text-brown-5" />
                            <span>
                              첨부된 사진 (
                              {selectedReport?.photoUrls?.length || 0}장)
                            </span>
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {selectedReport?.photoUrls.map((url, index) => (
                              <div key={index} className="relative group">
                                <img
                                  src={url || "/placeholder.svg"}
                                  alt={`푸드트럭 사진 ${index + 1}`}
                                  className="w-full h-48 object-cover rounded-lg border shadow-sm"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                                  <ButtonCP
                                    color="white"
                                    className="w-24 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => window.open(url, "_blank")}
                                  >
                                    크게 보기
                                  </ButtonCP>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* 승인 / 거부 버튼 */}
                <Card className="border-brown-2 bg-gradient-to-r from-gray-50 to-white">
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <ButtonCP
                        onClick={handleApprove}
                        disabled={isProcessing}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white h-12"
                      >
                        {isProcessing ? (
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        ) : (
                          <CheckCircle className="h-5 w-5 mr-2" />
                        )}
                        승인하기
                      </ButtonCP>
                      <ButtonCP
                        onClick={handleReject}
                        disabled={isProcessing}
                        variant="outline"
                        className="flex-1 border-red-300 text-red-600 hover:bg-red-400 h-12 bg-transparent"
                      >
                        {isProcessing ? (
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        ) : (
                          <XCircle className="h-5 w-5 mr-2" />
                        )}
                        거부하기
                      </ButtonCP>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
