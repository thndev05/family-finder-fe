import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import FinderPage from "./pages/FinderPage";
import CasesPage from "./pages/CasesPage";
import InsightsPage from "./pages/InsightsPage";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/finder" element={<FinderPage />} />
        <Route path="/cases" element={<CasesPage />} />
        <Route path="/insights" element={<InsightsPage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
