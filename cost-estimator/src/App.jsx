import './App.css';
import { useFetch } from './hooks/useFetch';
import { getProjects, getUsers } from './services/projectService';

const STATUS_STYLES = {
  Completed: 'green',
  'In Progress': 'orange',
  Planned: 'blue'
};

function formatCurrency(amount) {
  if (amount === null || amount === undefined || Number.isNaN(Number(amount))) {
    return 'Not estimated';
  }

  if (Number(amount) === 0) {
    return 'Not estimated';
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

function formatDate(date) {
  if (!date) {
    return '-';
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return '-';
  }

  return parsed.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

function formatHours(hours) {
  const value = Number(hours);

  if (Number.isNaN(value)) {
    return '0 hrs';
  }

  return `${value} hrs`;
}

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || 'gray';

  return <span className={`status-badge ${style}`}>{status || 'Unknown'}</span>;
}

function Detail({ label, value }) {
  return (
    <div className="detail">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-header">
        <div>
          <h2>{project.name}</h2>
          <p>{project.client}</p>
        </div>

        <StatusBadge status={project.status} />
      </div>

      <div className="project-details">
        <Detail label="Owner" value={project.owner} />

        <Detail
          label="Date Range"
          value={`${formatDate(project.startDate)} - ${formatDate(project.endDate)}`}
        />

        <Detail label="Total Hours" value={formatHours(project.hours)} />

        <Detail
          label="Final Estimated Cost"
          value={formatCurrency(project.finalCost)}
        />
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-line large"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>Projects</h1>
      <p>Projects loaded from server</p>
    </div>
  );
}

function App() {
  const { data, isLoading, error, refetch } = useFetch(
    ({ signal }) =>
      Promise.all([getProjects({ signal }), getUsers({ signal })]),
    []
  );

  if (isLoading) {
    return (
      <div className="app">
        <Header />

        <div className="project-list">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <h2>Something went wrong</h2>
          <p>{error.message}</p>
          <button onClick={refetch}>Try Again</button>
        </div>
      </div>
    );
  }

  const projects = Array.isArray(data?.[0]) ? data[0] : [];
  const users = Array.isArray(data?.[1]) ? data[1] : [];

  const nameById = Object.fromEntries(
    users.map((user) => [user.id, user.name])
  );

  const projectsWithOwner = projects.map((project) => ({
    ...project,
    owner: nameById[project.ownerId] || 'Unknown'
  }));

  return (
    <div className="app">
      <Header />

      {projectsWithOwner.length === 0 ? (
        <div className="empty">
          <h2>No projects yet</h2>
          <p>Create your first project to start estimating.</p>
        </div>
      ) : (
        <div className="project-list">
          {projectsWithOwner.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
