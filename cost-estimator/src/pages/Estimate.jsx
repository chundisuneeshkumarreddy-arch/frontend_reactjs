import ProjectPage from '../components/ProjectPage';
import ProjectStatus from '../components/ProjectStatus';
import useProjectView from '../hooks/useProjectView';

function Estimate() {
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
        title="Estimate"
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
      />
    );
  }

  return (
    <ProjectPage
      title="Estimate"
      project={project}
      isNested={isNested}
    >
      <div className="detail-content">
        <h2>Estimate</h2>

        <p>
          Estimated hours: {project.hours} hrs
        </p>

        <p>
          Estimated cost: ₹{project.finalCost}
        </p>
      </div>
    </ProjectPage>
  );
}

export default Estimate;