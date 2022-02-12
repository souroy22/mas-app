import {USER_LOGIN, USER_LOGOUT} from '../../utils/constants';

const defaultState = {user: null}

export default function reducer(state=defaultState, action) {
    switch (action.type) {
        case USER_LOGIN:
            return {
                user: action.payload
            }
        case USER_LOGOUT:
            document.cookie = 'user' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
            return {
                user: null
            }
        default:
            return state
    }
}