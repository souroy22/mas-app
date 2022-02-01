import {BUGS_ERROR, BUGS_LOADED, CURRENT_BUG, BUGS_LOADING, BUG_ADDED} from '../../utils/constants';

const defaultState = {bugs: [], loading: false, currentBug: {}, added: -1}

export default function reducer(state=defaultState, action) {
    switch (action.type) {
        case BUGS_ERROR:
            return {
                defaultState
            }
        case BUGS_LOADING:
            return {
                ...state,
                loading: true
            }
        case BUGS_LOADED:
            return {
                ...state,
                bugs: action.payload,
                loading: false,
                currentBug: {}
            }
        case CURRENT_BUG:
            return {
                currentBug: action.payload
            }
        case BUG_ADDED:
            return {
                ...state,
                added: state.added + 1,
                loading: false
            }
        default:
            return state
    }
}