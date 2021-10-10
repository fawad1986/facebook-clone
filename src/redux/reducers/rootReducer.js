import * as constants from '../actionConstants.js'
import {sendLoginRequest} from '../../util/requestDispatcher'

const initialState ={
  App: {"LoginStatus":'','UserName':'','Route':'',"id":''}
}

let reducer = (state = initialState , action) => {
    switch (action.type) {
    case constants.LoginAction:
        return {...state,App:{...action.payload}}
    default:
        return state;
    }
  }
  export default reducer;

