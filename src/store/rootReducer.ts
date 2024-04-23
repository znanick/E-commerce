import {combineReducers} from 'redux';
import {profileReducer} from './profile/profileReducer';

const rootReducer = combineReducers({
  profile: profileReducer
});

export default rootReducer;
