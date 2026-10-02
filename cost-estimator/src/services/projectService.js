import { api } from './apiClient';

const mockProjects = [
  {
    id: 1,
    name: 'Online Website',
    client: 'Instaweb',
    status: 'In Progress',
    ownerId: 1,
    startDate: '2026-04-09',
    endDate: '2026-08-20',
    hours: 120,
    finalCost: 24000
  },
  {
    id: 2,
    name: 'Medical healthcare',
    client: 'Care Labs',
    status: 'Pending',
    ownerId: 2,
    startDate: '2026-01-09',
    endDate: '2026-06-10',
    hours: 96,
    finalCost: 18500
  }
];

const mockUsers = [
  { id: 1, name: 'Maneesh' },
  { id: 2, name: 'Dakshi' }
];

export const getProjects = ({ signal } = {}) => {
  if (!import.meta.env.VITE_API_BASE_URL) {
    return Promise.resolve(mockProjects);
  }

  return api.get('/projects', { signal }).catch(() => mockProjects);
};

export const getUsers = ({ signal } = {}) => {
  if (!import.meta.env.VITE_API_BASE_URL) {
    return Promise.resolve(mockUsers);
  }

  return api.get('/users', { signal }).catch(() => mockUsers);
};