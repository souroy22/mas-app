import { combineReducers } from 'redux';
import Bugs from './Bugs';
import User from './User';

const reducers = combineReducers({bugs: Bugs, authentication: User});

export default reducers; 