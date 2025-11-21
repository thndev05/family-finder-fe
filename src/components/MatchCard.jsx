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
    explanation
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
            {metadata?.case_id || "N/A"}
          </span>
        </p>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}>
          Độ tin cậy: {confidenceLevel || "N/A"}
        </span>
      </div>

      <p className="mt-2 text-lg font-semibold text-slate-900">
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
          {metadata?.location_last_seen || "Chưa rõ"}
        </p>
      </div>

      {explanation?.summary && (
        <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-600">
          {explanation.summary}
        </p>
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
    explanation: PropTypes.shape({
      summary: PropTypes.string
    })
  }).isRequired
};

