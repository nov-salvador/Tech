export const historyReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_SEARCH':
      const newHistory = [action.payload, ...state];
      return [...new Set(newHistory)]; // Remove duplicates
    case 'CLEAR_HISTORY':
      return [];
    default:
      return state;
  }
};