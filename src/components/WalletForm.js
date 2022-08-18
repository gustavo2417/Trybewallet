import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestAPI, saveExpenses } from '../redux/actions';

class WalletForm extends React.Component {
    state = {
      description: '',
      value: '',
      method: 'Dinheiro',
      tag: 'SAÚDE',
      exchangeRates: [],
      currency: 'USD',
    };

    componentDidMount() {
      const { dispatchRequestAPI } = this.props;
      dispatchRequestAPI();
    }

  newExpense = async () => {
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(URL);
    const json = await response.json();
    this.setState({ exchangeRates: json });
    const { value, method, description, currency, tag, exchangeRates } = this.state;
    const { wallet: { expenses }, dispatchNewExpense } = this.props;
    const newID = expenses.length;
    const expense = {
      id: newID,
      value,
      method,
      description,
      currency,
      tag,
      exchangeRates,
    };
    dispatchNewExpense(expense);
    this.setState({
      value: '',
      method: 'Dinheiro',
      description: '',
      tag: 'SAÚDE',
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { currencies } = this.props;
    const { value, method, description, currency, tag } = this.state;

    return (
      <div>
        <label htmlFor="value">
          <input
            name="value"
            type="number"
            placeholder="Valor"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          <input
            name="description"
            type="text"
            value={ description }
            placeholder="Digite aqui"
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency">
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currencies.map((item) => <option key={ item }>{ item }</option>) }
          </select>
        </label>

        <label htmlFor="method">
          <p>Forma de Pagamento</p>
          <select
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="category">
          <p>Categoria</p>
          <select
            name="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option>Saúde</option>
            <option>Alimentação</option>
            <option>Trabalho</option>
            <option>Lazer</option>
            <option>Transporte</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.newExpense }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchRequestAPI: () => dispatch(requestAPI()),
  dispatchNewExpense: (expense) => dispatch(saveExpenses(expense)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  wallet: state.wallet,
});

WalletForm.propTypes = {
  dispatchRequestAPI: PropTypes.func.isRequired,
  dispatchNewExpense: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
