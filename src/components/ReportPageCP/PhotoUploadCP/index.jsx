import { useState } from "react";
import ButtonCP from "@/components/_common/ButtonCP";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, X } from "lucide-react";
const PhotoUploadCP = ({ formData, setFormData }) => {
  const [dragActive, setDragActive] = useState(false);

  /**
   *
   * @param {Array} files
   */
  const handleFileUpload = (files) => {
    if (files) {
      const newFiles = Array.from(files).slice(0, 5 - formData.photos.length);
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...newFiles],
      }));
    }
  };

  /**
   *
   * @param {number} index
   */
  const removePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  /**
   *
   * @param {React.DragEvent} e
   */
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  /**
   *
   * @param {React.DragEvent} e
   */
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };
  return (
    <>
      <Card className="shadow-lg border-solid border-brown-dark">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="h-5 w-5 text-brown-main" />
            <span>사진 첨부</span>
          </CardTitle>
          <CardDescription>
            푸드트럭 사진을 첨부해주세요 (최대 5장)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-brown-4 bg-brown-3"
                : "border-gray-4 hover:border-brown-4"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-4 mx-auto mb-4" />
            <p className="text-gray-6 mb-2">
              사진을 드래그하거나 클릭하여 업로드하세요
            </p>
            <p className="text-sm text-gray-5 mb-4">
              JPG, PNG 파일 (최대 10MB, 5장까지)
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
              id="photo-upload"
            />
            <ButtonCP
              className="w-32 mx-auto"
              onClick={() => document.getElementById("photo-upload")?.click()}
              disabled={formData.photos.length >= 5}
            >
              파일 선택
            </ButtonCP>
          </div>

          {/* 업로드된 사진 미리보기 */}
          {formData.photos.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-3">
                업로드된 사진 ({formData.photos.length}/5)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(photo) || "/placeholder.svg"}
                      alt={`업로드된 사진 ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="absolute bottom-1 left-1">
                      <Badge variant="secondary" className="text-xs">
                        {(photo.size / 1024 / 1024).toFixed(1)}MB
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};
export default PhotoUploadCP;
