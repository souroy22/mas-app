import {USER_LOGIN, USER_LOGOUT} from '../../utils/constants';

const defaultState = {user: null}

export default function reducer(state=defaultState, action) {
    switch (action.type) {
        case USER_LOGIN:
            return {
                user: action.payload
            }
        case USER_LOGOUT:
            return {
                user: null
            }
        default:
            return state
    }
}