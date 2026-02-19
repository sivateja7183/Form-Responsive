import { useState } from 'react';
import { uploadResume } from '../api/endpoints';
import { useAsync } from '../hooks/useAsync';

const ResumeUploader = ({ onUploaded }) => {
  const [file, setFile] = useState(null);
  const { run, loading, error } = useAsync(uploadResume);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const { data } = await run(file);
    onUploaded(data.resume);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Upload Resume</h2>
      <input type="file" accept=".txt,.md,.pdf,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0])} />
      <button disabled={!file || loading}>{loading ? 'Uploading...' : 'Upload'}</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default ResumeUploader;
