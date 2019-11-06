import { setOrders } from '../actions/index';

describe('Actions', () => {
  it('setOrders should return action object', () => {
    const mockOrders = [
      { name: 'Brady', id: 1, ingredients: ['lettuce'] },
      { name: 'Jeff', id: 2, ingredients: ['lettuce, corn'] }
    ];
    const expected = {
      type: 'SET_ORDERS',
      orders: mockOrders,
    }
    const result = setOrders(mockOrders);
    expect(result).toEqual(expected);
  });
});