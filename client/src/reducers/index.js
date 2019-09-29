import { combineReducers } from 'redux';
import userReducer from 'client/src/reducers/user';
export default combineReducers({
    user: userReducer
});