import ProjectPage from '../components/ProjectPage';
import ProjectStatus from '../components/ProjectStatus';
import useProjectView from '../hooks/useProjectView';

function Team() {
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
        title="Team"
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
      />
    );
  }

  return (
    <ProjectPage
      title="Team"
      project={project}
      isNested={isNested}
    >
      <div className="detail-content">
        <h2>Team</h2>

        <p>
          Team information for {project.name}
        </p>
      </div>
    </ProjectPage>
  );
}

export default Team;