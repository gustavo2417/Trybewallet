import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;

    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">
          { expenses.length < 1 ? (0) : (expenses
            .reduce((acc, curr) => acc + (Number(curr.value) * curr
              .exchangeRates[curr.currency].ask), 0)
            .toFixed(2))}
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, null)(Header);
