import * as constants from '../actionConstants.js'
import {sendLoginRequest} from '../../util/requestDispatcher'

const initialState ={
  ShowPosts:{"user_id": "","content_value": "","post_text":"","post_date": ""}
}
let showPostReducer = (state = initialState , action) => {
    switch (action.type) {
    case constants.ShowPostAction:
      return {...state,ShowPosts:{...action.payload}}
    
    default:
        return state;
    }
  }
  export default showPostReducer;