import { Link } from 'react-router-dom';

function ProjectStatus({
  title,
  isLoading,
  error,
  onRetry
}) {
  if (isLoading) {
    return (
      <div className="page">
        <h1>{title}</h1>

        <div className="skeleton">
          Loading {title.toLowerCase()}...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h1>{title}</h1>

        <div className="error-box">
          <h2>Something went wrong</h2>
          <p>{error.message}</p>

          <button
            className="retry-button"
            onClick={onRetry}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>{title}</h1>

      <div className="empty">
        <h2>No project selected</h2>
        <p>
          Open a project to see its {title.toLowerCase()}.
        </p>

        <Link to="/projects">Browse Projects</Link>
      </div>
    </div>
  );
}

export default ProjectStatus;