import React from 'react';
import PropTypes from 'prop-types';

import Task from './Task';
import './style.scss';

const Tasks = ({ tasks, setTaskDone }) => (
  <ul className="tasks">
    {tasks.map((task) => (
      <Task
        key={task.id}
        onChangeDone={setTaskDone}
        {...task}
      />
    ))}
  </ul>
);

Tasks.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  setTaskDone: PropTypes.func.isRequired,
};

export default Tasks;
