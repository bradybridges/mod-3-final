import { orders } from '../reducers/orders';
import { setOrders } from '../actions/index';

describe('orders reducer', () => {
  const mockOrders = [
    { name: 'Brady', id: 1, ingredients: ['lettuce'] },
    { name: 'Jeff', id: 2, ingredients: ['lettuce, corn'] }
  ];

  it('should return orders', () => {
    const result = orders([], setOrders(mockOrders));
    expect(result).toEqual(mockOrders);
  });

  it('should return default state', () => {
    const result = orders(mockOrders, { type: 'UNDEFINED' });
    expect(result).toEqual(mockOrders);
  });
});
