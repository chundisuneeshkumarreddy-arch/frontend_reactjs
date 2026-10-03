function ProjectPage({
  title,
  project,
  isNested,
  children
}) {
  if (isNested) {
    return children;
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>{title}</h1>
          <p>
            {project.name} &mdash; {project.client}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
}

export default ProjectPage;