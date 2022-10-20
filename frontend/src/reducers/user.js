const initialState = {
  email: "",
  status: "",
  validateEmail: "email is incorrect",
  error: "",
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER":
      return {
        ...state,
        email: action.payload.email,
      };
    case "STATUS":
      return {
        ...state,
        status: action.payload,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "VALIDATE_EMAIL":
      return {
        ...state,
        validateEmail: action.payload,
      };
    case "CLEAR_USER":
      return { ...state, initialState };
    default:
      return state;
  }
};

export default counterReducer;
