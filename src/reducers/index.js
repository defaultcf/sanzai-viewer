export default (state = {}, action) => {
  switch(action.type) {
    case "SET_SANZAI":
      return {
        ...state,
        sanzai: action.data,
      };
    case "SET_DOUGHNUT":
      return {
        ...state,
        doughnut: action.data,
      };
    default:
      return state;
  }
};
