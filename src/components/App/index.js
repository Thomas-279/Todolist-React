// == Import npm
import React from 'react';
import Form from 'src/components/Form';
import Counter from 'src/components/Counter';
import Tasks from 'src/components/Tasks';

// == Import
import './style.scss';

import tasksData from 'src/data/tasks';

// == Composant
class App extends React.Component {
  // ici pas besoin de déclarer le state dans le constructor
  // on a babel-class-properties
  state = {
    tasks: tasksData,
    taskLabel: '',
  }

  // on passe par une propriété de class où on vient stocker une fonction
  // flêchée pour ne pas avoir à lier (bind) le contexte (this) de la classe à la fonction
  addTask = () => {
    const { taskLabel, tasks } = this.state;

    // récupérer les ids des tâches = transformer le tableau de tâche en tableau d'ids
    const ids = tasks.map((task) => task.id);

    // on va déterminer quel est l'id max
    const maxId = Math.max(...ids);

    const newTask = {
      id: maxId + 1,
      done: false,
      label: taskLabel,
    };

    // lorsqu'on modifie un tableau dans le state
    // il faut repartir d'un nouveau tableau
    // en déclaratif, on ne modifie jamais les données, on repart avec de nouvelles références
    // on parle ici d'IMMUTABILITE
    const newTasks = [...tasks, newTask];

    this.setState({
      tasks: newTasks,
      taskLabel: '',
    });
  }

  setTaskLabel = (value) => {
    this.setState({
      taskLabel: value,
    });
  }

  setTaskDone = (taskId) => {
    const { tasks } = this.state;

    const newTasks = tasks.map((task) => {
      // ici on teste si la tâche courante a le même id
      // que celui passer en paramètre
      if (task.id === taskId) {
        // il faut créer un nouvel objet pour avoir ue nouvelle référence
        return {
          ...task,
          // on peut déverser les propriétés d'un objet dans un autre
          // et à la suite, on peut spécifier les propriétés qui changent
          done: !task.done,
        };
      }

      return task;
    });

    this.setState({
      tasks: newTasks,
    });
  };

  render() {
    const { tasks, taskLabel } = this.state;
    const undoneTasksNumber = tasks.filter((task) => !task.done).length;

    const undoneTasks = tasks.filter((task) => !task.done);
    const doneTasks = tasks.filter((task) => task.done);

    const sortedTasks = [...undoneTasks, ...doneTasks];

    return (
      <div className="app">
        <Form
          onSubmitForm={this.addTask}
          inputValue={taskLabel}
          onChangeInput={this.setTaskLabel}
        />
        <Counter count={undoneTasksNumber} />
        <Tasks
          tasks={sortedTasks}
          setTaskDone={this.setTaskDone}
        />
      </div>
    );
  }
}

// == Export
export default App;
