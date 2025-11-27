import { useState } from "react";
import PropTypes from "prop-types";
import MatchCard from "./MatchCard";

const formatProcessingTime = (ms) => {
  if (typeof ms !== "number") return null;
  if (ms >= 1000) {
    return `${(ms / 1000).toFixed(2)} giây`;
  }
  return `${ms.toFixed(0)} ms`;
};

const formatAge = (age) => {
  if (age === null || age === undefined) {
    return "Không xác định";
  }
  return `${age} tuổi`;
};

const ImageDetailsList = ({ validImages, referenceImages, failedImages }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="mt-3 border-t border-slate-200 pt-3">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between text-sm font-medium text-slate-700 hover:text-slate-900"
      >
        <span>{isExpanded ? "Ẩn" : "Xem"} chi tiết ảnh</span>
        <svg
          className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isExpanded && (
        <div className="mt-3 space-y-3">
          {/* Valid Images */}
          {validImages.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-green-700">
                Ảnh hợp lệ ({validImages.length})
              </p>
              <div className="space-y-2">
                {validImages.map((img, idx) => (
                  <div key={img.image_id || idx} className="rounded-lg border border-green-200 bg-green-50/50 p-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-700">Ảnh #{img.image_index + 1}</span>
                      <span className="rounded bg-green-100 px-2 py-0.5 text-green-700">Hợp lệ</span>
                    </div>
                    <div className="mt-1 grid grid-cols-2 gap-1 text-slate-600">
                      <span>Tuổi: {formatAge(img.age_at_photo)}</span>
                      {img.photo_year && <span>Năm: {img.photo_year}</span>}
                      {img.quality_score !== undefined && (
                        <span>Chất lượng: {(img.quality_score * 100).toFixed(0)}%</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Reference Images */}
          {referenceImages.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-700">
                Ảnh tham khảo ({referenceImages.length})
              </p>
              <div className="space-y-2">
                {referenceImages.map((img, idx) => (
                  <div key={img.image_id || idx} className="rounded-lg border border-amber-200 bg-amber-50/50 p-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-700">Ảnh #{img.image_index + 1}</span>
                      <span className="rounded bg-amber-100 px-2 py-0.5 text-amber-700">Tham khảo</span>
                    </div>
                    <div className="mt-1 space-y-1 text-slate-600">
                      <div className="grid grid-cols-2 gap-1">
                        <span>Tuổi: {formatAge(img.age_at_photo)}</span>
                        {img.photo_year && <span>Năm: {img.photo_year}</span>}
                      </div>
                      <p className="text-amber-700 italic">{img.reason || img.validation_status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Failed Images */}
          {failedImages.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-700">
                Ảnh lỗi ({failedImages.length})
              </p>
              <div className="space-y-2">
                {failedImages.map((img, idx) => (
                  <div key={img.filename || idx} className="rounded-lg border border-rose-200 bg-rose-50/50 p-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-700">{img.filename || `Ảnh #${img.index + 1}`}</span>
                      <span className="rounded bg-rose-100 px-2 py-0.5 text-rose-700">Lỗi</span>
                    </div>
                    <p className="mt-1 text-rose-700">{img.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

ImageDetailsList.propTypes = {
  validImages: PropTypes.array,
  referenceImages: PropTypes.array,
  failedImages: PropTypes.array
};

export default function ResultPanel({ mode, data }) {
  if (!data) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/70 p-8 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-slate-700">Kết quả sẽ hiển thị tại đây</h3>
        <p className="mt-2 text-sm text-slate-500">
          Thực hiện tải ảnh để hệ thống phân tích và gợi ý đối tượng phù hợp.
        </p>
      </div>
    );
  }

  const matches = data?.potential_matches || [];
  const isMultiImage = data?.matching_images_count !== undefined || data?.valid_images !== undefined;
  const validImages = data?.valid_images || [];
  const referenceImages = data?.reference_images || [];
  const failedImages = data?.failed_images || [];

  return (
    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-200/70">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary-500">
          {mode === "found" ? "Kết quả gợi ý" : "Đăng ký thành công"}
        </p>
        <h3 className="mt-1 text-2xl font-bold text-slate-900">
          {mode === "found" ? "Các hồ sơ trùng khớp" : "Thông tin hồ sơ đã được ghi nhận"}
        </h3>
        {data?.message && (
          <p className="mt-2 text-sm text-slate-500">{data.message}</p>
        )}
      </div>

      {mode === "missing" && (
        <>
          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            <p>
              Mã điểm dữ liệu:&nbsp;
              <span className="font-semibold text-slate-900">{data.point_id}</span>
            </p>
            {data.case_id && (
              <p>
                Mã hồ sơ đã cấp:&nbsp;
                <span className="font-semibold text-slate-900">{data.case_id}</span>
              </p>
            )}
            {typeof data.processing_time_ms === "number" && (
              <p>
                Thời gian xử lý:&nbsp;
                <span className="font-semibold text-slate-900">
                  {formatProcessingTime(data.processing_time_ms)}
                </span>
              </p>
            )}
            
            {/* Multi-image upload summary */}
            {isMultiImage && (
              <div className="mt-3 space-y-3 rounded-xl bg-white p-3">
                <p className="font-semibold text-slate-900">Tóm tắt ảnh đã tải:</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="rounded-lg bg-green-50 p-2 text-center">
                    <p className="font-bold text-green-700">{data.matching_images_count || validImages.length}</p>
                    <p className="text-green-600">Ảnh hợp lệ</p>
                  </div>
                  {referenceImages.length > 0 && (
                    <div className="rounded-lg bg-amber-50 p-2 text-center">
                      <p className="font-bold text-amber-700">{data.reference_images_count || referenceImages.length}</p>
                      <p className="text-amber-600">Tham khảo</p>
                    </div>
                  )}
                  {failedImages.length > 0 && (
                    <div className="rounded-lg bg-rose-50 p-2 text-center">
                      <p className="font-bold text-rose-700">{data.total_images_failed || failedImages.length}</p>
                      <p className="text-rose-600">Lỗi</p>
                    </div>
                  )}
                </div>
                
                {/* Detailed image list (expandable) */}
                {(validImages.length > 0 || referenceImages.length > 0) && (
                  <ImageDetailsList 
                    validImages={validImages} 
                    referenceImages={referenceImages}
                    failedImages={failedImages}
                  />
                )}
              </div>
            )}
            
            <p className="mt-2 text-xs text-slate-500">
              Bạn có thể sử dụng mã {data.case_id || data.metadata?.case_id} để tra cứu trong tương lai.
            </p>
          </div>

          {matches.length > 0 && (
            <div>
              <p className="mb-3 text-sm font-semibold text-slate-700">
                Đã tìm thấy {matches.length} hồ sơ người được tìm thấy có khả năng trùng khớp:
              </p>
              <div className="space-y-4">
                {matches.map((match) => (
                  <MatchCard key={match.metadata?.found_id ?? match.contact} match={match} />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {mode === "found" && (
        <>
          {data.found_id && (
            <div className="rounded-2xl bg-slate-900/5 p-4 text-sm text-slate-700">
              <p>
                Mã hồ sơ được cấp:&nbsp;
                <span className="font-semibold text-slate-900">{data.found_id}</span>
              </p>
            </div>
          )}
          {matches.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-6 text-center text-sm text-slate-500">
              Chưa có đối tượng trùng khớp. Hệ thống sẽ tiếp tục ghi nhận điểm dữ liệu mới.
            </div>
          ) : (
            <div className="space-y-4">
              {matches.map((match) => (
                <MatchCard key={match.metadata?.case_id ?? match.contact} match={match} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

ResultPanel.propTypes = {
  mode: PropTypes.oneOf(["missing", "found"]).isRequired,
  data: PropTypes.object
};

