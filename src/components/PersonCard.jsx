import PropTypes from "prop-types";

export default function PersonCard({ person }) {
  const { metadata, contact, image_url: imageUrl } = person;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
      <div className="flex gap-4">
        {imageUrl && (
          <div className="flex-shrink-0">
            <img
              src={imageUrl}
              alt={metadata?.name || "Ảnh người"}
              className="h-32 w-32 rounded-xl object-cover shadow-md"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        )}
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500 mb-1">
            Mã hồ sơ:{" "}
            <span className="font-semibold text-slate-900">
              {metadata?.case_id || metadata?.found_id || "N/A"}
            </span>
          </p>
          
          <p className="text-lg font-semibold text-slate-900">
            {metadata?.name || "Chưa rõ tên"}
          </p>

          <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-600 md:grid-cols-2">
            <p>
              <span className="font-medium text-slate-500">Liên hệ:</span>{" "}
              {contact || "Chưa cập nhật"}
            </p>
            <p>
              <span className="font-medium text-slate-500">Vị trí:</span>{" "}
              {metadata?.location_last_seen || metadata?.current_location || "Chưa rõ"}
            </p>
            {metadata?.age_at_disappearance && (
              <p>
                <span className="font-medium text-slate-500">Tuổi khi mất tích:</span>{" "}
                {metadata.age_at_disappearance}
              </p>
            )}
            {metadata?.current_age_estimate && (
              <p>
                <span className="font-medium text-slate-500">Độ tuổi hiện tại:</span>{" "}
                {metadata.current_age_estimate}
              </p>
            )}
            {metadata?.year_disappeared && (
              <p>
                <span className="font-medium text-slate-500">Năm mất tích:</span>{" "}
                {metadata.year_disappeared}
              </p>
            )}
            {metadata?.gender && (
              <p>
                <span className="font-medium text-slate-500">Giới tính:</span>{" "}
                {metadata.gender === "male" ? "Nam" : "Nữ"}
              </p>
            )}
          </div>

          {metadata?.additional_info && (
            <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-600">
              {metadata.additional_info}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

PersonCard.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.string,
    contact: PropTypes.string,
    metadata: PropTypes.object,
    image_url: PropTypes.string
  }).isRequired
};

