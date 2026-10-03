import { useOutletContext } from 'react-router-dom';

import { useLastProject } from '../contexts/LastProjectContext';
import { getProject } from '../services/projectService';
import { useFetch } from './useFetch';

function useProjectView() {
  const outletContext = useOutletContext();
  const { projectId: lastProjectId } = useLastProject();

  const nestedProject = outletContext?.project ?? null;
  const projectId = nestedProject
    ? nestedProject.id
    : lastProjectId;

  const {
    data,
    isLoading,
    error,
    refetch
  } = useFetch(
    ({ signal }) =>
      nestedProject
        ? Promise.resolve(null)
        : getProject(projectId, { signal }),
    [projectId, nestedProject]
  );

  return {
    project: nestedProject ?? data ?? null,
    isNested: Boolean(nestedProject),
    isLoading: nestedProject ? false : Boolean(projectId) && isLoading,
    error,
    refetch
  };
}

export default useProjectView;