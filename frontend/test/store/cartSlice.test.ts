import reducer, { addItem, removeItem, clearCart } from '../../src/store/cartSlice';

describe('cartSlice', () => {
  it('zwraca stan poczatkowy', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
      total: 0,
    });
  });

  it('obsluguje addItem i przelicza total PER_RESERVATION', () => {
    const newItem = {
      id: '1',
      workspaceId: 101,
      name: 'Sala 1',
      pricePerHour: 50,
      date: '2026-06-25',
      startTime: '10:00',
      hours: 2,
      addons: [{ id: 'a1', name: 'Projektor', price: 20, billing_type: 'PER_RESERVATION' as const }],
    };
    const actual = reducer(undefined, addItem(newItem));
    expect(actual.items.length).toEqual(1);
    expect(actual.total).toEqual(120);
  });

  it('obsluguje addItem i przelicza total PER_HOUR', () => {
    const newItem = {
      id: '2',
      workspaceId: 102,
      name: 'Sala 2',
      pricePerHour: 50,
      date: '2026-06-25',
      startTime: '10:00',
      hours: 3,
      addons: [{ id: 'a2', name: 'Kawa', price: 10, billing_type: 'PER_HOUR' as const }],
    };
    const actual = reducer(undefined, addItem(newItem));
    expect(actual.items.length).toEqual(1);
    expect(actual.total).toEqual(180);
  });

  it('obsluguje removeItem', () => {
    const initialState = {
      items: [{
        id: '1',
        workspaceId: 101,
        name: 'Sala',
        pricePerHour: 50,
        date: '2026-06-25',
        startTime: '10:00',
        hours: 2,
        addons: []
      }],
      total: 100
    };
    const actual = reducer(initialState, removeItem('1'));
    expect(actual.items.length).toEqual(0);
    expect(actual.total).toEqual(0);
  });

  it('obsluguje clearCart', () => {
    const initialState = {
      items: [{
        id: '1',
        workspaceId: 101,
        name: 'Biurko',
        pricePerHour: 50,
        date: '2026-06-25',
        startTime: '10:00',
        hours: 2,
        addons: []
      }],
      total: 100
    };
    const actual = reducer(initialState, clearCart());
    expect(actual.items.length).toEqual(0);
    expect(actual.total).toEqual(0);
  });
});