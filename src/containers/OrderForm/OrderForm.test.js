import React from 'react';
import { shallow } from 'enzyme';
import { OrderForm, mapStateToProps, mapDispatchToProps } from './OrderForm';
import * as api from '../../apiCalls';
import { setOrders } from '../../actions/index';

describe('OrderForm', () => {
  let wrapper;
  const mockOrders = [
    { id: 1, name: 'Brady', ingredients: ['lettuce', 'pork'] },
    { id: 2, name: 'Jeff', ingredients: ['corn', 'cheese'] },
  ];
  beforeEach(() => {
    wrapper = shallow( <OrderForm 
      orders={mockOrders}
      setOrders={jest.fn()}
    />);

  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have state properties of name and ingredients', () => {
    expect(wrapper.state('name')).toEqual('');
    expect(wrapper.state('ingredients')).toEqual([]);
  });

  it('handleNameChange should update Name in state on change', () => {
    const mockEvent = {
      target: {
        name: 'name',
        value: 'Brady',
      },
    };
    wrapper.instance().handleNameChange(mockEvent);
    expect(wrapper.state('name')).toEqual('Brady');
  });

  it('handleIngredientChange should update ingredients array', () => {
    const mockEvent = {
      preventDefault: jest.fn(),
      target: { name: 'fried pants' },
    };
    wrapper.instance().handleIngredientChange(mockEvent); 
    expect(wrapper.state('ingredients')).toEqual(['fried pants']);
  });

  it('handleSubmit should call addOrder if name and one ingredients are present', () => {
    const mockPromise = { json: () => Promise.resolve({ id: 1 })};
    api.addOrder = jest.fn().mockImplementation(() => {
      return Promise.resolve(mockPromise);
    });
    wrapper.instance().clearInputs = jest.fn();
    const mockEvent = {
      preventDefault: jest.fn(),
    }
    wrapper.setState({ name: 'Brady', ingredients: ['lettuce'] });
    wrapper.instance().handleSubmit(mockEvent);
    expect(api.addOrder).toHaveBeenCalledWith('Brady', ['lettuce']);
    expect(wrapper.instance().clearInputs).toHaveBeenCalled(); 
    // expect(wrapper.instance().props.setOrders).toHaveBeenCalled();
  });

  it('clear inputs should reset state', () => {
    wrapper.setState({ name: 'Brady', ingredients: ['lettuce'] });
    const expectedState = { name: '', ingredients: [] };
    wrapper.instance().clearInputs();
    expect(wrapper.state()).toEqual(expectedState);
  });
});

describe('mapStateToProps', () => {
  const mockOrders = [{ name: 'Brady', id: 1, ingredients: ['lettuce'] }];
  const mockState = {
    orders: mockOrders,
    error: 'An error occured',
  };
  it('should return orders', () => {
    const result = mapStateToProps(mockState);
    expect(result).toEqual({ orders: mockOrders });
  });
});

describe('mapDispatchToProps', () => {
  it('should map setOrders to props and be dispatched with correct action', () => {
    const mockDispatch = jest.fn();
    const mockOrders = [ 
      { name: 'Brady', id: 1, ingredients: ['lettcue'] },
      { name: 'Jeff', id: 2, ingredients: ['corn'] },
    ];
    const actionToDispatch = setOrders(mockOrders);
    const mappedDispatch = mapDispatchToProps(mockDispatch);
    mappedDispatch.setOrders(mockOrders);
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
});
