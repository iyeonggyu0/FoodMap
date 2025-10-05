import { forwardRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ReporterInfoCP = forwardRef(
  ({ formData, handleInputChange, errors }, refs) => {
    /** 전화번호는 숫자만 입력되도록 처리 */
    const handlePhoneInput = (e) => {
      const value = e.target.value.replace(/[^0-9]/g, "");
      handleInputChange("reporterPhone", value);
    };

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
              {errors.reporterName && (
                <span className="text-red-500 text-sm">
                  {errors.reporterName}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="reporterPhone">연락처(숫자만) *</Label>
              <Input
                className="border border-solid mt-2"
                id="reporterPhone"
                type="tel"
                placeholder="01012345678"
                value={formData.reporterPhone}
                onChange={handlePhoneInput}
                maxLength={11}
                required
              />
              {errors.reporterPhone && (
                <span className="text-red-500 text-sm">
                  {errors.reporterPhone}
                </span>
              )}
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
              onChange={(e) =>
                handleInputChange("reporterEmail", e.target.value)
              }
              required
            />
            {errors.reporterEmail && (
              <span className="text-red-500 text-sm">
                {errors.reporterEmail}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

export default ReporterInfoCP;
