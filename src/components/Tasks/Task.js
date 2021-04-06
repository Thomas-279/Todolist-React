import React from 'react';
import PropTypes from 'prop-types';

const Task = ({
  id,
  label,
  done,
  onChangeDone,
}) => {
  const classnames = done ? 'task task--done' : 'task';
  // Version longue
  // const handleOnChange = () => {
  //   onChangeDone(id);
  // };

  return (
    <li className={classnames}>
      <input
        type="checkbox"
        className="task__checkbox"
        id={id}
        checked={done}
        // onChange={handleOnChange}
        onChange={() => onChangeDone(id)}
      />
      <label htmlFor={id}>{label}</label>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  onChangeDone: PropTypes.func.isRequired,
};

export default Task;
