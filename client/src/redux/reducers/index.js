import { combineReducers } from 'redux';
import Bugs from './Bugs';
import User from './User';
import CurrentTab from "./SetCurrentTab"

const reducers = combineReducers({bugs: Bugs, authentication: User,currentTab:CurrentTab});

export default reducers; 