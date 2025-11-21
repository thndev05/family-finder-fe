import { Link } from "react-router-dom";

const spotlightCases = [
  {
    caseId: "DEMO_MISSING_001",
    name: "Nguyễn Gia Hân",
    age: 12,
    lastSeen: "Đà Nẵng, 08/2024",
    status: "Đang đối chiếu",
    matchScore: 0.86,
    summary:
      "Cập nhật ảnh từ camera trường học và lời kể của bạn cùng lớp. AI đề xuất 2 điểm trùng khớp."
  },
  {
    caseId: "DEMO_FOUND_014",
    name: "Unidentified Male #014",
    age: "20-25",
    lastSeen: "TP.HCM, 10/2024",
    status: "Chờ xác minh",
    matchScore: 0.78,
    summary:
      "Được tìm thấy bởi đội cứu trợ B31. Kết quả gợi ý trùng với hồ sơ mất tích tại Cần Thơ."
  },
  {
    caseId: "DEMO_MISSING_045",
    name: "Phạm Thành Đạt",
    age: 34,
    lastSeen: "Hải Phòng, 05/2023",
    status: "Ưu tiên cao",
    matchScore: 0.91,
    summary:
      "Gia đình vừa cung cấp ảnh lúc trưởng thành. Hệ thống nhận diện cao với dữ liệu từ camera giao thông."
  }
];

const pipelineStats = [
  { label: "Hồ sơ missing mới", value: "128", trend: "+18% tuần này" },
  { label: "Hồ sơ found mới", value: "76", trend: "+9% tuần này" },
  { label: "Điểm trùng khớp", value: "34", trend: "12 ca mức cao" },
  { label: "Thời gian phản hồi", value: "2.1s", trend: "-0.3s so với tuần trước" }
];

export default function CasesPage() {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-0 h-72 w-72 rounded-full bg-primary-500/20 blur-[180px]" />
        <div className="absolute right-0 top-32 h-72 w-72 rounded-full bg-cyan-500/10 blur-[200px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <header className="rounded-[32px] border border-white/10 bg-white/5 px-8 py-10 shadow-2xl shadow-primary-900/30 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-200">
            Caseboard vận hành
          </p>
          <h1 className="mt-4 text-4xl font-black text-white">Theo dõi real-time các ca trọng điểm</h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            Dữ liệu tổng hợp từ đội tìm kiếm địa phương, camera công cộng và cộng đồng tình nguyện.
            Toàn bộ pipeline tập trung vào việc ưu tiên các ca có khả năng kết nối cao nhất.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            {pipelineStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <p className="text-xs uppercase tracking-widest text-primary-100">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-slate-400">{stat.trend}</p>
              </div>
            ))}
          </div>
        </header>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          {spotlightCases.map((item) => (
            <div
              key={item.caseId}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-900/40 backdrop-blur"
            >
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-primary-100">
                {item.caseId}
                <span className="rounded-full border border-white/20 px-3 py-0.5 text-white/80">
                  {item.status}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-bold text-white">{item.name}</h3>
              <p className="text-sm text-slate-300">
                Tuổi: {item.age} • Lần cuối: {item.lastSeen}
              </p>
              <p className="mt-4 text-sm text-slate-200">{item.summary}</p>
              <div className="mt-5 rounded-2xl bg-slate-900/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Độ tin cậy gợi ý
                </p>
                <p className="text-3xl font-bold text-white">{(item.matchScore * 100).toFixed(0)}%</p>
                <p className="text-xs text-slate-400">Kết hợp similarity + confidence scoring</p>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-14 rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-blue-900/30 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-200">
                Toàn bộ hồ sơ
              </p>
              <h2 className="mt-2 text-3xl font-bold text-white">Danh sách hoạt động gần nhất</h2>
              <p className="text-sm text-slate-300">Tự động cập nhật mỗi 15 phút từ pipeline ingest.</p>
            </div>
            <Link
              to="/finder"
              className="rounded-2xl border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:border-white/40"
            >
              Đưa thêm hồ sơ
            </Link>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm text-slate-200">
              <thead className="bg-white/5 text-xs uppercase tracking-widest text-slate-400">
                <tr>
                  <th className="px-4 py-3">Mã</th>
                  <th className="px-4 py-3">Họ tên / mô tả</th>
                  <th className="px-4 py-3">Địa điểm</th>
                  <th className="px-4 py-3">Trạng thái</th>
                  <th className="px-4 py-3">Độ ưu tiên</th>
                  <th className="px-4 py-3">Cập nhật</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-slate-950/30">
                {Array.from({ length: 6 }).map((_, index) => (
                  <tr key={index} className="hover:bg-white/5">
                    <td className="px-4 py-3 font-mono text-xs text-primary-100">
                      CASE_{180 + index}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-white">
                        {index % 2 === 0 ? "Hồ sơ Missing" : "Hồ sơ Found"}
                      </p>
                      <p className="text-xs text-slate-400">Tải lên bởi đội trực {index + 1}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">
                      {index % 2 === 0 ? "Hà Nội" : "TP.HCM"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border border-white/20 px-3 py-1 text-xs">
                        {index % 2 === 0 ? "Đang ghép" : "Đợi xác minh"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-primary-200">
                      {index % 3 === 0 ? "Cao" : index % 3 === 1 ? "Trung bình" : "Giám sát"}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400">{index + 1}h trước</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

