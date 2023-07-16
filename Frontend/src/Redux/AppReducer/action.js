import * as types from "./actionType";
import axios from "axios";

const url = "https://jittery-cow-loincloth.cyclic.app";

const getTodos = (token) => async (dispatch) => {
  dispatch({
    type: types.GET_TODOS_REQUEST,
  });
  return axios.get(`${url}/todos`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      return dispatch({
        type: types.GET_TODOS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      return dispatch({
        type: types.GET_TODOS_FAILURE,
      });
    });
};

const createTodo = (payload, token) => async (dispatch) => {
  console.log(payload);
  dispatch({
    type: types.CREATE_TODOS_REQUEST,
  });
  return axios
    .post(`${url}/todos/create`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log(res.data);
      return dispatch({
        type: types.CREATE_TODOS_SUCCESS,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.CREATE_TODOS_FAILURE,
      });
    });
};

const updateTodo = (id, token, payload) => async (dispatch) => {
  dispatch({
    type: types.UPDATE_TODOS_REQUEST,
  });
  return axios
    .patch(`${url}/todos/edit/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log(res.data);
      return dispatch({ type: types.UPDATE_TODOS_SUCCESS });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: types.UPDATE_TODOS_FAILURE });
    });
};

const deleteTodo = (id, token) => async (dispatch) => {
  dispatch({
    type: types.DELETE_TODOS_REQUEST,
  });
  return axios
    .delete(`${url}/todos/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({ type: types.DELETE_TODOS_SUCCESS });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: types.DELETE_TODOS_FAILURE });
    });
};

export { getTodos, createTodo, deleteTodo, updateTodo };
