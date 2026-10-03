import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import LastProjectContext, {
  readStoredProjectId,
  writeStoredProjectId
} from './LastProjectContext';

function LastProjectProvider({ children }) {
  const [projectId, setStoredProjectId] = useState(readStoredProjectId);

  useEffect(() => {
    writeStoredProjectId(projectId);
  }, [projectId]);

  const setProjectId = useCallback((nextProjectId) => {
    setStoredProjectId(
      nextProjectId === null || nextProjectId === undefined
        ? null
        : String(nextProjectId)
    );
  }, []);

  const value = useMemo(
    () => ({ projectId, setProjectId }),
    [projectId, setProjectId]
  );

  return (
    <LastProjectContext.Provider value={value}>
      {children}
    </LastProjectContext.Provider>
  );
}

export default LastProjectProvider;