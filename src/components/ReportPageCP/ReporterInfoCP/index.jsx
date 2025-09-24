import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ReporterInfoCP = ({ formData, setFormData, handleInputChange }) => {
  return (
    <Card className="cards">
      <CardHeader>
        <CardTitle>제보자 정보</CardTitle>
        <CardDescription>
          검토 결과 안내를 위한 연락처를 입력해주세요
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="reporterName">이름 *</Label>
            <Input
              className="border border-solid mt-2"
              id="reporterName"
              placeholder="홍길동"
              value={formData.reporterName}
              onChange={(e) =>
                handleInputChange("reporterName", e.target.value)
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="reporterPhone">연락처</Label>
            <Input
              className="border border-solid mt-2"
              id="reporterPhone"
              type="tel"
              placeholder="010-1234-5678"
              value={formData.reporterPhone}
              onChange={(e) =>
                handleInputChange("reporterPhone", e.target.value)
              }
            />
          </div>
        </div>

        <div>
          <Label htmlFor="reporterEmail">이메일 *</Label>
          <Input
            className="border border-solid mt-2"
            id="reporterEmail"
            type="email"
            placeholder="example@email.com"
            value={formData.reporterEmail}
            onChange={(e) => handleInputChange("reporterEmail", e.target.value)}
            required
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ReporterInfoCP;
