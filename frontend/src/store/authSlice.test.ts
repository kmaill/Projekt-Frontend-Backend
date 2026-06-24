import reducer, { loginAsUser, loginAsAdmin, login, logout, setAuthChecked } from './authSlice';

describe('authSlice', () => {
  it('zwraca stan poczatkowy', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      isAuthenticated: false,
      isCheckingAuth: true,
      user: null,
    });
  });

  it('obsluguje loginAsUser', () => {
    const actual = reducer(undefined, loginAsUser());
    expect(actual.isAuthenticated).toBe(true);
    expect(actual.user?.email).toBe('klient@test.com');
  });

  it('obsluguje loginAsAdmin', () => {
    const actual = reducer(undefined, loginAsAdmin());
    expect(actual.isAuthenticated).toBe(true);
    expect(actual.user?.role).toBe('ADMIN');
  });

  it('obsluguje login', () => {
    const payload = { email: 'test@test.com', role: 'USER' as const, id: 1 };
    const actual = reducer(undefined, login(payload));
    expect(actual.isAuthenticated).toBe(true);
    expect(actual.user?.email).toBe('test@test.com');
  });

  it('obsluguje logout', () => {
    const initialState = { 
      isAuthenticated: true, 
      isCheckingAuth: false, 
      user: { email: 'test@test.com', role: 'USER' as const, id: 1 } 
    };
    const actual = reducer(initialState, logout());
    expect(actual.isAuthenticated).toBe(false);
    expect(actual.user).toBeNull();
  });

  it('obsluguje setAuthChecked', () => {
    const actual = reducer(undefined, setAuthChecked());
    expect(actual.isCheckingAuth).toBe(false);
  });
});