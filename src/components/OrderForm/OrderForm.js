import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addOrder } from '../../apiCalls';
import { setOrders } from '../../actions/index';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleIngredientChange = e => {
    e.preventDefault();
    this.setState({ingredients: [...this.state.ingredients, e.target.name]});
  }

  handleSubmit = e => {
    e.preventDefault();
    const { name, ingredients } = this.state;
    if(name && ingredients.length) {
      addOrder(name, ingredients)
      .then( data => data.json())
      .then(json => {
        if(json.id) {
          this.props.setOrders([...this.props.orders, { name, ingredients, id: json.id }]);
        }
      });
    }
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  setOrders: orders => dispatch(setOrders(orders)),
});

export const mapStateToProps = state => ({
  orders: state.orders,
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);