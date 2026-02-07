# Task Management Frontend

A modern React.js frontend for the Task Management application.

## Features

- **Dashboard**: Overview of tasks, statistics, and charts
- **Tasks**: Create, view, update, and manage tasks
- **Boards**: Kanban-style board with drag & drop functionality
- **Issues**: Track bugs, stories, tasks, and epics
- **Sprints**: Sprint planning with burndown charts
- **Team**: View and manage team members
- **Settings**: Configure application preferences

## Tech Stack

- React.js 18
- React Router DOM (Navigation)
- Axios (API calls)
- Chart.js & React-Chartjs-2 (Charts)
- React Icons (Icons)
- CSS3 (Custom styling)

## Prerequisites

- Node.js 16+ installed
- Backend server running on `http://localhost:8087`

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Header.js
│   │   ├── Modal.js
│   │   └── Sidebar.js
│   ├── context/          # React Context providers
│   │   └── AuthContext.js
│   ├── pages/            # Page components
│   │   ├── Dashboard.js
│   │   ├── Tasks.js
│   │   ├── Boards.js
│   │   ├── Issues.js
│   │   ├── Sprints.js
│   │   ├── Team.js
│   │   ├── Settings.js
│   │   ├── Login.js
│   │   └── Register.js
│   ├── services/         # API services
│   │   └── api.js
│   ├── styles/           # CSS styles
│   │   └── App.css
│   ├── App.js            # Main app component
│   └── index.js          # Entry point
└── package.json
```

## API Integration

The frontend connects to the following backend APIs:

- **Auth**: `/api/userAuthentication/login`, `/api/userAuthentication/register`
- **Tasks**: `/api/tasks/*`
- **Issues**: `/api/issues/*`
- **Boards**: `/api/boards/*`
- **Sprints**: `/api/sprints/*`

## Available Scripts

- `npm start` - Runs the development server
- `npm test` - Runs tests
- `npm run build` - Builds for production
- `npm run eject` - Ejects from Create React App

## Demo Mode

The frontend includes mock data for demonstration. It will work even if the backend is not running, displaying sample tasks, issues, and boards.

## Screenshots

### Dashboard
- Task statistics cards
- Task distribution chart
- Weekly progress bar chart
- Recent tasks list

### Kanban Board
- Drag & drop cards between columns
- Add new columns and cards
- Visual priority indicators

### Task Management
- Filterable task table
- Status dropdown updates
- Priority badges
- Create task modal

## Customization

### Changing API URL

Update the `API_BASE_URL` in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8087/api';
```

### Theming

Modify CSS variables in `src/styles/App.css`:

```css
:root {
  --primary-color: #4f46e5;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

