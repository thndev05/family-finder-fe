import PropTypes from "prop-types";
import MatchCard from "./MatchCard";

const formatProcessingTime = (ms) => {
  if (typeof ms !== "number") return null;
  if (ms >= 1000) {
    return `${(ms / 1000).toFixed(2)} giây`;
  }
  return `${ms.toFixed(0)} ms`;
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

