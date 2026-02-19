import { NavLink, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage.jsx';
import JobsPage from './pages/JobsPage.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';

const App = () => {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h1>AutoApply AI</h1>
        <nav>
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/jobs">Jobs</NavLink>
          <NavLink to="/analytics">Analytics</NavLink>
        </nav>
      </aside>
      <main className="content">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
