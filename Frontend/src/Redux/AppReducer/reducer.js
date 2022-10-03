import * as types from "./actionType";

const initState = {
  todos: [],
  isLoading: false,
  isError: false,
};

const reducer = (oldState = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_TODOS_REQUEST:
      return {
        ...oldState,
        isLoading: true,
        isError: false,
      };
    case types.GET_TODOS_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        isError: false,
        todos: [...payload],
      };
    case types.GET_TODOS_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
      };
    default:
      return oldState;
  }
};

export { reducer };
