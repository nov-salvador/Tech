export const initialState = {
  isLoading: true,
  isLoggedIn: false,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};