import axios from 'axios';

const API_BASE_URL = 'http://localhost:8087/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/userAuthentication/login', credentials),
  register: (userData) => api.post('/userAuthentication/register', userData),
};

// Task APIs
export const taskAPI = {
  getAllTasks: () => api.get('/tasks/allTask'),
  createTask: (taskData) => api.post('/tasks/createTask', taskData),
  getTasksByUser: (email) => api.get(`/tasks/user/${email}`, { params: { assignedToEmail: email } }),
  updateTaskStatus: (id, status) => api.patch(`/tasks/${id}/status`, null, { params: { taskStatus: status } }),
};

// Issue APIs
export const issueAPI = {
  createIssue: (issueData) => api.post('/issues/create', issueData),
  getIssueById: (id) => api.get(`/issues/${id}`),
  getIssuesByAssignee: (email) => api.get(`/issues/assign/${email}`),
  updateIssueStatus: (id, status) => api.patch(`/issues/${id}/status`, null, { params: { issueStatus: status } }),
  addComment: (id, body) => api.post(`/issues/${id}/comments`, body),
};

// Board APIs
export const boardAPI = {
  createBoard: (boardData) => api.post('/boards/create_board', boardData),
  getBoardById: (id) => api.get(`/boards/${id}`),
  getBoardColumns: (id) => api.get(`/boards/${id}/columns`),
  addColumn: (id, columnData) => api.post(`/boards/${id}/columns`, columnData),
  addCard: (id, cardData) => api.post(`/boards/${id}/cards`, cardData),
  moveCard: (boardId, cardId, moveData) => api.post(`/boards/${boardId}/cards/${cardId}/move`, moveData),
};

// Sprint APIs
export const sprintAPI = {
  createSprint: (sprintData) => api.post('/sprints/create', sprintData),
  assignIssueToSprint: (sprintId, issueId) => api.put(`/sprints/assign/${sprintId}/${issueId}`),
  startSprint: (sprintId) => api.put(`/sprints/${sprintId}/start`),
  closeSprint: (sprintId) => api.put(`/sprints/${sprintId}/close`),
  getBurnDown: (sprintId) => api.get(`/sprints/${sprintId}/burnDown`),
};

// Notification APIs
export const notificationAPI = {
  getNotifications: (email) => api.get(`/notifications?userEmail=${email}`),
  markAsRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllAsRead: (email) => api.patch(`/notifications/markAllRead?userEmail=${email}`),
};

export default api;

