import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

class Form extends React.Component {
  // on crée une propriété de classe qui prendra la référence du composant
  // une fois inséré dans le DOM
  // https://fr.reactjs.org/docs/refs-and-the-dom.html
  taskInput = React.createRef();

  componentDidMount() {
    // ici je veux mettre mon champs texte en focus
    // avec la méthode impérative
    // const input = document.querySelector('input[type="text"');
    // input.focus();

    // avec la méthode React
    this.taskInput.current.focus();
  }

  handleOnSubmit = (event) => {
    // les props dans une classe deviennent partie du contexte
    // il faut bien mettre this.props
    // on peut donc destructurer les props comme le state
    const { onSubmitForm } = this.props;

    // comme en vanilla il faut arrêter le comportement par défaut
    // du formulaire
    event.preventDefault();
    onSubmitForm();

    // ici on aurait pu récupérer la valeur de l'input event.target[0].value
    // dans ce cas on saura ce qui est dans l'input uniquement quand on soumettra
    // le formulaire
  };

  handleOnChange = (event) => {
    const { onChangeInput } = this.props;

    onChangeInput(event.target.value);
  };

  render() {
    const { inputValue } = this.props;

    return (
      <form onSubmit={this.handleOnSubmit} className="form">
        <input
          // je viens donner la référence à mon composant
          // pour y avoir accès une fois dans le DOM
          ref={this.taskInput}
          type="text"
          placeholder="Ajouter une tâche"
          className="form__input"
          value={inputValue}
          onChange={this.handleOnChange}
          // autoFocus
        />
      </form>
    );
  }
}

Form.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
};

export default Form;
