import { useState } from 'react';
import { startSearch } from '../api/endpoints';
import { useAsync } from '../hooks/useAsync';

const JobSearchPanel = () => {
  const [keywords, setKeywords] = useState('Full Stack');
  const [location, setLocation] = useState('Remote');
  const { run, loading, error } = useAsync(startSearch);

  const onSubmit = async (e) => {
    e.preventDefault();
    await run({ keywords, location });
  };

  return (
    <form className="card" onSubmit={onSubmit}>
      <h2>Start Job Search</h2>
      <input value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="Keywords" required />
      <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
      <button disabled={loading}>{loading ? 'Queued...' : 'Search Jobs'}</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default JobSearchPanel;
