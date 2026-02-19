import { useEffect, useState } from 'react';
import { getAnalytics } from '../api/endpoints';

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    getAnalytics().then(({ data }) => setAnalytics(data.analytics));
  }, []);

  if (!analytics) return <p>Loading analytics...</p>;

  return (
    <section>
      <h1>Analytics</h1>
      <div className="grid">
        <div className="card"><h3>Total Jobs</h3><p>{analytics.totals.jobs}</p></div>
        <div className="card"><h3>Applications</h3><p>{analytics.totals.applications}</p></div>
        <div className="card"><h3>Average Match</h3><p>{analytics.avgScore}%</p></div>
      </div>
      <div className="card">
        <h3>Pipeline</h3>
        <pre>{JSON.stringify(analytics.pipeline, null, 2)}</pre>
      </div>
    </section>
  );
};

export default AnalyticsPage;
