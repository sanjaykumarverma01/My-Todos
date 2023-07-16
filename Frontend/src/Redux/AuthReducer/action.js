import * as types from "./actionType";
import axios from "axios";

const url = "https://jittery-cow-loincloth.cyclic.app"
const signup = (payload) => async (dispatch) => {
  dispatch({
    type: types.USER_SIGNUP_REQUEST,
  });
  return axios
    .post(`${url}/user/signup`, payload)
    .then((res) => {
      console.log(res.data);
      return dispatch({
        type: types.USER_SIGNUP_SUCCESS,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.USER_SIGNUP_FAILURE,
      });
    });
};

const login = (payload) => async (dispatch) => {
  dispatch({
    type: types.USER_LOGIN_REQUEST,
  });
  return axios
    .post(`${url}/user/login`, payload)
    .then((res) => {
      console.log(res.data);
      return dispatch({
        type: types.USER_LOGIN_SUCCESS,
        token: res.data.token,
      });
    })
    .catch((err) => {
      console.log(err.data);
      dispatch({
        type: types.USER_LOGIN_FAILURE,
      });
    });
};

export { signup, login };
