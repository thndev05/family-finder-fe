import PropTypes from "prop-types";
import MatchCard from "./MatchCard";
import PersonCard from "./PersonCard";

const formatProcessingTime = (ms) => {
  if (typeof ms !== "number") return null;
  if (ms >= 1000) {
    return `${(ms / 1000).toFixed(2)} giây`;
  }
  return `${ms.toFixed(0)} ms`;
};

export default function SearchResultPanel({ searchType, data }) {
  if (!data) {
    return null;
  }

  const person = searchType === "missing" ? data.missing_person : data.found_person;
  const matches = data.matches || [];
  const totalFound = data.total_found || 0;

  return (
    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-200/70">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary-500">
          Kết quả tìm kiếm
        </p>
        <h3 className="mt-1 text-2xl font-bold text-slate-900">
          {data.message || "Kết quả tra cứu"}
        </h3>
        {data.processing_time_ms && (
          <p className="mt-2 text-sm text-slate-500">
            Thời gian xử lý: {formatProcessingTime(data.processing_time_ms)}
          </p>
        )}
      </div>

      {/* Display the person record itself */}
      {person && (
        <div className="rounded-2xl border-2 border-primary-200 bg-primary-50/50 p-4">
          <p className="text-sm font-semibold text-primary-700 mb-3">
            {searchType === "missing" ? "Thông tin hồ sơ mất tích" : "Thông tin hồ sơ được tìm thấy"}
          </p>
          <PersonCard person={person} />
        </div>
      )}

      {/* Display potential matches */}
      {matches.length > 0 ? (
        <div>
          <p className="mb-3 text-sm font-semibold text-slate-700">
            Đã tìm thấy {totalFound} {searchType === "missing" ? "người được tìm thấy" : "hồ sơ mất tích"} có khả năng trùng khớp:
          </p>
          <div className="space-y-4">
            {matches.map((match) => (
              <MatchCard
                key={match.id || match.metadata?.case_id || match.metadata?.found_id || match.contact}
                match={match}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-6 text-center text-sm text-slate-500">
          {searchType === "missing"
            ? "Chưa có người được tìm thấy nào trùng khớp với hồ sơ này."
            : "Chưa có hồ sơ mất tích nào trùng khớp với người này."}
        </div>
      )}
    </div>
  );
}

SearchResultPanel.propTypes = {
  searchType: PropTypes.oneOf(["missing", "found"]).isRequired,
  data: PropTypes.shape({
    success: PropTypes.bool,
    message: PropTypes.string,
    missing_person: PropTypes.object,
    found_person: PropTypes.object,
    matches: PropTypes.arrayOf(PropTypes.object),
    total_found: PropTypes.number,
    processing_time_ms: PropTypes.number
  })
};

