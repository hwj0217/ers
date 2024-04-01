
// reducer.js
const initialState = {
    loggedIn: false,
    userData: null
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...state,
          loggedIn: true,
          userData: action.loginInfo
        };
      case "LOGOUT":
        return {
          ...state,
          loggedIn: false,
          userData: null
        };
      default:
        return state;
    }
  };

export default rootReducer;