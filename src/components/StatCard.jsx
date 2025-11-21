import PropTypes from "prop-types";

export default function StatCard({ value, label, trend }) {
  return (
    <div className="rounded-2xl border border-white/40 bg-white/60 p-4 shadow-sm backdrop-blur">
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
      {trend && <p className="mt-1 text-xs font-semibold text-emerald-600">{trend}</p>}
    </div>
  );
}

StatCard.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  trend: PropTypes.string
};

