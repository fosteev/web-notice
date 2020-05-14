import {combineReducers} from 'redux';

import rooms from './rooms';
import messages from "./messages";
import user from './user';
import users from "./users";

export default combineReducers({
    rooms,
    messages,
    user,
    users
});
