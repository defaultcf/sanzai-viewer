export default (state = {}, action) => {
  switch(action.type) {
    case "SET_SANZAI":
      //console.log(action.data);
      return {
        sanzai: action.data,
      };
    default:
      return state;
  }
};
