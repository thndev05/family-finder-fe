import PropTypes from "prop-types";

const modes = {
  missing: {
    label: "Đăng ký người mất tích",
    description: "Ghi nhận thông tin để lưu vào cơ sở dữ liệu AI."
  },
  found: {
    label: "Tìm kiếm qua ảnh",
    description: "Tải ảnh người vừa gặp để đối chiếu hồ sơ đã lưu."
  }
};

export default function ModeToggle({ value, onChange }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Object.entries(modes).map(([key, config]) => {
        const isActive = value === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`rounded-2xl border p-5 text-left transition ${
              isActive
                ? "border-transparent bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-lg shadow-primary-500/30"
                : "border-slate-200 bg-white/70 text-slate-700 hover:border-primary-300 hover:bg-white"
            }`}
          >
            <p className="text-base font-semibold">{config.label}</p>
            <p className={`mt-1 text-sm ${isActive ? "text-white/90" : "text-slate-500"}`}>
              {config.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}

ModeToggle.propTypes = {
  value: PropTypes.oneOf(["missing", "found"]).isRequired,
  onChange: PropTypes.func.isRequired
};

