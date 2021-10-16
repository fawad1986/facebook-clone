import * as constants from '../actionConstants.js'
import {sendLoginRequest} from '../../util/requestDispatcher'

/*
import { combineReducers } from 'redux';
import loginReducer from './loginReducer.js';
import showPostReducer from './showPostReducer.js';
const rootReducer = combineReducers({
  login:loginReducer ,
  showPost:showPostReducer
})
*/


const initialState ={
  App: {"LoginStatus":'','UserName':'','Route':'/',"id":''},
  ShowPosts:[{
    "user_id": "",
    "content_value": "",
    "post_text":"",
    "post_date": ""
}],
CreatePosts:[{"post_text":'',"content_value":''}]
}

let rootReducer = (state = initialState , action) => {
    switch (action.type) {
    case constants.LoginAction:
        return {...state,App:{...action.payload}}
    case constants.ShowPostAction:
      return {...state,ShowPosts:[...action.payload]}
    default:
        return state;
    }
  }
  export default rootReducer;

