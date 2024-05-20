import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { userLoginReducer, userRegisterReducer, userListReducer } from './reducers/userReducers';
import { chatMessagesReducer } from './reducers/chatReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  chatMessages: chatMessagesReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
