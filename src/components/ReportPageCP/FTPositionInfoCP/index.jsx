import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import OutLineButtonCP from "@/components/_common/OutLineButtonCP";

const locations = [
  "강남구",
  "강동구",
  "강북구",
  "강서구",
  "관악구",
  "광진구",
  "구로구",
  "금천구",
  "노원구",
  "도봉구",
  "동대문구",
  "동작구",
  "마포구",
  "서대문구",
  "서초구",
  "성동구",
  "성북구",
  "송파구",
  "양천구",
  "영등포구",
  "용산구",
  "은평구",
  "종로구",
  "중구",
  "중랑구",
];

const FTPositionInfoCP = ({ formData, setFormData, handleInputChange }) => {
  return (
    <Card className="cards">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-brown-main" />
          <span>위치 정보</span>
        </CardTitle>
        <CardDescription>푸드트럭을 발견한 위치를 알려주세요</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="location">지역 *</Label>
            <Select
              onValueChange={(value) => handleInputChange("location", value)}
            >
              <SelectTrigger className="border border-solid mt-2">
                <SelectValue placeholder="지역 선택" />
              </SelectTrigger>
              <SelectContent className="border border-solid border-gray-3">
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="operatingHours">운영 시간</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Input
                type="time"
                className="border border-solid"
                id="openHours"
                placeholder="예: 11:00 - 20:00"
                value={formData.openHours}
                onChange={(e) => handleInputChange("openHours", e.target.value)}
              />
              <span>-</span>
              <Input
                type="time"
                className="border border-solid"
                id="closeHours"
                placeholder="예: 11:00 - 20:00"
                value={formData.closeHours}
                onChange={(e) =>
                  handleInputChange("closeHours", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="mapAddress">지도상 주소 *</Label>
          <div className="flex items-center space-x-2 mt-2">
            <OutLineButtonCP width="8rem" color="brown">
              주소 찾기
            </OutLineButtonCP>
            <Input
              className="border border-solid flex-1"
              id="mapAddress"
              placeholder="지도상 주소를 입력해주세요"
              value={formData.mapAddress}
              onChange={(e) => handleInputChange("mapAddress", e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="userAddress">사용자 안내용 위치</Label>
          <Input
            className="border border-solid mt-2"
            id="userAddress"
            placeholder="예: 강남역 2번 출구 앞, 신촌 연세대 정문 근처"
            value={formData.userAddress}
            onChange={(e) => handleInputChange("userAddress", e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="phone">연락처</Label>
          <Input
            className="border border-solid mt-2"
            id="phone"
            type="tel"
            placeholder="010-1234-5678 (알고 있는 경우만)"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
export default FTPositionInfoCP;
