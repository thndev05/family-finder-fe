import PropTypes from "prop-types";

const serviceLabels = {
  face_detector: "Nhận diện khuôn mặt",
  embedding_extractor: "Trích xuất đặc trưng",
  vector_db: "Cơ sở dữ liệu",
  bilateral_search: "Tìm kiếm hai chiều",
  confidence_scoring: "Đánh giá độ tin cậy",
  vector_db_connection: "Kết nối DB"
};

const importantServices = ["face_detector", "embedding_extractor", "vector_db", "bilateral_search"];

export default function HealthStatus({ status }) {
  if (!status) return null;

  const services = status.services || {};
  const allOk = Object.values(services).every(Boolean);
  const importantServicesOk = importantServices.every((key) => services[key] !== false);

  return (
    <div
      className={`rounded-2xl border px-4 py-3 text-sm ${
        allOk
          ? "border-emerald-200 bg-emerald-50/80 text-emerald-800"
          : importantServicesOk
          ? "border-amber-200 bg-amber-50/80 text-amber-800"
          : "border-rose-200 bg-rose-50/80 text-rose-800"
      }`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              allOk ? "bg-emerald-500" : importantServicesOk ? "bg-amber-500" : "bg-rose-500"
            }`}
          />
          <span className="font-semibold">
            {allOk
              ? "Hệ thống hoạt động bình thường"
              : importantServicesOk
              ? "Hệ thống hoạt động với cảnh báo"
              : "Hệ thống gặp sự cố"}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
          {importantServices.map((service) => {
            const isUp = services[service];
            return (
              <div key={service} className="flex items-center gap-1.5">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isUp ? "bg-emerald-500" : "bg-rose-500"
                  }`}
                />
                <span className="text-slate-600">{serviceLabels[service] || service}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

HealthStatus.propTypes = {
  status: PropTypes.shape({
    services: PropTypes.object
  })
};

