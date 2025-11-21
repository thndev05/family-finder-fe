export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950/90 text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="text-base font-semibold text-white">Family Finder AI</p>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Family Finder. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
          <span>Liên hệ: ops@familyfinder.ai</span>
          <span>Support 24/7</span>
          <span>v3.0.0</span>
        </div>
      </div>
    </footer>
  );
}

