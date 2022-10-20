import axios from "axios";

const VALIDATE_EMAIL = (message) => (dispatch) => {
  dispatch({
    type: "VALIDATE_EMAIL",
    payload: message,
  });
};

const SIGN_UP = (user) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "STATUS",
        payload: "pending",
      });
      const result = await axios.post(`http://localhost:8000/sign-up`, {
        user,
      });
      console.log(result);

      if (result.status === 200) {
        dispatch({
          type: "USER",
          payload: { email: user.email },
        });
        dispatch({
          type: "STATUS",
          payload: "registered",
        });
        dispatch({
          type: "ERROR",
          payload: "",
        });
      }
    } catch (err) {
      console.log("[Error]:", err);
      dispatch({
        type: "ERROR",
        payload: err.response.data.message,
      });
      console.log("[Error]:", err.response.data.message);
    }
  };
};

const SIGN_IN = (user) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "STATUS",
        payload: "pending",
      });
      const result = await axios.post(`http://localhost:8000/sign-in`, {
        user,
      });

      if (result.status < 300) {
        dispatch({
          type: "USER",
          payload: { email: user.email },
        });
        dispatch({
          type: "STATUS",
          payload: "logged_in",
        });
        dispatch({
          type: "ERROR",
          payload: "",
        });
      }
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.response.data.message,
      });
      dispatch({
        type: "STATUS",
        payload: "registered",
      });
      console.log("[Error]:", err.response.data.message);
    }
  };
};

export { SIGN_IN, SIGN_UP, VALIDATE_EMAIL };
