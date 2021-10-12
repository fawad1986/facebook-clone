import * as constants from '../actionConstants.js'
import {sendLoginRequest} from '../../util/requestDispatcher'

const initialState ={
  App: {"LoginStatus":'','UserName':'','Route':'/',"id":''},
  ShowPosts:{"user_id": "","content_value": "","post_text":"","post_date": ""}
}

let reducer = (state = initialState , action) => {
    switch (action.type) {
    case constants.LoginAction:
        return {...state,App:{...action.payload}}
    case constants.ShowPostAction:
      return {...state,ShowPosts:{...action.payload}}
    
    default:
        return state;
    }
  }
  export default reducer;

