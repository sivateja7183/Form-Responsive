import { useEffect, useState } from 'react';
import JobsTable from '../components/JobsTable';
import { assistApply, getJobs } from '../api/endpoints';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);

  const load = async () => {
    const { data } = await getJobs();
    setJobs(data.jobs || []);
  };

  useEffect(() => {
    load();
  }, []);

  const onAssistApply = async (jobId) => {
    await assistApply({ jobId, answers: { firstName: 'Demo', lastName: 'User' } });
    await load();
  };

  return (
    <section>
      <h1>Jobs</h1>
      <JobsTable jobs={jobs} onAssistApply={onAssistApply} />
    </section>
  );
};

export default JobsPage;
