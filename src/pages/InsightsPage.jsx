import { Link } from "react-router-dom";

const insightCards = [
  {
    title: "Upload trends",
    metric: "+42%",
    detail: "Sau khi triển khai chiến dịch cộng đồng, số lượng upload ảnh missing tăng mạnh trong 3 tuần."
  },
  {
    title: "Latency map",
    metric: "2.1s",
    detail: "95 percentile thời gian trả kết quả so khớp kể cả khi tải cao, nhờ auto-scaling embedding service."
  },
  {
    title: "Model health",
    metric: "99.4%",
    detail: "Độ ổn định inference từ 4 cụm GPU edge + 1 cụm cloud, giám sát qua Prometheus + Grafana."
  }
];

const experiments = [
  {
    label: "Bilateral Search v2",
    result: "+8.3% précision",
    description: "Thêm trọng số theo thời gian và vị trí giúp loại bỏ các trùng khớp ảo."
  },
  {
    label: "Confidence Explainer",
    result: "-45% thời gian xác minh",
    description: "Tự động sinh mô tả vì sao hệ thống đề xuất, hỗ trợ đội điều phối."
  },
  {
    label: "Age Progression",
    result: "+3.1% recall",
    description: "Fine-tune generator để mô phỏng khuôn mặt theo năm, tăng khả năng tìm kiếm trẻ em mất tích lâu năm."
  }
];

export default function InsightsPage() {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-80 w-80 rounded-full bg-primary-500/20 blur-[200px]" />
        <div className="absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-blue-500/20 blur-[200px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <header className="rounded-[32px] border border-white/10 bg-white/5 px-8 py-10 shadow-2xl shadow-primary-900/40 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-200">
            Insight Hub
          </p>
          <h1 className="mt-4 text-4xl font-black text-white">Dữ liệu vận hành & tối ưu mô hình</h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            Mỗi quyết định ưu tiên nguồn lực đều dựa trên số liệu thực. Trang này giúp đội vận hành, chuyên gia AI
            và đối tác nhân đạo cùng nhìn thấy bức tranh chung để phản hồi nhanh nhất.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link
              to="/finder"
              className="rounded-2xl bg-gradient-to-r from-primary-500 to-blue-500 px-4 py-2 font-semibold text-white"
            >
              Truy cập Finder
            </Link>
            <Link
              to="/cases"
              className="rounded-2xl border border-white/20 px-4 py-2 font-semibold text-white/80 hover:border-white/40"
            >
              Xem Caseboard
            </Link>
          </div>
        </header>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          {insightCards.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-900/40 backdrop-blur"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-100">
                {item.title}
              </p>
              <p className="mt-3 text-4xl font-black text-white">{item.metric}</p>
              <p className="mt-3 text-sm text-slate-300">{item.detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-blue-900/30 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-200">
              A/B Experiments
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white">Các thử nghiệm đáng chú ý</h2>
            <div className="mt-8 space-y-6">
              {experiments.map((exp) => (
                <div key={exp.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between text-sm text-primary-100">
                    <span className="font-semibold uppercase tracking-widest">{exp.label}</span>
                    <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80">
                      {exp.result}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-300">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-slate-900/60 via-slate-900/20 to-slate-900/60 p-8 shadow-2xl shadow-primary-900/30">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-200">
              System Health
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white">Pipeline quan sát</h2>

            <div className="mt-6 space-y-4 text-sm">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary-100">
                  Embedding service
                </p>
                <p className="text-lg font-semibold text-white">Load 58% • GPU latency 42ms</p>
                <p className="text-xs text-slate-400">Auto scale threshold 70%</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary-100">
                  Vector DB
                </p>
                <p className="text-lg font-semibold text-white">Cluster A: 12TB / 16TB</p>
                <p className="text-xs text-slate-400">RPO 5 phút, replication 3 vùng</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary-100">
                  Alert Center
                </p>
                <p className="text-lg font-semibold text-white">8 cảnh báo mở</p>
                <p className="text-xs text-slate-400">4 cần hành động trong 1 giờ</p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
              <p className="text-sm font-semibold text-white">Cần báo cáo tùy chỉnh?</p>
              <p className="text-sm text-slate-300">
                Kết nối dữ liệu với PowerBI/Looker hoặc export raw data để phân tích nội bộ.
              </p>
              <Link
                to="/finder"
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-white/90 px-4 py-2 text-xs font-semibold text-slate-900 transition hover:bg-white"
              >
                Nhận API key
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

