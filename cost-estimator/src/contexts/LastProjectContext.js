import { createContext, useContext } from 'react';

const STORAGE_KEY = 'projecthub:last-project-id';

const LastProjectContext = createContext(null);

function readStoredProjectId() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeStoredProjectId(projectId) {
  try {
    if (projectId) {
      window.localStorage.setItem(STORAGE_KEY, projectId);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    return;
  }
}

function useLastProject() {
  const context = useContext(LastProjectContext);

  if (!context) {
    throw new Error(
      'useLastProject must be used within a LastProjectProvider'
    );
  }

  return context;
}

export { readStoredProjectId, writeStoredProjectId, useLastProject };

export default LastProjectContext;