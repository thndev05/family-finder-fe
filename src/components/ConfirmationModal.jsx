import PropTypes from "prop-types";

export default function ConfirmationModal({ isOpen, onClose, onConfirm, data, mode, imagePreview }) {
  if (!isOpen) return null;

  const formatValue = (key, value) => {
    if (key === "gender") {
      return value === "male" ? "Nam" : "Nữ";
    }
    if (key === "description") {
      return value || "Không có";
    }
    return value || "Chưa nhập";
  };

  const labels = {
    name: "Họ và tên",
    age_at_disappearance: "Tuổi khi mất tích",
    year_disappeared: "Năm mất tích",
    gender: "Giới tính",
    location_last_seen: "Địa điểm cuối cùng",
    contact: "Liên hệ gia đình",
    description: "Mô tả bổ sung",
    current_age_estimate: "Độ tuổi hiện tại (ước tính)",
    current_location: "Địa điểm hiện tại",
    finder_contact: "Liên hệ người tìm thấy"
  };

  const displayFields = mode === "missing" 
    ? ["name", "age_at_disappearance", "year_disappeared", "gender", "location_last_seen", "contact", "description"]
    : ["name", "current_age_estimate", "gender", "current_location", "finder_contact", "description"];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="rounded-t-2xl bg-gradient-to-r from-primary-600 to-blue-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white">
            Xác nhận thông tin {mode === "missing" ? "người mất tích" : "người được tìm thấy"}
          </h2>
          <p className="mt-1 text-sm text-white/90">
            Vui lòng kiểm tra lại thông tin trước khi gửi
          </p>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto px-6 py-4">
          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-4">
              <p className="mb-2 text-sm font-semibold text-slate-600">Ảnh đã tải lên:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="h-48 w-full rounded-xl object-cover shadow-md"
              />
            </div>
          )}

          {/* Form Data */}
          <div className="space-y-3">
            {displayFields.map((field) => {
              const value = data[field];
              if (field === "name" && mode === "found" && !value) {
                return null; // Skip empty name for found mode
              }
              return (
                <div key={field} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {labels[field]}
                  </p>
                  <p className="mt-1 text-base text-slate-900">
                    {formatValue(field, value)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border-2 border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-400"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-gradient-to-r from-primary-600 to-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary-500/30 transition hover:brightness-110"
          >
            Xác nhận & Gửi
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  mode: PropTypes.oneOf(["missing", "found"]).isRequired,
  imagePreview: PropTypes.string
};

