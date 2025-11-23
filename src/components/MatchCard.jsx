import PropTypes from "prop-types";

const confidenceColors = {
  high: "text-green-600 bg-green-50",
  medium: "text-amber-600 bg-amber-50",
  low: "text-red-600 bg-red-50"
};

export default function MatchCard({ match }) {
  const {
    face_similarity: similarity,
    confidence_level: confidenceLevel,
    confidence_score: confidenceScore,
    metadata,
    contact,
    explanation,
    image_url: imageUrl
  } = match;

  const badgeClass =
    confidenceColors[confidenceLevel?.toLowerCase()] ||
    "text-slate-600 bg-slate-100";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm transition hover:shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-slate-500">
          Mã hồ sơ:{" "}
          <span className="font-semibold text-slate-900">
            {metadata?.case_id || metadata?.found_id || "N/A"}
          </span>
        </p>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}>
          Độ tin cậy: {confidenceLevel || "N/A"}
        </span>
      </div>

      <div className="mt-3 flex gap-4">
        {imageUrl && (
          <div className="flex-shrink-0">
            <img
              src={imageUrl}
              alt={metadata?.name || "Ảnh người được tìm thấy"}
              className="h-32 w-32 rounded-xl object-cover shadow-md"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        )}
        <div className="flex-1">
          <p className="text-lg font-semibold text-slate-900">
            {metadata?.name || "Chưa rõ tên"}
          </p>

          <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-600 md:grid-cols-2">
            <p>
              <span className="font-medium text-slate-500">Độ tương đồng:</span>{" "}
              {(similarity * 100).toFixed(1)}%
            </p>
            <p>
              <span className="font-medium text-slate-500">Điểm tin cậy:</span>{" "}
              {(confidenceScore * 100).toFixed(1)}%
            </p>
            <p>
              <span className="font-medium text-slate-500">Liên hệ:</span>{" "}
              {contact || "Chưa cập nhật"}
            </p>
            <p>
              <span className="font-medium text-slate-500">Vị trí cuối:</span>{" "}
              {metadata?.location_last_seen || metadata?.current_location || "Chưa rõ"}
            </p>
          </div>
        </div>
      </div>

      {explanation?.summary && (
        <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-600">
          {explanation.summary}
        </p>
      )}

      {/* Show caution warning if high face similarity but low confidence */}
      {similarity > 0.85 && (confidenceLevel === "LOW" || confidenceLevel === "VERY_LOW") && (
        <div className="mt-3 flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 p-3">
          <span className="text-amber-600 text-lg">⚠️</span>
          <p className="text-sm text-amber-800">
            <span className="font-semibold">CẢNH BÁO:</span> Độ tương đồng khuôn mặt cao nhưng có sự không nhất quán trong thông tin metadata - nên xác minh thêm.
          </p>
        </div>
      )}

      {/* Show recommendations if available */}
      {explanation?.recommendations && explanation.recommendations.length > 0 && (
        <div className="mt-3 rounded-xl bg-blue-50 border border-blue-200 p-3">
          <p className="text-sm font-semibold text-blue-900 mb-2">Khuyến nghị:</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
            {explanation.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

MatchCard.propTypes = {
  match: PropTypes.shape({
    face_similarity: PropTypes.number,
    confidence_level: PropTypes.string,
    confidence_score: PropTypes.number,
    metadata: PropTypes.object,
    contact: PropTypes.string,
    image_url: PropTypes.string,
    explanation: PropTypes.shape({
      summary: PropTypes.string,
      recommendations: PropTypes.arrayOf(PropTypes.string)
    })
  }).isRequired
};

