import ProjectPage from '../components/ProjectPage';
import ProjectStatus from '../components/ProjectStatus';
import useProjectView from '../hooks/useProjectView';

function Overview() {
  const {
    project,
    isNested,
    isLoading,
    error,
    refetch
  } = useProjectView();

  if (isLoading || error || !project) {
    return (
      <ProjectStatus
        title="Overview"
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
      />
    );
  }

  return (
    <ProjectPage
      title="Overview"
      project={project}
      isNested={isNested}
    >
      <div className="detail-content">
        <h2>Overview</h2>

        <div className="info-grid">
          <div>
            <span>Client</span>
            <strong>{project.client}</strong>
          </div>

          <div>
            <span>Status</span>
            <strong>{project.status}</strong>
          </div>

          <div>
            <span>Hours</span>
            <strong>{project.hours} hrs</strong>
          </div>

          <div>
            <span>Cost</span>
            <strong>₹{project.finalCost}</strong>
          </div>
        </div>
      </div>
    </ProjectPage>
  );
}

export default Overview;