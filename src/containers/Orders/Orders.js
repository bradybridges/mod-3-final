import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setOrders } from '../../actions/index';
import { getOrders, deleteOrder } from '../../apiCalls';
import './Orders.css';

export class Orders extends Component {

  componentDidMount() {
    getOrders()
      .then(data => this.props.setOrders(data.orders))
      .catch(err => console.error('Error fetching:', err));
  }

  handleDelete = (e) => {
    e.preventDefault();
    const order = this.props.orders.find(order => order.name === e.target.id);
    const orderIndex = this.props.orders.findIndex(order => order.name === e.target.id);
    let updatedOrders = this.props.orders.map( order => order);
    updatedOrders.splice(orderIndex, 1);
    deleteOrder(order.id);
    this.props.setOrders(updatedOrders);
  }

  render() {
    const orderEls = this.props.orders.map(order => {
      return (
        <div className="order" key={order.name}>
          <h3>{order.name}</h3>
          <ul className="ingredient-list">
            {order.ingredients.map(ingredient => {
              return <li key={ingredient}>{ingredient}</li>
            })}
          </ul>
          <button id={order.name} onClick={this.handleDelete}>Delete</button>
        </div>
      )
    });
    return (
      <section>
        { orderEls.length ? orderEls : <p>No orders yet!</p> }
      </section>
    );
  }
}

export const mapStateToProps = ({ orders }) => ({
  orders
});

export const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setOrders,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Orders);