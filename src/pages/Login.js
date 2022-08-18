import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabled: true,
    logged: false,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.enableButton);
  }

  enableButton = () => {
    const { email, password } = this.state;
    const minOfPassword = 6;
    if (password.length >= minOfPassword && this.emailValidation(email)) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  emailValidation = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  onClick = () => {
    const { email } = this.state;
    const { dispatchEmailInfo } = this.props;
    dispatchEmailInfo(email);
    this.setState({ logged: true });
  }

  render() {
    const { email, password, disabled, logged } = this.state;
    return (
      <div>
        <label htmlFor="email">
          <input
            data-testid="email-input"
            name="email"
            type="text"
            placeholder="Email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          <input
            data-testid="password-input"
            name="password"
            type="password"
            placeholder="Senha"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ disabled }
          onClick={ this.onClick }
        >
          Entrar
        </button>
        { logged ? <Redirect to="/carteira" /> : null}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmailInfo: (email) => dispatch(saveEmail(email)),
});

Login.propTypes = {
  dispatchEmailInfo: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
