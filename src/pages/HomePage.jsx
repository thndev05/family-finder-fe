import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";

const featureCards = [
  {
    title: "Nhận diện nâng cao",
    description: "Kết hợp embedding khuôn mặt và vector DB để so khớp ngay lập tức.",
    badge: "AI Pipeline"
  },
  {
    title: "Điều phối nhân đạo",
    description: "Kết nối nhanh giữa gia đình và tổ chức cứu trợ thông qua bảng điều phối.",
    badge: "Realtime"
  },
  {
    title: "Bảo mật dữ liệu",
    description: "Mã hóa metadata, quản lý truy cập theo vai trò và ghi log toàn diện.",
    badge: "Security"
  }
];

const timeline = [
  { step: "1", title: "Thu thập dữ liệu", detail: "Gia đình hoặc tổ chức nhập hồ sơ, tải ảnh rõ nét." },
  { step: "2", title: "Nền tảng xử lý", detail: "AI chuẩn hóa khuôn mặt, trích xuất embedding và lưu vector." },
  { step: "3", title: "So khớp thông minh", detail: "Bilateral search missing/found giúp tăng độ chính xác." },
  { step: "4", title: "Thông báo & điều phối", detail: "Các bên nhận cảnh báo, xem giải thích tự động và liên hệ." }
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-0 h-72 w-72 rounded-full bg-primary-500/20 blur-[160px]" />
        <div className="absolute -left-10 top-40 h-80 w-80 rounded-full bg-blue-500/20 blur-[170px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[200px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-100">
              Family Finder 3.0
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </p>
            <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Nền tảng kết nối người thân thất lạc với tốc độ của AI
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-300">
              Tối ưu toàn bộ hành trình: nhập hồ sơ, tìm kiếm theo ảnh, điều phối nhân lực cứu trợ.
              Sẵn sàng cho các chiến dịch nhân đạo, trung tâm bảo trợ hay lực lượng tìm kiếm chuyên nghiệp.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/finder"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-primary-500 via-blue-500 to-cyan-400 px-6 py-3 text-base font-semibold text-white shadow-2xl shadow-primary-500/40 transition hover:brightness-110"
              >
                Bắt đầu tìm kiếm
              </Link>
              <Link
                to="/cases"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-6 py-3 text-base font-semibold text-white/80 hover:border-white/40"
              >
                Xem các ca tiêu biểu
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <StatCard value="35+" label="Tổ chức nhân đạo đang dùng" trend="Địa phương & quốc tế" />
              <StatCard value="98.2%" label="Tỉ lệ xác thực khuôn mặt" trend="Benchmark nội bộ Q3" />
              <StatCard value="24/7" label="Hỗ trợ vận hành" trend="Đội R&D trực ca" />
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-primary-900/40 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-200">
              Truyền tải dữ liệu an toàn
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white">Dashboard vận hành realtime</h2>
            <p className="mt-2 text-sm text-slate-300">
              Giao diện tổng quan hiển thị ca nổi bật, cảnh báo xác suất cao, lưu lượng server và trạng thái pipeline.
            </p>

            <div className="mt-6 space-y-4">
              {featureCards.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-200">
                    {feature.badge}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm text-slate-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-blue-900/30 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-200">
                Quy trình tác nghiệp
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white">AI kết nối cả hai phía</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Mô hình bilateral search: mỗi hồ sơ mới được đối chiếu hai chiều (missing ↔ found)
                giúp phát hiện các trường hợp tưởng chừng không liên quan nhờ ma trận thời gian - độ tuổi - vị trí.
              </p>
            </div>

            <Link
              to="/insights"
              className="rounded-2xl border border-white/20 px-5 py-2 text-sm font-semibold text-white hover:border-white/40"
            >
              Xem báo cáo insight
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-4">
            {timeline.map((item) => (
              <div key={item.step} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm font-semibold text-primary-300">Bước {item.step}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-slate-300">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-emerald-500/30 via-emerald-500/10 to-slate-900/60 p-8 shadow-2xl shadow-emerald-900/40">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-100">
              Case Highlight
            </p>
            <h3 className="mt-3 text-3xl font-bold text-white">Chiến dịch “Find Home” Q4/2025</h3>
            <p className="mt-4 text-sm text-emerald-50/80">
              47 địa phương đồng bộ dữ liệu lên nền tảng, 362 hồ sơ missing được cập nhật ảnh mới trong 4 tuần.
              AI gợi ý 23 cặp trùng khớp với độ tin cậy &gt; 90%, giúp lực lượng cứu trợ rút ngắn 60% thời gian xác minh.
            </p>
            <ul className="mt-6 space-y-4 text-sm text-emerald-50/90">
              <li>• 6 mô hình embedding chạy song song, auto failover khi tải cao.</li>
              <li>• Dashboard trực quan hóa heatmap vị trí, đảm bảo ưu tiên nguồn lực.</li>
              <li>• Chuẩn hóa quy trình chia sẻ dữ liệu giữa công an, trại trẻ, NGO.</li>
            </ul>

            <Link
              to="/finder"
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-white/90 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
            >
              Dùng thử workflow thực tế
            </Link>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-primary-900/30 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-200">
              Roadmap 2026
            </p>
            <h3 className="mt-3 text-3xl font-bold text-white">Multi-agency Command Center</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary-100">Q1</p>
                <h4 className="mt-1 text-lg font-semibold text-white">Federated Learning</h4>
                <p className="text-sm text-slate-300">Huấn luyện mô hình địa phương, đồng bộ trọng số an toàn.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary-100">Q2</p>
                <h4 className="mt-1 text-lg font-semibold text-white">Voice Intake</h4>
                <p className="text-sm text-slate-300">Ghi nhận mô tả qua cuộc gọi, chuyển thành hồ sơ nhúng AI.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary-100">Q3</p>
                <h4 className="mt-1 text-lg font-semibold text-white">AR Field Kit</h4>
                <p className="text-sm text-slate-300">Đội tìm kiếm dùng kính AR xem gợi ý trực tiếp ngoài hiện trường.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary-100">Q4</p>
                <h4 className="mt-1 text-lg font-semibold text-white">Global Exchange</h4>
                <p className="text-sm text-slate-300">Liên kết với tổ chức quốc tế, chuẩn hóa API trao đổi dữ liệu.</p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
              <p className="text-sm font-semibold text-white">Cần dựng chiến dịch ngay?</p>
              <p className="text-sm text-slate-300">
                Đội chuyên gia Frontend & ML sẵn sàng hỗ trợ dựng dashboard, kết nối backend hiện có chỉ trong 48 giờ.
              </p>
              <Link
                to="/insights"
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-white/90 px-4 py-2 text-xs font-semibold text-slate-900 transition hover:bg-white"
              >
                Đặt demo nhanh
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

