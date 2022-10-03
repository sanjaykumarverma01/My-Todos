import * as types from "./actionType";

const initState = {
  isAuth: false,
  token: "",
  isLoading: false,
  isError: false,
};

const reducer = (oldState = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.USER_LOGIN_REQUEST:
      return {
        ...oldState,
        isLoading: true,
      };
    case types.USER_LOGIN_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        token: payload,
        isAuth: true,
      };
    case types.USER_LOGIN_FAILURE:
      return {
        ...oldState,
        isError: true,
        isLoading: false,
        isAuth: false,
        token: "",
      };
    default:
      return oldState;
  }
};

export { reducer };
