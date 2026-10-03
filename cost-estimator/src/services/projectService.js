import { api } from './apiClient';

const mockProjects = [
  {
    id: 1,
    name: 'Banking Application',
    client: 'SecureBank Ltd',
    status: 'In Progress',
    ownerId: 1,
    owner: 'Sai',
    startDate: '2025-02-20',
    endDate: '2025-05-22',
    hours: 300,
    finalCost: 65000
  },
  {
    id: 2,
    name: 'Hospital Management System',
    client: 'MediCare Solutions',
    status: 'Pending',
    ownerId: 2,
    owner: 'Maneesh',
    startDate: '2025-04-05',
    endDate: '2025-06-25',
    hours: 250,
    finalCost: 50000
  },
  {
    id: 3,
    name: 'Online Food Delivery App',
    client: 'FreshBite Technologies',
    status: 'Completed',
    ownerId: 3,
    owner: 'Dakshi',
    startDate: '2025-07-10',
    endDate: '2025-09-18',
    hours: 280,
    finalCost: 36000
  }
];

const mockUsers = [
  { id: 1, name: 'Sai' },
  { id: 2, name: 'Maneesh' },
  { id: 3, name: 'Dakshi' }
];

export const getProjects = ({ signal } = {}) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (signal?.aborted) {
        reject(
          new DOMException(
            'The operation was aborted.',
            'AbortError'
          )
        );
        return;
      }

      resolve(mockProjects);
    }, 2500);

    if (signal) {
      signal.addEventListener(
        'abort',
        () => {
          clearTimeout(timer);

          reject(
            new DOMException(
              'The operation was aborted.',
              'AbortError'
            )
          );
        },
        { once: true }
      );
    }
  });
};

export const getProject = (id, { signal } = {}) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (signal?.aborted) {
        reject(
          new DOMException(
            'The operation was aborted.',
            'AbortError'
          )
        );
        return;
      }

      const project = mockProjects.find(
        (item) => String(item.id) === String(id)
      );

      resolve(project || null);
    }, 500);

    if (signal) {
      signal.addEventListener(
        'abort',
        () => {
          clearTimeout(timer);

          reject(
            new DOMException(
              'The operation was aborted.',
              'AbortError'
            )
          );
        },
        { once: true }
      );
    }
  });
};

export const getUsers = ({ signal } = {}) => {
  if (!import.meta.env.VITE_API_BASE_URL) {
    return Promise.resolve(mockUsers);
  }

  return api.get('/users', { signal }).catch(() => mockUsers);
};