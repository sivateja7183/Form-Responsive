import { useState } from 'react';
import ResumeUploader from '../components/ResumeUploader';
import JobSearchPanel from '../components/JobSearchPanel';

const DashboardPage = () => {
  const [resume, setResume] = useState(null);

  return (
    <section>
      <h1>Automation Control Center</h1>
      <div className="grid">
        <ResumeUploader onUploaded={setResume} />
        <JobSearchPanel />
      </div>
      {resume && (
        <div className="card">
          <h3>Latest Resume</h3>
          <p>{resume.original_name}</p>
        </div>
      )}
    </section>
  );
};

export default DashboardPage;
