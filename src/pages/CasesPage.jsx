import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCases } from "../services/familyService";

export default function CasesPage() {
  const [cases, setCases] = useState({ missing: [], found: [] });
  const [allCasesList, setAllCasesList] = useState([]);
  const [stats, setStats] = useState({
    totalMissing: 0,
    totalFound: 0,
    totalCases: 0,
    highPriorityCases: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllCases(100);
      
      if (data.success) {
        setCases(data.cases || { missing: [], found: [] });
        // Combine and sort all cases by confidence score
        const allCases = [
          ...(data.cases?.missing || []).map(c => ({ ...c, type: 'missing' })),
          ...(data.cases?.found || []).map(c => ({ ...c, type: 'found' }))
        ].sort((a, b) => (b.confidence_score || 0) - (a.confidence_score || 0));
        
        setAllCasesList(allCases);
        
        // Calculate high priority cases (confidence >= 0.7)
        const highPriorityCount = allCases.filter(c => (c.confidence_score || 0) >= 0.7).length;
        
        // Set stats
        setStats({
          totalMissing: data.statistics?.total_missing || 0,
          totalFound: data.statistics?.total_found || 0,
          totalCases: data.statistics?.total_cases || 0,
          highPriorityCases: highPriorityCount
        });
      }
    } catch (err) {
      console.error("Failed to fetch cases:", err);
      setError(err.message || "Không thể tải dữ liệu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  // Get top 3 cases with highest confidence scores for spotlight
  const getSpotlightCases = () => {
    const allCases = [
      ...(cases.missing || []).map(c => ({ ...c, type: 'missing' })),
      ...(cases.found || []).map(c => ({ ...c, type: 'found' }))
    ]
      .sort((a, b) => (b.confidence_score || 0) - (a.confidence_score || 0))
      .slice(0, 3);
    
    return allCases.map((c) => {
      const metadata = c.metadata || {};
      const isMissing = c.type === 'missing';
      
      return {
        caseId: isMissing ? metadata.case_id : metadata.found_id,
        name: metadata.name || (isMissing ? "Người mất tích" : "Người được tìm thấy"),
        age: isMissing 
          ? metadata.age_at_disappearance 
          : metadata.current_age_estimate || metadata.current_age_range,
        lastSeen: isMissing 
          ? `${metadata.location_last_seen || 'Không xác định'}, ${metadata.year_disappeared || ''}`
          : `${metadata.current_location || 'Không xác định'}, ${new Date(metadata.upload_timestamp || Date.now()).toLocaleDateString('vi-VN')}`,
        status: getStatus(c.confidence_level, c.confidence_score),
        matchScore: c.confidence_score || 0,
        summary: isMissing
          ? metadata.description || `Mất tích năm ${metadata.year_disappeared || 'N/A'}. Độ tin cậy: ${((c.confidence_score || 0) * 100).toFixed(0)}%`
          : metadata.description || `Được tìm thấy. Độ tin cậy: ${((c.confidence_score || 0) * 100).toFixed(0)}%`
      };
    });
  };

  const getStatus = (confidenceLevel, confidenceScore) => {
    if (confidenceScore >= 0.8) return "Ưu tiên cao";
    if (confidenceScore >= 0.7) return "Đang đối chiếu";
    if (confidenceScore >= 0.6) return "Chờ xác minh";
    return "Giám sát";
  };

  const formatCaseForTable = (caseItem) => {
    const metadata = caseItem.metadata || {};
    const isMissing = caseItem.type === 'missing';
    
    const caseId = isMissing ? metadata.case_id : metadata.found_id;
    const name = metadata.name || (isMissing ? "Người mất tích" : "Người được tìm thấy");
    const location = isMissing ? metadata.location_last_seen : metadata.current_location;
    
    // Format upload timestamp
    const uploadTime = metadata.upload_timestamp;
    let timeAgo = "Vừa xong";
    if (uploadTime) {
      const uploadDate = new Date(uploadTime);
      const now = new Date();
      const diffMs = now - uploadDate;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHours / 24);
      
      if (diffDays > 0) {
        timeAgo = `${diffDays} ngày trước`;
      } else if (diffHours > 0) {
        timeAgo = `${diffHours}h trước`;
      } else {
        const diffMins = Math.floor(diffMs / (1000 * 60));
        timeAgo = diffMins > 0 ? `${diffMins} phút trước` : "Vừa xong";
      }
    }
    
    return {
      caseId,
      name,
      type: isMissing ? "Hồ sơ Missing" : "Hồ sơ Found",
      location: location || "Không xác định",
      status: getStatus(caseItem.confidence_level, caseItem.confidence_score),
      priority: caseItem.confidence_score >= 0.8 ? "Cao" : caseItem.confidence_score >= 0.6 ? "Trung bình" : "Giám sát",
      timeAgo,
      confidenceScore: caseItem.confidence_score || 0
    };
  };

  const pipelineStats = [
    { 
      label: "Hồ sơ missing mới", 
      value: stats.totalMissing.toString(), 
      trend: `${stats.totalMissing} hồ sơ` 
    },
    { 
      label: "Hồ sơ found mới", 
      value: stats.totalFound.toString(), 
      trend: `${stats.totalFound} hồ sơ` 
    },
    { 
      label: "Điểm trùng khớp", 
      value: stats.highPriorityCases.toString(), 
      trend: `${stats.highPriorityCases} ca mức cao` 
    },
    { 
      label: "Tổng số cases", 
      value: stats.totalCases.toString(), 
      trend: "Tất cả hồ sơ" 
    }
  ];

  const spotlightCases = getSpotlightCases();
  const tableCases = allCasesList.slice(0, 20).map(formatCaseForTable);

  if (loading) {
    return (
      <div className="relative overflow-hidden bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-slate-300">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative overflow-hidden bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchCases}
            className="rounded-2xl border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:border-white/40"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }
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
          {spotlightCases.length > 0 ? (
            spotlightCases.map((item, index) => (
              <div
                key={item.caseId || index}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-900/40 backdrop-blur"
              >
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-primary-100">
                  {item.caseId || `CASE_${index + 1}`}
                  <span className="rounded-full border border-white/20 px-3 py-0.5 text-white/80">
                    {item.status}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-bold text-white">{item.name}</h3>
                <p className="text-sm text-slate-300">
                  Tuổi: {item.age || "N/A"} • Lần cuối: {item.lastSeen || "Không xác định"}
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
            ))
          ) : (
            <div className="col-span-3 text-center py-8 text-slate-400">
              Chưa có dữ liệu. Vui lòng thêm hồ sơ mới.
            </div>
          )}
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
                {tableCases.length > 0 ? (
                  tableCases.map((item, index) => (
                    <tr key={item.caseId || index} className="hover:bg-white/5">
                      <td className="px-4 py-3 font-mono text-xs text-primary-100">
                        {item.caseId || `CASE_${index + 1}`}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-white">{item.type}</p>
                        <p className="text-xs text-slate-400">{item.name}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-300">{item.location}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full border border-white/20 px-3 py-1 text-xs">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-primary-200">{item.priority}</td>
                      <td className="px-4 py-3 text-xs text-slate-400">{item.timeAgo}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-slate-400">
                      Chưa có dữ liệu. Vui lòng thêm hồ sơ mới.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

