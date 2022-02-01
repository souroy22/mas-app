import  React from  "react";
import { Route, Navigate, useNavigate, useResolvedPath  } from  "react-router-dom";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { handle } from "../../utils/helpers";
import api from "../../redux/api";
import { useDispatch } from 'react-redux'
import { USER_LOGIN, USER_LOGOUT } from "../../utils/constants";

const  PrivateRoute = (props) => {
    const user = useSelector(state => state.authentication.user);
    const [cookies] = useCookies(['user']);
    const dispatch = useDispatch();

    const fetchUser = async (token, id) => {
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }

        const [result, error] = await handle(api.get(`users/${id}`, config))

        if (error) {
            dispatch({type: USER_LOGOUT, payload: {}})
            
        } else {
            dispatch({type: USER_LOGIN, payload: result.data})
        }

    }

    if (cookies.user && user === null) {
        fetchUser(cookies.user.token, cookies.user.id)
    }

    const condition = (cookies.user && Object.keys(cookies.user).length > 0) || user !== null;

    return condition ? (<Route path={props.path} exact={props.exact} element={props.element} />) : (
        <Navigate to="/login" />
    )
};

export default PrivateRoute;