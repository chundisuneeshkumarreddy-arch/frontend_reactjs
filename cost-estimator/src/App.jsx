// import React from 'react'; 
// import './app.css';
 
// class App extends React.Component { 
//   constructor() { 
//     super(); 
//     this.state = { 
//       data: [ 
//         { name: 'maneesh' }, 
//         { name: 'sai' }, 
//         { name: 'dakshi' } 
//       ] 
//     }; 
//   } 
 
//   render() { 
//     return ( 
//       <div> 
//         <StudentName /> 
//         <ul> 
//           {this.state.data.map((item, index) => ( 
//             <List key={index} data={item} /> 
//           ))} 
//         </ul>

//         <div className="app">
//           <h1>Projects</h1>

//           <div className="project-list">
//             {projects.map((project) => (
//               <ProjectCard
//                 key={project.id}
//                 project={project}
//               />
//             ))}
//           </div>
//         </div>
//       </div> 
//     ); 
//   } 
// } 
 
// class StudentName extends React.Component { 
//   render() { 
//     return ( 
//       <div> 
//         <h1>Student Name Detail</h1> 
//       </div> 
//     ); 
//   } 
// } 
 
// class List extends React.Component { 
//   render() { 
//     return <li>{this.props.data.name}</li>; 
//   } 
// }

// const projects = [
//   {
//     id: 1,
//     name: 'Ajio',
//     client: 'Ajio Technologies',
//     status: 'In Progress',
//     owner: 'maneesh',
//     startDate: '2026-08-01',
//     endDate: '2026-09-30',
//     hours: 240,
//     finalCost: 530332
//   },
//   {
//     id: 2,
//     name: 'Digital Banking Application',
//     client: 'ABC Bank',
//     status: 'Completed',
//     owner: 'sai',
//     startDate: '2026-06-15',
//     endDate: '2026-08-20',
//     hours: 320,
//     finalCost: 750000
//   },
//   {
//     id: 3,
//     name: 'Healthcare Application',
//     client: 'MediTech Solutions',
//     status: 'Planned',
//     owner: 'dakshi',
//     startDate: '2026-09-10',
//     endDate: '2026-11-30',
//     hours: 180,
//     finalCost: 0
//   }
// ];

// function formatCurrency(amount) {
//   if (amount === 0 || amount === null || amount === undefined) {
//     return 'Not estimated';
//   }

//   return new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//     maximumFractionDigits: 0
//   }).format(amount);
// }

// function formatDate(date) {
//   return new Date(date).toLocaleDateString('en-IN', {
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric'
//   });
// }

// function StatusBadge({ status }) {
//   const statusStyles = {
//     Completed: 'green',
//     'In Progress': 'orange',
//     Planned: 'blue'
//   };

//   const style = statusStyles[status] || 'gray';

//   return (
//     <span className={`status-badge ${style}`}>
//       {status}
//     </span>
//   );
// }

// function Detail({ label, value }) {
//   return (
//     <div className="detail">
//       <span className="detail-label">{label}</span>
//       <span className="detail-value">{value}</span>
//     </div>
//   );
// }

// function ProjectCard({ project }) {
//   return (
//     <div className="project-card">
//       <div className="project-header">
//         <div>
//           <h2>{project.name}</h2>
//           <p>{project.client}</p>
//         </div>

//         <StatusBadge status={project.status} />
//       </div>

//       <div className="project-details">
//         <Detail
//           label="Owner"
//           value={project.owner}
//         />

//         <Detail
//           label="Date Range"
//           value={`${formatDate(project.startDate)} - ${formatDate(project.endDate)}`}
//         />

//         <Detail
//           label="Total Hours"
//           value={`${project.hours} hrs`}
//         />

//         <Detail
//           label="Final Estimated Cost"
//           value={formatCurrency(project.finalCost)}
//         />
//       </div>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import './App.css';

const roles = {
  devops: {
    id: 'devops',
    name: 'Devops',
    rate: 1000
  },
  projectManager: {
    id: 'projectManager',
    name: 'Project Manager',
    rate: 1500
  },
  designer: {
    id: 'designer',
    name: 'UI/UX Designer',
    rate: 800
  }
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tasks: [
        {
          id: crypto.randomUUID(),
          name: '',
          roleId: 'devops',
          hours: ''
        }
      ]
    };
  }

  createEmptyTask = () => {
    return {
      id: crypto.randomUUID(),
      name: '',
      roleId: 'devops',
      hours: ''
    };
  };

  addTask = () => {
    this.setState((prevState) => ({
      tasks: [
        ...prevState.tasks,
        this.createEmptyTask()
      ]
    }));
  };

  handleTaskChange = (taskId, field, value) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === taskId
          ? { ...task, [field]: value }
          : task
      )
    }));
  };

  deleteTask = (taskId) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter(
        (task) => task.id !== taskId
      )
    }));
  };

  getTaskCost = (task) => {
    const role = roles[task.roleId];

    if (!role) {
      return 0;
    }

    return (Number(task.hours) || 0) * role.rate;
  };

  getTotalHours = () => {
    return this.state.tasks.reduce(
      (total, task) =>
        total + (Number(task.hours) || 0),
      0
    );
  };

  getTotalCost = () => {
    return this.state.tasks.reduce(
      (total, task) =>
        total + this.getTaskCost(task),
      0
    );
  };

  render() {
    const { tasks } = this.state;

    return (
      <div className="app">
        <h1>Estimation Table</h1>

        <button onClick={this.addTask}>
          Add Task
        </button>

        {tasks.length === 0 ? (
          <p>No tasks</p>
        ) : (
          <TaskTable
            tasks={tasks}
            roles={roles}
            onTaskChange={this.handleTaskChange}
            onDelete={this.deleteTask}
            getTaskCost={this.getTaskCost}
          />
        )}

        <Summary
          totalTasks={tasks.length}
          totalHours={this.getTotalHours()}
          totalCost={this.getTotalCost()}
        />
      </div>
    );
  }
}

class TaskTable extends React.Component {
  render() {
    const {
      tasks,
      roles,
      onTaskChange,
      onDelete,
      getTaskCost
    } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Role</th>
            <th>Hours</th>
            <th>Cost</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              roles={roles}
              onTaskChange={onTaskChange}
              onDelete={onDelete}
              getTaskCost={getTaskCost}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

class TaskRow extends React.Component {
  render() {
    const {
      task,
      roles,
      onTaskChange,
      onDelete,
      getTaskCost
    } = this.props;

    return (
      <tr>
        <td>
          <input
            type="text"
            value={task.name}
            placeholder="Enter task"
            onChange={(e) =>
              onTaskChange(
                task.id,
                'name',
                e.target.value
              )
            }
          />
        </td>

        <td>
          <select
            value={task.roleId}
            onChange={(e) =>
              onTaskChange(
                task.id,
                'roleId',
                e.target.value
              )
            }
          >
            {Object.values(roles).map((role) => (
              <option
                key={role.id}
                value={role.id}
              >
                {role.name}
              </option>
            ))}
          </select>
        </td>

        <td>
          <input
            type="number"
            min="0"
            value={task.hours}
            placeholder="Hours"
            onChange={(e) =>
              onTaskChange(
                task.id,
                'hours',
                e.target.value
              )
            }
          />
        </td>

        <td>
          {formatCurrency(getTaskCost(task))}
        </td>

        <td>
          <button
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

class Summary extends React.Component {
  render() {
    return (
      <div className="summary">
        <p>
          Total Tasks: {this.props.totalTasks}
        </p>

        <p>
          Total Hours: {this.props.totalHours}
        </p>

        <p>
          Total Cost:{' '}
          {formatCurrency(this.props.totalCost)}
        </p>
      </div>
    );
  }
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export default App;