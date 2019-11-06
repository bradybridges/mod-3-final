import React from 'react';
import { shallow } from 'enzyme';
import { Orders, mapDispatchToProps, mapStateToProps } from './Orders';
import * as api from '../../apiCalls';
import { setOrders } from '../../actions/index';

describe('Orders', () => {
  let wrapper;
  const mockOrders = [
    { name: 'Brady', id: 1, ingredients: ['lettuce'] },
    { name: 'Alan', id: 2, ingredients: ['lettuce', 'salsa', 'cheese'] },
  ];
  beforeEach(() => {
    api.getOrders = jest.fn().mockImplementation(() => {
      return Promise.resolve({ orders: mockOrders });
    });
    wrapper = shallow(<Orders orders={mockOrders} setOrders={jest.fn()} />)
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('componentDidMount should call getOrders and setOrders', () => {
    expect(api.getOrders).toHaveBeenCalled();
    expect(wrapper.instance().props.setOrders).toHaveBeenCalledWith(mockOrders);
  });
});

describe('mapStateToProps', () => {
  it('should map orders to props', () => {
    const mockState = {
      orders: [{ name: 'Brady', id: 1, ingredients: ['lettuce'] }],
      error: 'An error happened',
    }
    const mappedState = mapStateToProps(mockState);
    expect(mappedState).toEqual({orders: [{ name: 'Brady', id: 1, ingredients: ['lettuce'] }]});
  });
});

describe('mapDispatchToProps', () => {
  const mockDispatch = jest.fn();
  const mockOrders = [{ name: 'Brady', id: 1, ingredients: ['lettuce'] }];
  const actionToDispatch = setOrders(mockOrders);
  const mappedDispatch = mapDispatchToProps(mockDispatch);
  mappedDispatch.setOrders(mockOrders);
  expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
});