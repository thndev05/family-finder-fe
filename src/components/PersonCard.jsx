import { useState } from "react";
import PropTypes from "prop-types";

export default function PersonCard({ person }) {
  const { metadata, contact, image_url: imageUrl, images = [] } = person;
  const galleryImages = images || [];
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
      <div className="flex gap-4">
        {imageUrl && (
          <div className="flex-shrink-0">
            <img
              src={imageUrl}
              alt={metadata?.name || "Ảnh người"}
              className="h-32 w-32 rounded-xl object-cover shadow-md"
              onClick={() =>
                setSelectedImage({
                  src: imageUrl,
                  label: metadata?.name || "Ảnh người",
                  meta: metadata
                })
              }
              onError={(e) => {
                e.target.style.display = "none";
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSelectedImage({
                    src: imageUrl,
                    label: metadata?.name || "Ảnh người",
                    meta: metadata
                  });
                }
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

      {galleryImages.length > 0 && (
        <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
            Bộ ảnh tham khảo ({galleryImages.length})
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {galleryImages.map((img) => (
              <div
                key={img.point_id}
                className="rounded-xl border border-white/70 bg-white p-2 shadow-sm"
              >
                {img.image_url ? (
                  <img
                    src={img.image_url}
                    alt={img.image_id || "Ảnh hồ sơ"}
                    className="h-28 w-full rounded-lg object-cover"
                    onClick={() =>
                      setSelectedImage({
                        src: img.image_url,
                        label: img.image_id || metadata?.name || "Ảnh",
                        meta: img
                      })
                    }
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setSelectedImage({
                          src: img.image_url,
                          label: img.image_id || metadata?.name || "Ảnh",
                          meta: img
                        });
                      }
                    }}
                  />
                ) : (
                  <div className="flex h-28 items-center justify-center rounded-lg border border-dashed border-slate-200 text-xs text-slate-400">
                    Không có ảnh
                  </div>
                )}
                <div className="mt-2 text-xs text-slate-600 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">
                      #{(img.image_index ?? 0) + 1}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        img.is_valid_for_matching
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {img.is_valid_for_matching ? "Hợp lệ" : "Tham khảo"}
                    </span>
                  </div>
                  <p>Tuổi: {img.age_at_photo ?? "—"}</p>
                  {img.photo_year && <p>Năm: {img.photo_year}</p>}
                  {typeof img.quality_score === "number" && (
                    <p>Chất lượng: {(img.quality_score * 100).toFixed(0)}%</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl rounded-2xl bg-white p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  {selectedImage.label}
                </p>
                {selectedImage.meta?.validation_status && (
                  <p className="text-xs text-slate-400">
                    Trạng thái: {selectedImage.meta.validation_status}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 flex justify-center">
              <img
                src={selectedImage.src}
                alt={selectedImage.label}
                className="max-h-[70vh] rounded-xl object-contain"
              />
            </div>
            {selectedImage.meta && (
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
                {selectedImage.meta.image_index !== undefined && (
                  <p>
                    <span className="font-semibold">Thứ tự:</span>{" "}
                    #{(selectedImage.meta.image_index ?? 0) + 1}
                  </p>
                )}
                {selectedImage.meta.age_at_photo !== undefined && (
                  <p>
                    <span className="font-semibold">Tuổi:</span>{" "}
                    {selectedImage.meta.age_at_photo ?? "—"}
                  </p>
                )}
                {selectedImage.meta.photo_year && (
                  <p>
                    <span className="font-semibold">Năm chụp:</span>{" "}
                    {selectedImage.meta.photo_year}
                  </p>
                )}
                {selectedImage.meta.quality_score !== undefined && (
                  <p>
                    <span className="font-semibold">Chất lượng:</span>{" "}
                    {(selectedImage.meta.quality_score * 100).toFixed(0)}%
                  </p>
                )}
                {selectedImage.meta.upload_timestamp && (
                  <p className="col-span-2">
                    <span className="font-semibold">Tải lên:</span>{" "}
                    {new Date(selectedImage.meta.upload_timestamp).toLocaleString()}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

PersonCard.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.string,
    contact: PropTypes.string,
    metadata: PropTypes.object,
    image_url: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        point_id: PropTypes.string,
        image_id: PropTypes.string,
        image_index: PropTypes.number,
        image_url: PropTypes.string,
        is_valid_for_matching: PropTypes.bool,
        validation_status: PropTypes.string,
        age_at_photo: PropTypes.number,
        photo_year: PropTypes.number,
        quality_score: PropTypes.number
      })
    )
  }).isRequired
};

