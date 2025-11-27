import { useEffect, useState } from "react";
import ModeToggle from "../components/ModeToggle";
import UploadForm from "../components/UploadForm";
import ResultPanel from "../components/ResultPanel";
import SearchResultPanel from "../components/SearchResultPanel";
import StatCard from "../components/StatCard";
import HealthStatus from "../components/HealthStatus";
import Toast from "../components/Toast";
import { parseValidationError } from "../utils/errorParser";
import {
  uploadMissingPerson,
  uploadFoundPerson,
  uploadMissingPersonBatch,
  uploadFoundPersonBatch,
  searchMissingByCaseId,
  searchFoundById,
  getHealthStatus
} from "../services/familyService";

const searchPlaceholders = {
  missing: {
    label: "Tra cứu hồ sơ mất tích",
    placeholder: "Nhập mã hồ sơ (VD: MISS_id_001)"
  },
  found: {
    label: "Tra cứu người được tìm thấy",
    placeholder: "Nhập mã hồ sơ (VD: FOUND_id_001)"
  }
};

export default function FinderPage() {
  const [mode, setMode] = useState("found");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [toast, setToast] = useState(null);
  const [healthStatus, setHealthStatus] = useState(null);
  const [searchMode, setSearchMode] = useState("missing");
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    getHealthStatus()
      .then(setHealthStatus)
      .catch(() => setHealthStatus(null));
  }, []);

  const handleUpload = async (payload) => {
    // Handle frontend validation errors
    if (payload?.error) {
      setToast({
        message: payload.message,
        type: "error"
      });
      return;
    }

    setLoading(true);
    setToast(null);
    setResult(null);

    try {
      let data;
      
      // Use batch upload if multiple images or explicitly flagged
      if (payload.isBatch || (Array.isArray(payload.imageFiles) && payload.imageFiles.length > 1)) {
        data =
          mode === "missing"
            ? await uploadMissingPersonBatch({
                imageFiles: payload.imageFiles,
                metadata: payload.metadata,
                imageMetadataArray: payload.imageMetadataList || null
              })
            : await uploadFoundPersonBatch({
                imageFiles: payload.imageFiles,
                metadata: payload.metadata,
                imageMetadataArray: payload.imageMetadataList || null
              });
      } else {
        // Single image upload (backward compatible)
        const imageFile = Array.isArray(payload.imageFiles) ? payload.imageFiles[0] : payload.imageFile;
        data =
          mode === "missing"
            ? await uploadMissingPerson({ imageFile, metadata: payload.metadata })
            : await uploadFoundPerson({ imageFile, metadata: payload.metadata });
      }
      
      setResult(data);
      
      // Enhanced success message for batch uploads
      const imageCount = Array.isArray(payload.imageFiles) ? payload.imageFiles.length : 1;
      const validCount = data.matching_images_count || (data.valid_images?.length || 0);
      const refCount = data.reference_images_count || (data.reference_images?.length || 0);
      
      let message;
      if (imageCount > 1) {
        if (validCount > 0 && refCount > 0) {
          message = `Đã tải lên ${imageCount} ảnh: ${validCount} ảnh dùng để tìm kiếm, ${refCount} ảnh lưu để tham khảo.`;
        } else if (validCount > 0) {
          message = `Đã tải lên ${imageCount} ảnh, tất cả đều dùng để tìm kiếm.`;
        } else {
          message = `Đã tải lên ${imageCount} ảnh (lưu để tham khảo).`;
        }
      } else {
        message =
          mode === "missing"
            ? "Đăng ký hồ sơ thành công. Bạn có thể tiếp tục theo dõi kết quả."
            : "Đã phân tích ảnh. Vui lòng kiểm tra danh sách gợi ý.";
      }
      
      setToast({
        message,
        type: "success"
      });
    } catch (error) {
      const errorMessage = parseValidationError(error);
      setToast({
        message: errorMessage,
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchId.trim()) return;

    try {
      const data =
        searchMode === "missing"
          ? await searchMissingByCaseId(searchId.trim())
          : await searchFoundById(searchId.trim());
      setSearchResult({
        id: searchId.trim(),
        type: searchMode,
        payload: data
      });
    } catch (error) {
      setSearchResult({
        id: searchId.trim(),
        type: searchMode,
        error: error.message || "Không tìm thấy kết quả."
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-10 h-72 w-72 rounded-full bg-primary-500/40 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-500/30 blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <header className="rounded-4xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-900/40 px-8 py-10 text-white shadow-2xl shadow-primary-900/40 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-200">
            Family Finder AI
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
            Hỗ trợ tìm kiếm người thân bằng công nghệ AI nhận diện khuôn mặt
          </h1>
          <p className="mt-4 max-w-3xl text-base text-slate-200">
            Tải ảnh và thông tin cơ bản để hệ thống đối chiếu với hàng ngàn hồ sơ đã lưu,
            đưa ra gợi ý với độ tin cậy cao và thời gian xử lý chỉ vài giây.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <StatCard value="2.5K+" label="Hồ sơ người mất tích" trend="+120 tuần qua" />
            <StatCard value="180+" label="Ca ghép nối thành công" trend="Cập nhật realtime" />
            <StatCard value="~2.1s" label="Thời gian phản hồi trung bình" />
          </div>
        </header>

        <div className="mt-8 space-y-5">
          <HealthStatus status={healthStatus} />
        </div>

        <section className="mt-8 space-y-6">
          <ModeToggle value={mode} onChange={setMode} />

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-white/10 bg-white/95 p-6 shadow-xl shadow-slate-200/80">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">
                Bước 1
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {mode === "missing" ? "Đăng ký & lưu trữ hồ sơ" : "Tìm kiếm bằng ảnh mới"}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Điền thông tin chính xác nhất có thể và tải ảnh rõ khuôn mặt để tối ưu kết quả.
              </p>

              <div className="mt-6">
                <UploadForm key={mode} mode={mode} onSubmit={handleUpload} loading={loading} />
              </div>
            </div>

            <ResultPanel mode={mode} data={result} />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-white/10 bg-white/90 p-6 shadow-lg shadow-slate-200/80">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">
                Bước 2 (tuỳ chọn)
              </p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                Tra cứu hồ sơ đã ghi nhận
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Sử dụng mã case_id hoặc found_id để xem trạng thái mới nhất của hồ sơ.
              </p>
            </div>

            <form
              onSubmit={handleSearch}
              className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
            >
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setSearchMode("missing")}
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium ${
                    searchMode === "missing"
                      ? "border-transparent bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  Mất tích
                </button>
                <button
                  type="button"
                  onClick={() => setSearchMode("found")}
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium ${
                    searchMode === "found"
                      ? "border-transparent bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  Được tìm thấy
                </button>
              </div>
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                {searchPlaceholders[searchMode].label}
              </label>
              <input
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder={searchPlaceholders[searchMode].placeholder}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Tra cứu
              </button>
            </form>
          </div>

          {searchResult && (
            <div className="mt-6">
              {searchResult.error ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center">
                  <p className="text-rose-600 font-semibold">{searchResult.error}</p>
                </div>
              ) : (
                <SearchResultPanel
                  searchType={searchResult.type}
                  data={searchResult.payload}
                />
              )}
            </div>
          )}
        </section>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          duration={toast.type === "error" ? 7000 : 5000}
        />
      )}
    </div>
  );
}

