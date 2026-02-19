const JobsTable = ({ jobs, onAssistApply }) => {
  return (
    <div className="card">
      <h2>Extracted Jobs</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.company || 'N/A'}</td>
              <td>{job.location || 'N/A'}</td>
              <td>{job.status}</td>
              <td>
                <button onClick={() => onAssistApply(job.id)}>Assist Apply</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobsTable;
